import { NAVBAR_OFFSET } from './scroll';

const WHEEL_THRESHOLD = 5;
const SCROLL_DURATION_MS = 450;
const ADVANCE_DEBOUNCE_MS = 150;

let carouselSections: HTMLElement[] = [];
let carouselIndex = 0;
let carouselToken = 0;
let lastAdvanceTime = 0;
let carouselAttached = false;
let previousSnapType = '';

function findCarouselIndex() {
  let best = 0;
  let bestDist = Infinity;
  carouselSections.forEach((el, i) => {
    const dist = Math.abs(el.getBoundingClientRect().top - NAVBAR_OFFSET);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  return best;
}

function animateCarouselScrollTo(targetY: number, duration: number) {
  const token = ++carouselToken;
  const startY = window.scrollY;
  const delta = targetY - startY;
  if (Math.abs(delta) < 1) return;
  const start = performance.now();
  document.documentElement.dataset.carouselAnimating = 'true';
  function step(now: number) {
    if (token !== carouselToken) return;
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    window.scrollTo({ top: startY + delta * eased, left: 0, behavior: 'instant' });
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      delete document.documentElement.dataset.carouselAnimating;
      window.dispatchEvent(new Event('carousel-settled'));
    }
  }
  requestAnimationFrame(step);
}

function goToCarouselIndex(index: number) {
  const el = carouselSections[index];
  if (!el) return;
  carouselIndex = index;
  const targetY = window.scrollY + el.getBoundingClientRect().top - NAVBAR_OFFSET;
  animateCarouselScrollTo(targetY, SCROLL_DURATION_MS);
}

function onCarouselWheel(event: WheelEvent) {
  if (event.ctrlKey) return;
  if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;

  event.preventDefault();

  const now = performance.now();
  if (now - lastAdvanceTime < ADVANCE_DEBOUNCE_MS) return;
  lastAdvanceTime = now;

  const direction = event.deltaY > 0 ? 1 : -1;
  const target = carouselIndex + direction;
  if (target < 0 || target >= carouselSections.length) return;

  goToCarouselIndex(target);
}

const phoneMediaQuery = typeof window !== 'undefined'
  ? window.matchMedia('(pointer: coarse) and (max-width: 767px)')
  : null;

function isPhoneViewport() {
  return phoneMediaQuery?.matches ?? false;
}

function enableCarouselPaging() {
  carouselSections = Array.from(document.querySelectorAll<HTMLElement>('main .snap-start'));
  if (carouselSections.length < 2 || carouselAttached || isPhoneViewport()) return;
  carouselAttached = true;
  carouselIndex = findCarouselIndex();
  previousSnapType = document.documentElement.style.scrollSnapType;
  document.documentElement.style.scrollSnapType = 'none';
  window.addEventListener('wheel', onCarouselWheel, { passive: false });
}

function disableCarouselPaging() {
  if (!carouselAttached) return;
  carouselAttached = false;
  document.documentElement.style.scrollSnapType = previousSnapType;
  window.removeEventListener('wheel', onCarouselWheel);
}

export function initCarouselPaging() {
  enableCarouselPaging();

  document.addEventListener('astro:before-preparation', disableCarouselPaging);
  document.addEventListener('astro:page-load', enableCarouselPaging);

  phoneMediaQuery?.addEventListener('change', () => {
    if (isPhoneViewport()) {
      disableCarouselPaging();
    } else {
      enableCarouselPaging();
    }
  });
}
