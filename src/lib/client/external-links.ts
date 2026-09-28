const EXTERNAL_LINK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';

function markExternalLinks() {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')) {
    if (link.dataset.externalMarked) continue;
    link.dataset.externalMarked = 'true';

    let url: URL;
    try {
      url = new URL(link.href);
    } catch {
      continue;
    }
    if (url.origin === location.origin) continue;

    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.dataset.urlTooltip = link.href;

    if (link.hasAttribute('data-no-external-icon')) continue;

    const wrapper = document.createElement('span');
    wrapper.innerHTML = EXTERNAL_LINK_SVG;
    const svg = wrapper.firstElementChild;
    if (!(svg instanceof SVGElement)) continue;

    svg.setAttribute('width', '0.75em');
    svg.setAttribute('height', '0.75em');
    svg.classList.add('shrink-0');
    const display = getComputedStyle(link).display;
    if (display !== 'flex' && display !== 'inline-flex') {
      svg.classList.add('tui-external-icon');
    }
    link.appendChild(svg);
  }
}

export function initExternalLinkMarking() {
  markExternalLinks();
  document.addEventListener('astro:page-load', markExternalLinks);
}
