import type { MedalLevel } from "@/content/stack";
import { cn } from "@/lib/cn";

type HexBadgeProps = {
  level: MedalLevel;
  /** Múltiplo del tamaño nativo. Solo enteros: si no, los píxeles se deforman. */
  scale?: 1 | 2 | 3;
  className?: string | undefined;
};

/** Orden de las medallas dentro de medal-sheet.webp. */
const COLUMN: Record<MedalLevel, number> = {
  gold: 0,
  silver: 1,
  bronze: 2,
  locked: 3,
};

const SIZE = 32; // tamaño nativo de cada medalla, en píxeles

/**
 * Medalla del stack.
 *
 * Las cuatro variantes viven en una sola imagen de 128x32: una única
 * descarga de menos de 1 KB, y elegir cuál se muestra es mover el fondo.
 * image-rendering: pixelated evita que el navegador suavice el pixel art
 * al escalarlo, y la escala va en múltiplos enteros para que todos los
 * píxeles midan lo mismo.
 */
export function HexBadge({ level, scale = 2, className }: HexBadgeProps) {
  const size = SIZE * scale;

  return (
    <span
      aria-hidden="true"
      className={cn("block shrink-0 bg-[url('/medal-sheet.webp')] bg-no-repeat", className)}
      style={{
        width: size,
        height: size,
        backgroundSize: `${size * 4}px ${size}px`,
        backgroundPosition: `${-COLUMN[level] * size}px 0`,
        imageRendering: "pixelated",
      }}
    />
  );
}
