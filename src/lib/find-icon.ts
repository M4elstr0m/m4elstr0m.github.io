import * as simpleIcons from 'simple-icons';

export interface SimpleIconData {
  path: string;
  title: string;
}

// Tags whose slug happens to collide with an unrelated real brand's
// simple-icons entry, e.g. "TUI" -> TUI Group, the travel company. Excluded
// so the wrong logo doesn't show up next to a tag that isn't referring to
// that brand at all; falls back to plain text like any other unmatched tag.
const ICON_LOOKUP_EXCLUSIONS = new Set(['tui']);

export function findIcon(label: string): SimpleIconData | undefined {
  const slug = label.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (ICON_LOOKUP_EXCLUSIONS.has(slug)) return undefined;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (simpleIcons as Record<string, SimpleIconData | undefined>)[key];
}
