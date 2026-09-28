import * as simpleIcons from 'simple-icons';

export interface SimpleIconData {
  path: string;
  title: string;
}

const ICON_LOOKUP_EXCLUSIONS = new Set(['tui']);

export function findIcon(label: string): SimpleIconData | undefined {
  const slug = label.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (ICON_LOOKUP_EXCLUSIONS.has(slug)) return undefined;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (simpleIcons as Record<string, SimpleIconData | undefined>)[key];
}
