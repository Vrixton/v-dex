import { describe, expect, it } from "vitest";

import { petCookie, readPetId, resolvePhase } from "./boot-rules";
import { DEFAULT_PET } from "./pets";

describe("resolvePhase", () => {
  it("starts closed on a first visit", () => {
    expect(resolvePhase("idle", true)).toBe("closed");
  });

  it("starts open for a returning visitor", () => {
    expect(resolvePhase("idle", false)).toBe("done");
  });

  it("follows the progress once the visitor has acted", () => {
    expect(resolvePhase("powering", true)).toBe("powering");
    expect(resolvePhase("welcome", true)).toBe("welcome");
    expect(resolvePhase("done", true)).toBe("done");
  });
});

describe("readPetId", () => {
  it("falls back to the default pet when there is no cookie", () => {
    expect(readPetId("")).toBe(DEFAULT_PET.id);
  });

  it("reads the pet when it is the only cookie", () => {
    expect(readPetId("vdex-pet=cat")).toBe("cat");
  });

  it("reads the pet from the middle of the cookie string", () => {
    expect(readPetId("theme=dark; vdex-pet=hamster; sound=on")).toBe("hamster");
  });

  it("ignores a cookie whose name only ends with the same text", () => {
    expect(readPetId("not-vdex-pet=cat")).toBe(DEFAULT_PET.id);
  });

  it("falls back when the cookie is there but empty", () => {
    expect(readPetId("vdex-pet=")).toBe(DEFAULT_PET.id);
  });

  it("decodes an encoded value", () => {
    expect(readPetId("vdex-pet=a%20b")).toBe("a b");
  });
});

describe("petCookie", () => {
  it("writes a cookie that readPetId can read back", () => {
    expect(readPetId(petCookie("hamster"))).toBe("hamster");
  });
});
