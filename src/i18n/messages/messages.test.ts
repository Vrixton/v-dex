import { describe, expect, it } from "vitest";

import { LOCALES } from "../locale";
import { en } from "./en";
import { es } from "./es";

const SAME_IN_BOTH = new Set<string>([
  "about.skills.coreWebVitals",
  "about.skills.codeSplitting",
  "about.avatar.exp", // EXP.
  "about.cv.subtitle", // CV
  "about.legend.personal",
  "stack.medal",
  "experience.roles.farmatodo.location",
  "projects.items.farmatodo.company",
  "projects.items.uhomie.company",
  "projects.items.texastv.company",
  "projects.items.swe.company",
  "projects.items.novios-a-bordo.company",
  "contact.signal.labels.error",
  "contact.form.title",
  "contact.form.fields.name.placeholder",
]);

type Flat = Record<string, string>;

function flatten(value: unknown, prefix = ""): Flat {
  if (typeof value === "string") {
    return { [prefix]: value };
  }

  if (Array.isArray(value)) {
    return Object.assign({}, ...value.map((item, i) => flatten(item, `${prefix}[${i}]`)));
  }

  if (value !== null && typeof value === "object") {
    return Object.assign(
      {},
      ...Object.entries(value).map(([key, inner]) =>
        flatten(inner, prefix ? `${prefix}.${key}` : key),
      ),
    );
  }

  throw new Error(`Unsupported value in catalog: ${prefix}`);
}

const flatEn = flatten(en);
const flatEs = flatten(es);

function tokens(text: string): string {
  return (text.match(/\{[a-z]+\}/gi) ?? []).sort().join();
}

describe("message catalogs", () => {
  it("covers every locale declared in LOCALES", () => {
    expect(LOCALES).toHaveLength(2);
  });

  it("has the same keys in every language", () => {
    expect(Object.keys(flatEs).sort()).toEqual(Object.keys(flatEn).sort());
  });

  it("has no empty strings", () => {
    const empty = [...Object.entries(flatEn), ...Object.entries(flatEs)]
      .filter(([, text]) => text.trim() === "")
      .map(([key]) => key);

    expect(empty).toEqual([]);
  });

  it("leaves no text untranslated", () => {
    const untranslated = Object.entries(flatEn)
      .filter(([key, text]) => !SAME_IN_BOTH.has(key) && flatEs[key] === text)
      .map(([key]) => key);

    expect(untranslated).toEqual([]);
  });

  it("keeps no stale entries in SAME_IN_BOTH", () => {
    const stale = [...SAME_IN_BOTH].filter((key) => flatEn[key] !== flatEs[key]);

    expect(stale).toEqual([]);
  });

  it("keeps interpolation placeholders in every language", () => {
    const mismatched = Object.entries(flatEn)
      .filter(([key, text]) => tokens(text) !== tokens(flatEs[key] ?? ""))
      .map(([key]) => key);

    expect(mismatched).toEqual([]);
  });
});
