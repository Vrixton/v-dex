import { describe, expect, it } from "vitest";

import { hasErrors, LIMITS, looksLikeSpam, validateContact } from "./contact-schema";

const valid = {
  name: "Ash Ketchum",
  email: "ash@pallet.town",
  message: "Hey! I have a challenge for you. Interested in joining?",
};

describe("validateContact", () => {
  it("accepts a valid message", () => {
    expect(hasErrors(validateContact(valid))).toBe(false);
  });

  it("rejects a name that is too short", () => {
    expect(validateContact({ ...valid, name: "A" }).name).toBe("tooShort");
  });

  it("rejects a name that is too long", () => {
    const name = "A".repeat(LIMITS.name.max + 1);
    expect(validateContact({ ...valid, name }).name).toBe("tooLong");
  });

  it("rejects a malformed email", () => {
    expect(validateContact({ ...valid, email: "ash@pallet" }).email).toBe("invalidEmail");
    expect(validateContact({ ...valid, email: "no-at-sign.com" }).email).toBe("invalidEmail");
  });

  it("rejects a message that is too short", () => {
    expect(validateContact({ ...valid, message: "hi" }).message).toBe("tooShort");
  });

  it("rejects a message that is too long", () => {
    const message = "a".repeat(LIMITS.message.max + 1);
    expect(validateContact({ ...valid, message }).message).toBe("tooLong");
  });

  it("tells too short apart from too long on the same field", () => {
    const short = validateContact({ ...valid, name: "A" }).name;
    const long = validateContact({ ...valid, name: "A".repeat(LIMITS.name.max + 1) }).name;

    expect(short).not.toBe(long);
  });

  it("reports every invalid field at once", () => {
    const errors = validateContact({ name: "A", email: "nope", message: "hi" });

    expect(errors).toEqual({
      name: "tooShort",
      email: "invalidEmail",
      message: "tooShort",
    });
  });

  it("ignores surrounding whitespace", () => {
    expect(hasErrors(validateContact({ ...valid, name: "  Ash  " }))).toBe(false);
  });
});

describe("looksLikeSpam", () => {
  it("catches the honeypot field", () => {
    expect(looksLikeSpam({ ...valid, website: "http://spam.example" })).toBe(true);
  });

  it("catches instant submissions", () => {
    const now = 10_000;
    expect(looksLikeSpam({ ...valid, startedAt: now - 500 }, now)).toBe(true);
  });

  it("lets through someone who takes their time", () => {
    const now = 60_000;
    expect(looksLikeSpam({ ...valid, startedAt: now - 30_000 }, now)).toBe(false);
  });
});
