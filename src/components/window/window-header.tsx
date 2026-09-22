import type { ReactNode } from "react";

import { StatusLed, type LedTone } from "@/components/ui/status-led";

type WindowHeaderProps = {
  title: string;
  /** Texto tras el separador "//". El separador lo pone el componente. */
  breadcrumb?: string | undefined;
  ledTone?: LedTone | undefined;
  /** Badges o controles alineados a la derecha. */
  actions?: ReactNode | undefined;
};

export function WindowHeader({ title, breadcrumb, ledTone = "cyan", actions }: WindowHeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 md:px-6">
      <StatusLed tone={ledTone} shape="square" />
      <h2 className="text-sm tracking-[0.2em] text-fg md:text-base">{title}</h2>
      {breadcrumb ? (
        <span className="hidden text-xs tracking-[0.2em] text-fg-muted sm:inline md:text-sm">
          {`// ${breadcrumb}`}
        </span>
      ) : null}
      {actions ? <div className="ml-auto flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
