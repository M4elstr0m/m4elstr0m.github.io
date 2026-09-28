function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function renderProjectCoverPlaceholderSvg(title: string): string {
  const accessibleTitle = escapeXml(title);
  return `<svg viewBox="200 125 400 225" xmlns="http://www.w3.org/2000/svg">
  <title>${accessibleTitle}: cover not available</title>
  <rect width="800" height="450" fill="#05070a" />
  <rect x="0.5" y="0.5" width="799" height="449" fill="none" stroke="#262b36" />
  <g fill="#1a1f29">
    <circle cx="24" cy="24" r="1.5" /><circle cx="64" cy="24" r="1.5" /><circle cx="104" cy="24" r="1.5" />
    <circle cx="144" cy="24" r="1.5" /><circle cx="184" cy="24" r="1.5" /><circle cx="224" cy="24" r="1.5" />
    <circle cx="264" cy="24" r="1.5" /><circle cx="304" cy="24" r="1.5" /><circle cx="344" cy="24" r="1.5" />
    <circle cx="384" cy="24" r="1.5" /><circle cx="424" cy="24" r="1.5" /><circle cx="464" cy="24" r="1.5" />
    <circle cx="504" cy="24" r="1.5" /><circle cx="544" cy="24" r="1.5" /><circle cx="584" cy="24" r="1.5" />
    <circle cx="624" cy="24" r="1.5" /><circle cx="664" cy="24" r="1.5" /><circle cx="704" cy="24" r="1.5" />
    <circle cx="744" cy="24" r="1.5" /><circle cx="784" cy="24" r="1.5" />
    <circle cx="24" cy="426" r="1.5" /><circle cx="64" cy="426" r="1.5" /><circle cx="104" cy="426" r="1.5" />
    <circle cx="144" cy="426" r="1.5" /><circle cx="184" cy="426" r="1.5" /><circle cx="224" cy="426" r="1.5" />
    <circle cx="264" cy="426" r="1.5" /><circle cx="304" cy="426" r="1.5" /><circle cx="344" cy="426" r="1.5" />
    <circle cx="384" cy="426" r="1.5" /><circle cx="424" cy="426" r="1.5" /><circle cx="464" cy="426" r="1.5" />
    <circle cx="504" cy="426" r="1.5" /><circle cx="544" cy="426" r="1.5" /><circle cx="584" cy="426" r="1.5" />
    <circle cx="624" cy="426" r="1.5" /><circle cx="664" cy="426" r="1.5" /><circle cx="704" cy="426" r="1.5" />
    <circle cx="744" cy="426" r="1.5" /><circle cx="784" cy="426" r="1.5" />
  </g>
  <text x="400" y="235" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="52" font-weight="700" letter-spacing="6" fill="#e6e6e6" text-anchor="middle">REDACTED</text>
  <text x="400" y="266" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="14" letter-spacing="2" fill="#6b7280" text-anchor="middle">(no cover available)</text>
</svg>`;
}

export function projectCoverPlaceholderDataUri(title: string): string {
  const svg = renderProjectCoverPlaceholderSvg(title);
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
