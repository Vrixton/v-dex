import type { MedalLevel } from "@/content/stack";
import { cn } from "@/lib/cn";

type HexBadgeProps = {
  level: MedalLevel;
  scale?: 1 | 2 | 3;
  className?: string | undefined;
};

const COLUMN: Record<MedalLevel, number> = {
  gold: 0,
  silver: 1,
  bronze: 2,
  locked: 3,
};

const SIZE = 32;

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
