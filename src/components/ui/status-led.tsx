import { cn } from "@/lib/cn";

export type LedTone = "green" | "cyan" | "yellow" | "red" | "white";
type LedShape = "round" | "square";

type StatusLedProps = {
  tone: LedTone;
  shape?: LedShape;
  pulse?: boolean;
  className?: string;
};

const toneClass: Record<LedTone, string> = {
  green: "text-status-ok",
  cyan: "text-brand-cyan",
  yellow: "text-brand-yellow",
  red: "text-brand-red",
  white: "text-white",
};

const shapeClass: Record<LedShape, string> = {
  round: "rounded-full",
  square: "rounded-[3px]",
};

export function StatusLed({ tone, shape = "round", pulse = false, className }: StatusLedProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-block size-3 shrink-0", toneClass[tone], className)}
    >
      <span
        className={cn(
          "absolute inset-0 opacity-50 shadow-[0_0_10px_4px_currentColor]",
          shapeClass[shape],
          pulse && "motion-safe:animate-led-pulse",
        )}
      />
      <span className={cn("absolute inset-0 bg-current", shapeClass[shape])} />
    </span>
  );
}
