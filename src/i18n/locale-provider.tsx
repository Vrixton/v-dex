"use client";

import { createContext, useContext, type ReactNode } from "react";

import { DEFAULT_LOCALE, translator, type I18nText, type Locale } from "./locale";

/**
 * Reparte el idioma por el árbol de cliente.
 *
 * La cookie solo la puede leer el servidor, y el menú o el formulario son de
 * cliente. En vez de ir pasando el idioma de componente en componente, el
 * layout lo lee una vez y lo deja aquí.
 *
 * No guarda estado: el valor viene del servidor en cada render, así que
 * cambiar de idioma es una vuelta al servidor, no un cambio local. Así
 * nunca hay dos verdades sobre qué idioma está activo.
 */
const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** El selector de textos, para componentes de cliente. */
export function useTranslator(): (text: I18nText) => string {
  return translator(useContext(LocaleContext));
}
