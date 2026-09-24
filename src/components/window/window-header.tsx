import type { ReactNode } from "react";

import { StatusLed, type LedTone } from "@/components/ui/status-led";
import { cn } from "@/lib/cn";

type WindowHeaderProps = {
  title: string;
  /** Texto tras el separador "//". El separador lo pone el componente. */
  breadcrumb?: string | undefined;
  /** Color del LED. Cada vista usa el suyo. */
  ledTone?: LedTone | undefined;
  /** El LED late como un bombillo. Activado por defecto. */
  ledPulse?: boolean | undefined;
  /** Zona libre a la derecha: badges, contadores, estados… */
  actions?: ReactNode | undefined;
  className?: string | undefined;
};

/**
 * Barra de título de la ventana.
 *
 * Es la misma en todas las vistas y solo cambian tres cosas: el título, el
 * color del LED y lo que se ponga a la derecha. Por eso `actions` es un
 * hueco abierto en vez de una lista cerrada de opciones.
 */
export function WindowHeader({
  title,
  breadcrumb,
  ledTone = "cyan",
  ledPulse = true,
  actions,
  className,
}: WindowHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center gap-3 border-b border-white/10 bg-window-header px-4 py-3 md:px-6",
        className,
      )}
    >
      <StatusLed tone={ledTone} shape="square" pulse={ledPulse} />
      <h2 className="ml-3 text-sm text-fg md:text-base">{title}</h2>
      {breadcrumb ? (
        <span className="hidden text-xs tracking-[0.2em] text-fg-muted sm:inline md:text-sm">
          {`// ${breadcrumb}`}
        </span>
      ) : null}
      {actions ? <div className="ml-auto flex items-center gap-2 md:gap-3">{actions}</div> : null}
    </header>
  );
}
