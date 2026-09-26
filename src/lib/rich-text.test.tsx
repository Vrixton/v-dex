import { describe, expect, it } from "vitest";

import { stripHighlight } from "./rich-text";

describe("stripHighlight", () => {
  it("quita las marcas y deja el texto", () => {
    expect(stripHighlight("Led the **product reviews** feature")).toBe(
      "Led the product reviews feature",
    );
  });

  it("aguanta varias marcas en la misma frase", () => {
    expect(stripHighlight("**React** and **TypeScript**")).toBe("React and TypeScript");
  });

  it("deja intacto un texto sin marcas", () => {
    expect(stripHighlight("plain text")).toBe("plain text");
  });
});
