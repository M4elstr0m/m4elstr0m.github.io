const INFO_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
const TOOLTIP_HOVER_DELAY_MS = 150;

let tagTooltips: Record<string, string> = {};
let noTooltipText = 'No tooltip available';

function refreshTagTooltips() {
  try {
    const parsed = JSON.parse(document.getElementById('tooltip-data')?.textContent ?? '{}');
    tagTooltips = parsed.tooltips ?? {};
    noTooltipText = parsed.noTooltipText ?? noTooltipText;
  } catch {
    tagTooltips = {};
  }
}

function renderTooltipMarkup(text: string) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

let hoverTooltipEl: HTMLDivElement | null = null;
function getHoverTooltipEl() {
  if (!hoverTooltipEl || !document.body.contains(hoverTooltipEl)) {
    hoverTooltipEl = document.createElement('div');
    hoverTooltipEl.className =
      'tui-tag-tooltip pointer-events-none fixed z-[100] max-w-xs origin-bottom border bg-tui-panel px-3 py-2 text-xs leading-relaxed text-tui-text opacity-0 shadow-lg transition-[opacity,transform] duration-200 ease-out';
    document.body.appendChild(hoverTooltipEl);
  }
  return hoverTooltipEl;
}

let tooltipHoverTimer: ReturnType<typeof setTimeout> | null = null;

function positionHoverTooltip(el: HTMLElement, target: HTMLElement) {
  const margin = 8;
  const rect = target.getBoundingClientRect();
  el.style.transform = 'translateY(6px) scale(0.92)';
  el.style.opacity = '0';

  const tooltipRect = el.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
  left = Math.max(margin, Math.min(window.innerWidth - tooltipRect.width - margin, left));
  const top = Math.max(margin, rect.top - tooltipRect.height - margin);

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;

  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0) scale(1)';
  });
}

function getHoverTooltipContent(target: HTMLElement): string | null {
  if (target.dataset.tag) {
    const description = tagTooltips[target.dataset.tag];
    if (description) return renderTooltipMarkup(description);
    return `<span class="mr-1.5 inline-flex h-3.5 w-3.5 shrink-0 -translate-y-0.5 align-middle text-tui-muted">${INFO_ICON_SVG}</span>${noTooltipText}`;
  }
  if (target.dataset.urlTooltip) {
    return renderTooltipMarkup(target.dataset.urlTooltip);
  }
  return null;
}

function showHoverTooltip(target: HTMLElement) {
  const content = getHoverTooltipContent(target);
  if (!content) return;
  const el = getHoverTooltipEl();
  el.innerHTML = content;

  const accent = getComputedStyle(target).color;
  el.style.borderColor = accent;
  el.style.boxShadow = `0 0 12px color-mix(in srgb, ${accent} 35%, transparent)`;
  el.style.setProperty('--tag-tooltip-accent', accent);

  positionHoverTooltip(el, target);
}

function hideHoverTooltip() {
  if (!hoverTooltipEl) return;
  hoverTooltipEl.style.opacity = '0';
  hoverTooltipEl.style.transform = 'translateY(6px) scale(0.92)';
}

export function initHoverTooltip() {
  refreshTagTooltips();
  document.addEventListener('astro:page-load', refreshTagTooltips);

  document.addEventListener('mouseover', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const hoverEl = target.closest<HTMLElement>('[data-tag], [data-url-tooltip]');
    if (!hoverEl) return;
    if (tooltipHoverTimer) clearTimeout(tooltipHoverTimer);
    tooltipHoverTimer = setTimeout(() => showHoverTooltip(hoverEl), TOOLTIP_HOVER_DELAY_MS);
  });

  document.addEventListener('mouseout', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const hoverEl = target.closest<HTMLElement>('[data-tag], [data-url-tooltip]');
    if (!hoverEl) return;
    const related = event.relatedTarget;
    if (related instanceof Node && hoverEl.contains(related)) return;
    if (tooltipHoverTimer) {
      clearTimeout(tooltipHoverTimer);
      tooltipHoverTimer = null;
    }
    hideHoverTooltip();
  });
}
