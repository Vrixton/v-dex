import { describe, expect, it } from "vitest";

import { localeFromPath, localePath, stripLocale } from "./paths";

describe("localeFromPath", () => {
  it("sin prefijo es inglés", () => {
    expect(localeFromPath("/")).toBe("en");
    expect(localeFromPath("/projects")).toBe("en");
    expect(localeFromPath("/projects/farmatodo")).toBe("en");
  });

  it("con prefijo es el idioma del prefijo", () => {
    expect(localeFromPath("/es")).toBe("es");
    expect(localeFromPath("/es/projects")).toBe("es");
  });

  it("no confunde una ruta que empieza igual", () => {
    expect(localeFromPath("/essays")).toBe("en");
    expect(localeFromPath("/experience")).toBe("en");
  });
});

describe("stripLocale", () => {
  it("quita el prefijo", () => {
    expect(stripLocale("/es/projects")).toBe("/projects");
    expect(stripLocale("/es/projects/farmatodo")).toBe("/projects/farmatodo");
  });

  it("la raíz en español vuelve a la raíz", () => {
    expect(stripLocale("/es")).toBe("/");
  });

  it("deja igual lo que no lo tiene", () => {
    expect(stripLocale("/projects")).toBe("/projects");
    expect(stripLocale("/essays")).toBe("/essays");
    expect(stripLocale("/")).toBe("/");
  });
});

describe("localePath", () => {
  it("añade el prefijo para el español", () => {
    expect(localePath("/", "es")).toBe("/es");
    expect(localePath("/projects", "es")).toBe("/es/projects");
    expect(localePath("/projects/farmatodo", "es")).toBe("/es/projects/farmatodo");
  });

  it("el inglés nunca lleva prefijo", () => {
    expect(localePath("/", "en")).toBe("/");
    expect(localePath("/projects", "en")).toBe("/projects");
  });

  it("cambia de idioma sin acumular prefijos", () => {
    expect(localePath("/es/projects", "en")).toBe("/projects");
    expect(localePath("/es/projects", "es")).toBe("/es/projects");
    expect(localePath(localePath("/projects", "es"), "es")).toBe("/es/projects");
  });
});
