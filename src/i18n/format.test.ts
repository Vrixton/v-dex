import { describe, expect, it } from "vitest";

import { format } from "./format";

describe("format", () => {
  it("replaces a placeholder", () => {
    expect(format("+{years} years", { years: 10 })).toBe("+10 years");
  });

  it("replaces the same placeholder every time it appears", () => {
    expect(format("{n} of {n}", { n: 3 })).toBe("3 of 3");
  });

  it("accepts numbers and strings", () => {
    expect(format("{a}/{b}", { a: 4, b: "twelve" })).toBe("4/twelve");
  });

  it("leaves the placeholder visible when the value is missing", () => {
    expect(format("+{years} years", {})).toBe("+{years} years");
  });

  it("leaves text without placeholders untouched", () => {
    expect(format("SKILLS", { years: 1 })).toBe("SKILLS");
  });
});
