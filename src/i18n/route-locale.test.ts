import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LOCALES } from "./locale";
import { routeLocale } from "./route-locale";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("routeLocale", () => {
  beforeEach(() => {
    vi.mocked(notFound).mockClear();
  });

  it.each(LOCALES)("returns %s for a supported segment", async (locale) => {
    await expect(routeLocale(Promise.resolve({ locale }))).resolves.toBe(locale);
    expect(notFound).not.toHaveBeenCalled();
  });

  it("returns a 404 for an unsupported language", async () => {
    await expect(routeLocale(Promise.resolve({ locale: "fr" }))).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("returns a 404 for an empty segment", async () => {
    await expect(routeLocale(Promise.resolve({ locale: "" }))).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledOnce();
  });
});
