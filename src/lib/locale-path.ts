export const LOCALE_STORAGE_KEY = 'preferred-locale';

export function isHomePath(pathname: string): boolean {
  return pathname === '/' || pathname === '/fr' || pathname === '/fr/';
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/fr') return '/';
  if (pathname.startsWith('/fr/')) return pathname.slice(3);
  return pathname;
}
