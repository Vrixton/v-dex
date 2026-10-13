"use client";

import { useEffect } from "react";

import { useToast } from "@/components/toast/toast-context";

import { isLocale, type Locale } from "./locale";

/**
 * Aviso al encender después de cambiar el idioma.
 *
 * El cambio recarga la página, así que la marca viaja por sessionStorage: la
 * deja el selector antes de irse y la recoge esto al montar. Se borra en
 * cuanto se usa, para que recargar a mano no vuelva a anunciarlo.
 *
 * No renderiza nada: solo dispara el aviso.
 */
export const LOCALE_NOTICE_KEY = "vdex-locale-changed";

const NAMES: Record<Locale, string> = { en: "ENGLISH", es: "ESPAÑOL" };

export function LocaleNotice() {
  const toast = useToast();

  useEffect(() => {
    let changed: string | null = null;
    try {
      changed = window.sessionStorage.getItem(LOCALE_NOTICE_KEY);
      if (changed) window.sessionStorage.removeItem(LOCALE_NOTICE_KEY);
    } catch {
      // Navegación privada o almacenamiento bloqueado: sin aviso y ya está
      return;
    }

    if (!isLocale(changed)) return;

    toast({
      label: "SYSTEM",
      value: `LANG_SET - ${NAMES[changed]}`,
      tone: "success",
      key: "locale",
    });
  }, [toast]);

  return null;
}
