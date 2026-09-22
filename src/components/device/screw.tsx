import { cn } from "@/lib/cn";

type ScrewProps = {
  /** Ángulo de la ranura, en grados. Variarlo evita que todos se vean clonados. */
  angle?: number;
  className?: string;
};

export function Screw({ angle = 45, className }: ScrewProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-block size-6 shrink-0 rounded-full border border-seam bg-(image:--gradient-screw) md:size-5",
        className,
      )}
    >
      <span
        className="absolute inset-x-1 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-seam"
        style={{ rotate: `${angle}deg` }}
      />
    </span>
  );
}
