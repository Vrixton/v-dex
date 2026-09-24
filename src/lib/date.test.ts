import { describe, expect, it } from "vitest";

import { completedYears, yearProgress } from "./date";

const BIRTH = "1996-02-25";
const CAREER = "2016-08-01";

describe("completedYears", () => {
  it("cuenta el año solo cuando ya pasó el aniversario", () => {
    expect(completedYears(BIRTH, new Date("2026-02-24T12:00:00Z"))).toBe(29);
    expect(completedYears(BIRTH, new Date("2026-02-25T12:00:00Z"))).toBe(30);
  });

  it("calcula los años de experiencia", () => {
    // Empezó en agosto de 2016: en julio de 2026 aún son 9
    expect(completedYears(CAREER, new Date("2026-07-31T12:00:00Z"))).toBe(9);
    expect(completedYears(CAREER, new Date("2026-08-01T12:00:00Z"))).toBe(10);
  });

  it("nunca devuelve negativos", () => {
    expect(completedYears(CAREER, new Date("2010-01-01T12:00:00Z"))).toBe(0);
  });
});

describe("yearProgress", () => {
  it("vale 0 el día del aniversario", () => {
    expect(yearProgress(CAREER, new Date("2026-08-01T00:00:00Z"))).toBe(0);
  });

  it("crece según avanza el año", () => {
    const early = yearProgress(CAREER, new Date("2026-10-01T00:00:00Z"));
    const late = yearProgress(CAREER, new Date("2027-06-01T00:00:00Z"));
    expect(early).toBeGreaterThan(0);
    expect(late).toBeGreaterThan(early);
    expect(late).toBeLessThan(1);
  });

  it("se queda dentro de 0 y 1", () => {
    expect(yearProgress(CAREER, new Date("2010-01-01T00:00:00Z"))).toBeGreaterThanOrEqual(0);
    expect(yearProgress(CAREER, new Date("2040-01-01T00:00:00Z"))).toBeLessThanOrEqual(1);
  });
});
