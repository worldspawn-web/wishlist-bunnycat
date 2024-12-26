export const defaultLocale = 'ru';
export const locales = [defaultLocale] as const;
export type Locale = (typeof locales)[number];

export default {
  defaultLocale,
  locales,
} as const;
