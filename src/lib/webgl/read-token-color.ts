type Rgb = [number, number, number];

/** Convierte "#b8f4f8" en [0.72, 0.95, 0.97]. */
function hexToRgb(hex: string, fallback: Rgb): Rgb {
  const clean = hex.trim().replace("#", "");
  if (clean.length !== 6) return fallback;

  const value = Number.parseInt(clean, 16);
  if (Number.isNaN(value)) return fallback;

  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

/**
 * Lee un color de los design tokens.
 *
 * El shader necesita números, pero la paleta vive en tokens.css: leerla en
 * tiempo de ejecución evita duplicar los colores y que el fondo se quede
 * desincronizado si mañana cambias uno.
 */
export function readTokenColor(name: string, fallback: Rgb): Rgb {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name);
  return value ? hexToRgb(value, fallback) : fallback;
}
