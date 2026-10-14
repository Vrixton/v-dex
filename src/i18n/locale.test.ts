import { describe, expect, it } from "vitest";

import { DEFAULT_LOCALE, isLocale, LOCALE_NAMES, LOCALES } from "./locale";

describe("isLocale", () => {
  it("accepts the site's languages", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(42)).toBe(false);
  });
});

describe("configuration", () => {
  it("starts in English", () => {
    expect(DEFAULT_LOCALE).toBe("en");
  });

  it("lists no language twice", () => {
    expect(new Set(LOCALES).size).toBe(LOCALES.length);
  });

  it("names every language", () => {
    for (const locale of LOCALES) {
      expect(LOCALE_NAMES[locale]).toBeTruthy();
    }
  });
});
