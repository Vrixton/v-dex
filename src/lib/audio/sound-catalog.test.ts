import { describe, expect, it } from "vitest";

import { MAX_VOLUME, SOUNDS, type SoundSpec } from "./sound-catalog";

// "as const satisfies" conserva los literales, así que se ensancha el tipo
// para recorrer el catálogo con una forma común.
const entries = Object.entries(SOUNDS) as Array<[string, SoundSpec]>;

describe("catálogo de sonidos", () => {
  it("mantiene todos los volúmenes por debajo del tope", () => {
    for (const [name, spec] of entries) {
      expect(spec.volume, name).toBeGreaterThan(0);
      expect(spec.volume, name).toBeLessThanOrEqual(MAX_VOLUME);
    }
  });

  it("usa duraciones cortas, para que ningún sonido se solape consigo mismo", () => {
    for (const [name, spec] of entries) {
      expect(spec.duration, name).toBeGreaterThan(0);
      expect(spec.duration, name).toBeLessThanOrEqual(0.3);
    }
  });

  it("empieza cada arpegio en la nota declarada como inicial", () => {
    for (const [name, spec] of entries) {
      if (!spec.steps) continue;
      expect(spec.steps[0], name).toBe(spec.from);
    }
  });

  it("distingue mover el cursor de confirmar", () => {
    // Si sonaran igual, el menú no comunicaría nada al elegir
    const hover: SoundSpec = SOUNDS.hover;
    const select: SoundSpec = SOUNDS.select;
    expect(hover.steps).toBeUndefined();
    expect(select.steps?.length).toBe(2);
    expect(SOUNDS.click.from).not.toBe(SOUNDS.select.from);
  });

  it("se queda dentro del rango audible", () => {
    for (const [name, spec] of entries) {
      expect(spec.from, name).toBeGreaterThanOrEqual(60);
      expect(spec.from, name).toBeLessThanOrEqual(6000);
      if (spec.to !== undefined) {
        // La rampa exponencial no admite llegar a cero
        expect(spec.to, name).toBeGreaterThan(0);
      }
    }
  });

  it("reparte el arpegio en notas audibles, no en destellos", () => {
    for (const [name, spec] of entries) {
      if (!spec.steps) continue;
      expect(spec.duration / spec.steps.length, name).toBeGreaterThanOrEqual(0.03);
    }
  });

  it("acompaña la animación de las láminas con su misma duración", () => {
    // Si cambias SHUTTER_MS, cambia también estas dos duraciones
    expect(SOUNDS.shutterClose.duration).toBe(0.26);
    expect(SOUNDS.shutterOpen.duration).toBe(0.26);
  });
});
