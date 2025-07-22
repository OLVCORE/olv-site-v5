export const locales = ['pt', 'en', 'es', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

export const routing = {
  locales: locales as unknown as string[],
  defaultLocale,
  localePrefix: 'as-needed' as const,
}; 