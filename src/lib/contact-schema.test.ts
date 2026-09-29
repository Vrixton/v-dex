import { describe, expect, it } from "vitest";

import { hasErrors, looksLikeSpam, validateContact } from "./contact-schema";

const valid = {
  name: "Ash Ketchum",
  email: "ash@pallet.town",
  message: "Hey! I have a challenge for you. Interested in joining?",
};

describe("validateContact", () => {
  it("acepta un mensaje correcto", () => {
    expect(hasErrors(validateContact(valid))).toBe(false);
  });

  it("rechaza nombres demasiado cortos", () => {
    expect(validateContact({ ...valid, name: "A" }).name).toBe("TOO SHORT");
  });

  it("rechaza correos mal formados", () => {
    expect(validateContact({ ...valid, email: "ash@pallet" }).email).toBe("INVALID ADDRESS");
    expect(validateContact({ ...valid, email: "sin-arroba.com" }).email).toBe("INVALID ADDRESS");
  });

  it("rechaza mensajes demasiado cortos", () => {
    expect(validateContact({ ...valid, message: "hola" }).message).toBe("TOO SHORT");
  });

  it("ignora los espacios de alrededor", () => {
    expect(hasErrors(validateContact({ ...valid, name: "  Ash  " }))).toBe(false);
  });
});

describe("looksLikeSpam", () => {
  it("detecta el campo trampa", () => {
    expect(looksLikeSpam({ ...valid, website: "http://spam.example" })).toBe(true);
  });

  it("detecta envíos instantáneos", () => {
    const now = 10_000;
    expect(looksLikeSpam({ ...valid, startedAt: now - 500 }, now)).toBe(true);
  });

  it("deja pasar a una persona que tarda en escribir", () => {
    const now = 60_000;
    expect(looksLikeSpam({ ...valid, startedAt: now - 30_000 }, now)).toBe(false);
  });
});
