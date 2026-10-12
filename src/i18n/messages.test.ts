import { describe, expect, it } from "vitest";

import { LOCALES } from "./locale";
import { MESSAGES } from "./messages";

function leaves(value: unknown, path = ""): Array<[string, Record<string, unknown>]> {
  if (value === null || typeof value !== "object") return [];
  const entry = value as Record<string, unknown>;

  if (typeof entry[LOCALES[0]] === "string") return [[path, entry]];

  return Object.entries(entry).flatMap(([key, child]) =>
    leaves(child, path ? `${path}.${key}` : key),
  );
}

describe("MESSAGES", () => {
  const found = leaves(MESSAGES);

  it("tiene textos", () => {
    expect(found.length).toBeGreaterThan(0);
  });

  it.each(found)("%s está en todos los idiomas y sin huecos", (_path, text) => {
    for (const locale of LOCALES) {
      expect(typeof text[locale]).toBe("string");
      expect(String(text[locale]).trim()).not.toBe("");
    }
  });

  it.each(found)("%s no tiene más claves que los idiomas", (_path, text) => {
    expect(Object.keys(text).sort()).toEqual([...LOCALES].sort());
  });
});
