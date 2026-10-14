import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./locale";

/**
 * Props de cualquier page o layout bajo `app/[locale]`.
 * El segmento llega como `string` porque es lo que declara Next; la validación
 * la hace `routeLocale`.
 */
export type LocaleRouteProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Lee y valida el segmento de idioma de la ruta.
 * Una URL con un idioma que no soportamos es un 404, no un fallback silencioso:
 * así `/fr/projects` no devuelve 200 con contenido en inglés.
 */
export async function routeLocale(params: LocaleRouteProps["params"]): Promise<Locale> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}
