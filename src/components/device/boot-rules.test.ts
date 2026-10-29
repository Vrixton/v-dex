import { describe, expect, it } from "vitest";

import { petCookie, readPetId, readRestingAt, resolvePhase, restCookie } from "./boot-rules";
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
    expect(resolvePhase("tour", true)).toBe("tour");
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

describe("readRestingAt", () => {
  it("returns null when there is no cookie", () => {
    expect(readRestingAt("")).toBeNull();
  });

  it("reads the position when it is the only cookie", () => {
    expect(readRestingAt("vdex-pet-rest=right")).toBe("right");
  });

  it("reads the position from the middle of the cookie string", () => {
    expect(readRestingAt("theme=dark; vdex-pet-rest=center; sound=on")).toBe("center");
  });

  it("returns null when the cookie is there but empty", () => {
    expect(readRestingAt("vdex-pet-rest=")).toBeNull();
  });

  it("returns null for a value outside the allowed positions", () => {
    expect(readRestingAt("vdex-pet-rest=somewhere")).toBeNull();
  });

  it("does not read the pet cookie by mistake", () => {
    expect(readRestingAt("vdex-pet=cat")).toBeNull();
  });
});

describe("restCookie", () => {
  it("writes a cookie that readRestingAt can read back", () => {
    expect(readRestingAt(restCookie("left"))).toBe("left");
    expect(readRestingAt(restCookie("center"))).toBe("center");
    expect(readRestingAt(restCookie("right"))).toBe("right");
  });

  it("clears the cookie when the pet wakes up", () => {
    expect(readRestingAt(restCookie(null))).toBeNull();
  });
});

describe("the two pet cookies", () => {
  it("do not read each other despite the shared prefix", () => {
    const both = `${petCookie("alien")}; ${restCookie("right")}`;
    expect(readPetId(both)).toBe("alien");
    expect(readRestingAt(both)).toBe("right");
  });
});
