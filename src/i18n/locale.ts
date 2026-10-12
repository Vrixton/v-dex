export const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "vdex-locale";

export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type I18nText = Record<Locale, string>;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function translator(locale: Locale): (text: I18nText) => string {
  return (text) => text[locale];
}
