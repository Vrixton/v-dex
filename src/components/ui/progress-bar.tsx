import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  max = 100,
  minFill = 0,
  caption,
  label,
  ariaLabel,
  className,
}: {
  value: number;
  max?: number | undefined;
  minFill?: number | undefined;
  caption?: ReactNode | undefined;
  label?: ReactNode | undefined;
  ariaLabel?: string | undefined;
  className?: string | undefined;
}) {
  const ratio = max <= 0 ? 0 : Math.min(Math.max(value / max, 0), 1);
  const width = Math.max(ratio * 100, minFill);

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-l-full bg-gradient-to-r from-transparent to-[color-mix(in_oklab,var(--vdex-yellow-400)_40%,transparent)] py-1.5 pr-3 pl-2",
        className,
      )}
    >
      {caption ? <span className="text-sm text-fg uppercase">[{caption}]:</span> : null}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
        className="relative h-4 flex-1 overflow-hidden rounded-full bg-brand-yellow"
      >
        <div
          className="flex h-full items-center rounded-full bg-gradient-to-r from-white/20 to-white/80 px-2 transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${width}%` }}
        >
          {label ? (
            <span className="text-[10px] whitespace-nowrap text-screen md:text-xs">{label}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
