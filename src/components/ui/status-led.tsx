import { cn } from "@/lib/cn";

type LedTone = "green" | "cyan" | "yellow" | "red" | "white";
type LedShape = "round" | "square";

type StatusLedProps = {
  tone: LedTone;
  shape?: LedShape;
  /** El halo respira, como el filamento de un bombillo. El color no cambia. */
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

/**
 * Luz indicadora. Son dos capas: el núcleo, siempre encendido y con su color
 * fijo, y el halo, que es lo único que se anima.
 *
 * El halo anima solo opacity y scale, que el navegador resuelve en la GPU.
 * Animar box-shadow directamente obligaría a repintar en cada frame.
 */
export function StatusLed({ tone, shape = "round", pulse = false, className }: StatusLedProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-block size-3 shrink-0", toneClass[tone], className)}
    >
      {/* Halo */}
      <span
        className={cn(
          "absolute inset-0 shadow-[0_0_10px_4px_currentColor]",
          shapeClass[shape],
          pulse && "motion-safe:animate-led-pulse",
        )}
      />
      {/* Núcleo */}
      <span className={cn("absolute inset-0 bg-current", shapeClass[shape])} />
    </span>
  );
}
