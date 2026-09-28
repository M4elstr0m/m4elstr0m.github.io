export const NAVBAR_OFFSET = 80;

export function isSectionAligned(id: string, offset: number = NAVBAR_OFFSET): boolean {
  const el = document.getElementById(id);
  return el ? Math.abs(el.getBoundingClientRect().top - offset) < 10 : false;
}

export function animatedScrollTo(targetY: number, duration: number): Promise<void> {
  return new Promise((resolve) => {
    const startY = window.scrollY;
    const delta = targetY - startY;
    if (Math.abs(delta) < 1) {
      resolve();
      return;
    }
    const start = performance.now();
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      window.scrollTo({ top: startY + delta * eased, left: 0, behavior: 'instant' });
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}
