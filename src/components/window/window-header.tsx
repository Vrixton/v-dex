import type { ReactNode } from "react";

import { StatusLed, type LedTone } from "@/components/ui/status-led";
import { cn } from "@/lib/cn";

type WindowHeaderProps = {
  title: string;
  breadcrumb?: string | undefined;
  ledTone?: LedTone | undefined;
  actions?: ReactNode | undefined;
  className?: string | undefined;
};

export function WindowHeader({
  title,
  breadcrumb,
  ledTone = "cyan",
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
      <StatusLed tone={ledTone} shape="square" pulse={false} className="size-2 md:size-3" />
      <h2 className="text-sm text-fg md:text-base">{title}</h2>
      {breadcrumb ? (
        <span className="hidden text-xs text-fg-muted sm:inline md:text-sm">
          {`// ${breadcrumb}`}
        </span>
      ) : null}
      {actions ? <div className="ml-auto flex items-center gap-2 md:gap-3">{actions}</div> : null}
    </header>
  );
}
