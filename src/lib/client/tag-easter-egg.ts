const RUST_BURST_COUNT = 28;

const TAG_EASTER_EGGS: Record<string, string> = {
  rust: '🦀',
  go: '🦫',
};

function spawnTagBurst(target: Element, emoji: string) {
  const rect = target.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = reduceMotion ? 8 : RUST_BURST_COUNT;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.textContent = emoji;
    particle.style.position = 'fixed';
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.fontSize = `${14 + Math.random() * 16}px`;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = reduceMotion ? 20 + Math.random() * 20 : 80 + Math.random() * 160;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const spin = (Math.random() - 0.5) * 720;
    const duration = reduceMotion ? 300 : 700 + Math.random() * 500;

    const animation = particle.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.4) rotate(0deg)', opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.1) rotate(${spin}deg)`,
          opacity: 0,
        },
      ],
      { duration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' },
    );
    animation.onfinish = () => particle.remove();
  }
}

export function initTagEasterEgg() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const tagEl = target.closest<HTMLElement>('[data-tag]');
    if (!tagEl) return;
    const emoji = TAG_EASTER_EGGS[tagEl.dataset.tag ?? ''];
    if (!emoji) return;

    const link = tagEl.closest('a');
    if (link) {
      event.preventDefault();
      event.stopPropagation();
    }
    spawnTagBurst(tagEl, emoji);
  });
}
