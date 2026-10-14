import type { Locale } from "../locale";

import { en, type Messages } from "./en";
import { es } from "./es";

const MESSAGES: Record<Locale, Messages> = { en, es };

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale];
}

export type { Messages };
