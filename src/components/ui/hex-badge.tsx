import type { MedalLevel } from "@/content/stack";
import { cn } from "@/lib/cn";

type HexBadgeProps = {
  level: MedalLevel;
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
 * al escalarlo.
 */
export function HexBadge({ level, className }: HexBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("block shrink-0 bg-[url('/medal-sheet.webp')] bg-no-repeat", className)}
      style={{
        width: SIZE,
        height: SIZE,
        backgroundSize: `${SIZE * 4}px ${SIZE}px`,
        backgroundPosition: `${-COLUMN[level] * SIZE}px 0`,
        imageRendering: "pixelated",
      }}
    />
  );
}
