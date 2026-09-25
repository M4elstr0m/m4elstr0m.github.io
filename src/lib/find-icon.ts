import * as simpleIcons from 'simple-icons';

export interface SimpleIconData {
  path: string;
  title: string;
}

export function findIcon(label: string): SimpleIconData | undefined {
  const slug = label.toLowerCase().replace(/[^a-z0-9]/g, '');
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (simpleIcons as Record<string, SimpleIconData | undefined>)[key];
}
