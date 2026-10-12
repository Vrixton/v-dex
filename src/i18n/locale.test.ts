import { describe, expect, it } from "vitest";

import { DEFAULT_LOCALE, isLocale, LOCALES, translator, type I18nText } from "./locale";

const sample: I18nText = { en: "Projects", es: "Proyectos" };

describe("isLocale", () => {
  it("acepta los idiomas del sitio", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
  });

  it("rechaza cualquier otra cosa", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(42)).toBe(false);
  });
});

describe("translator", () => {
  it("elige la versión del idioma pedido", () => {
    expect(translator("en")(sample)).toBe("Projects");
    expect(translator("es")(sample)).toBe("Proyectos");
  });
});

describe("configuración", () => {
  it("arranca en inglés", () => {
    expect(DEFAULT_LOCALE).toBe("en");
  });

  it("no repite idiomas", () => {
    expect(new Set(LOCALES).size).toBe(LOCALES.length);
  });
});
