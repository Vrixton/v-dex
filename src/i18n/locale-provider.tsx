"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Locale } from "./locale";
import type { Messages } from "./messages/en";

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  return <LocaleContext value={{ locale, messages }}>{children}</LocaleContext>;
}

function useLocaleContext(): LocaleContextValue {
  const value = useContext(LocaleContext);

  if (value === null) {
    throw new Error("useLocale() and useMessages() need a <LocaleProvider> above them.");
  }

  return value;
}

export function useLocale(): Locale {
  return useLocaleContext().locale;
}

export function useMessages(): Messages {
  return useLocaleContext().messages;
}
