import { LOCALE_STORAGE_KEY } from '../locale-path';

function maybeRedirectForLocale() {
  if (location.pathname !== '/') return;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return;
  }
  if (stored) return;

  const languages = navigator.languages ?? [navigator.language];
  const prefersFr = languages.some((lang) => lang?.toLowerCase().startsWith('fr'));
  if (!prefersFr) return;

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'fr');
  } catch {
    return;
  }
  location.replace('/fr/');
}

export function initLocaleRedirect() {
  maybeRedirectForLocale();
  document.addEventListener('astro:page-load', maybeRedirectForLocale);
}
