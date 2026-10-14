import { describe, expect, it } from "vitest";
import { CV_FILE } from "@/content/contact";
import { LOCALES } from "@/i18n/locale";
import { readCvBytes, readCvSize } from "./cv-meta";

const MIN_BYTES = 40 * 1024;
const MAX_SIZE_RATIO = 3;

describe("CV files", () => {
  it.each(LOCALES)("ships a CV for %s", (locale) => {
    expect(readCvBytes(locale), `missing public/${CV_FILE[locale]}`).not.toBeNull();
  });

  it.each(LOCALES)("ships a CV for %s that is not a stub", (locale) => {
    expect(readCvBytes(locale) ?? 0).toBeGreaterThan(MIN_BYTES);
  });

  it("ships CVs of comparable size in every language", () => {
    const sizes = LOCALES.map((locale) => readCvBytes(locale) ?? 0);
    const ratio = Math.max(...sizes) / Math.min(...sizes);

    expect(ratio).toBeLessThan(MAX_SIZE_RATIO);
  });

  it.each(LOCALES)("reports a readable size for %s", (locale) => {
    expect(readCvSize(locale)).toMatch(/^\d+ KB$/);
  });

  it("gives every CV its own file name", () => {
    const names = LOCALES.map((locale) => CV_FILE[locale]);

    expect(new Set(names).size).toBe(names.length);
  });
});
