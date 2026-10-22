import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className?: string | undefined;
}) {
  const ratio = max <= 0 ? 0 : Math.min(Math.max(value / max, 0), 1);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("h-2 overflow-hidden border border-brand-cyan/30 bg-black/40", className)}
    >
      <span
        className="block h-full bg-brand-cyan transition-[width] duration-300 ease-out motion-reduce:transition-none"
        style={{ width: `${ratio * 100}%` }}
      />
    </div>
  );
}
