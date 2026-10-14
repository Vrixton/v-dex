import { statSync } from "node:fs";
import path from "node:path";
import { CV_FILE } from "@/content/contact";
import type { Locale } from "@/i18n/locale";

export function cvPath(locale: Locale): string {
  return path.join(process.cwd(), "public", CV_FILE[locale]);
}

export function readCvSize(locale: Locale): string {
  try {
    const stats = statSync(cvPath(locale));
    return `${Math.round(stats.size / 1024)} KB`;
  } catch {
    return "—";
  }
}

export function readCvBytes(locale: Locale): number | null {
  try {
    return statSync(cvPath(locale)).size;
  } catch {
    return null;
  }
}
