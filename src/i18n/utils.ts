import { ui, defaultLocale, type Locale, type UiKey } from './ui';

export function normalizeLocale(locale: string | undefined): Locale {
  return locale === 'fr' ? 'fr' : defaultLocale;
}

export function useTranslations(locale: string | undefined) {
  const resolved = normalizeLocale(locale);
  return function t(key: UiKey): string {
    return ui[resolved][key] ?? ui[defaultLocale][key];
  };
}
