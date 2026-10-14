"use client";

import { useEffect } from "react";

import { useToast } from "@/components/toast/toast-context";

import { isLocale, LOCALE_NAMES } from "./locale";
import { useMessages } from "./locale-provider";

export const LOCALE_NOTICE_KEY = "vdex-locale-changed";

export function LocaleNotice() {
  const toast = useToast();
  const { label, languageSet } = useMessages().device.system;

  useEffect(() => {
    let changed: string | null = null;
    try {
      changed = window.sessionStorage.getItem(LOCALE_NOTICE_KEY);
      if (changed) window.sessionStorage.removeItem(LOCALE_NOTICE_KEY);
    } catch {
      return;
    }

    if (!isLocale(changed)) return;

    toast({
      label,
      value: `${languageSet} - ${LOCALE_NAMES[changed].toUpperCase()}`,
      tone: "success",
      key: "locale",
    });
  }, [toast, label, languageSet]);

  return null;
}
