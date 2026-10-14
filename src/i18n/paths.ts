import { DEFAULT_LOCALE, LOCALES, type Locale } from "./locale";

/**
 * Rutas e idioma.
 *
 * El inglés vive sin prefijo y el español bajo /es:
 *
 *   /projects      → inglés
 *   /es/projects   → español
 *
 * Así el idioma viaja en el enlace: se puede compartir una página en español
 * y los buscadores indexan las dos versiones. Y el sitio ya estaba publicado,
 * así que las URLs en inglés no podían cambiar.
 *
 * Los prefijos solo existen aquí. Ningún componente los construye a mano.
 */

/** Los idiomas que llevan prefijo en la URL. */
const PREFIXED = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

function hasPrefix(path: string, locale: Locale): boolean {
  return path === `/${locale}` || path.startsWith(`/${locale}/`);
}

/** El idioma que pide una ruta. Sin prefijo, el de por defecto. */
export function localeFromPath(path: string): Locale {
  return PREFIXED.find((locale) => hasPrefix(path, locale)) ?? DEFAULT_LOCALE;
}

/** La ruta sin su prefijo de idioma: /es/projects → /projects */
export function stripLocale(path: string): string {
  const locale = PREFIXED.find((candidate) => hasPrefix(path, candidate));
  if (!locale) return path;
  return path.slice(locale.length + 1) || "/";
}

/** La misma ruta en otro idioma: ("/projects", "es") → /es/projects */
export function localePath(path: string, locale: Locale): string {
  const clean = stripLocale(path);
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}
