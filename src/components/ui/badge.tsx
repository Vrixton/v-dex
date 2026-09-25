import type { ReactNode } from "react";

import { StatusLed, type LedTone } from "@/components/ui/status-led";
import { cn } from "@/lib/cn";

type BadgeProps = {
  tone?: LedTone;
  /** Muestra un LED a la izquierda, como en "SYNC: READY". */
  led?: boolean;
  /** El LED late, para estados vivos. */
  pulse?: boolean;
  children: ReactNode;
  className?: string;
};

const toneClass: Record<LedTone, string> = {
  green: "text-status-ok border-status-ok/50",
  cyan: "text-brand-cyan border-brand-cyan/50",
  yellow: "text-brand-yellow border-brand-yellow/50",
  red: "text-fg-danger border-fg-danger/50",
  white: "text-fg border-white/40",
};

/**
 * Etiqueta de estado de la cabecera: SYNC: READY, 15 RECORDS FOUND,
 * NRO. #???… Misma forma para todas; solo cambia el tono y si lleva LED.
 */
export function Badge({
  tone = "cyan",
  led = false,
  pulse = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 rounded-control border bg-current/10 px-3 py-1 text-xs whitespace-nowrap md:text-sm",
        toneClass[tone],
        className,
      )}
    >
      {led ? <StatusLed tone={tone} pulse={pulse} className="size-2" /> : null}
      <span className="text-current">{children}</span>
    </span>
  );
}
