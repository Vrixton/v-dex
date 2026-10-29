import type { ReactNode } from "react";

import type { LedTone } from "@/components/ui/status-led";
import { cn } from "@/lib/cn";

import { WindowHeader } from "./window-header";
import { CrtSweep } from "./crt-sweep";

type WindowProps = {
  id?: string | undefined;
  title?: string | undefined;
  breadcrumb?: string | undefined;
  ledTone?: LedTone | undefined;
  actions?: ReactNode | undefined;
  fill?: boolean | undefined;
  scrollable?: boolean | undefined;
  footer?: ReactNode | undefined;
  children: ReactNode;
  className?: string | undefined;
};

export function Window({
  id,
  title,
  breadcrumb,
  ledTone = "cyan",
  actions,
  fill = false,
  scrollable = false,
  footer,
  children,
  className,
}: WindowProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate flex flex-col overflow-hidden rounded-window border border-white/10 bg-window inset-shadow-window",
        fill && "h-[calc(98dvh-var(--screen-inset-top)-var(--screen-inset-bottom))]",
        className,
      )}
    >
      {title ? (
        <WindowHeader title={title} breadcrumb={breadcrumb} ledTone={ledTone} actions={actions} />
      ) : null}

      {scrollable ? (
        <div className="relative z-10 min-h-0 flex-1">
          <div
            tabIndex={0}
            role="region"
            aria-label={title}
            className="h-full hud-scrollbar overflow-y-auto overscroll-contain p-5 focus-visible:outline-none md:p-8"
          >
            {children}
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-window/10 to-transparent"
          />
        </div>
      ) : (
        <div className="relative z-10 flex min-h-0 flex-1 flex-col p-5 md:p-8">{children}</div>
      )}

      {footer ? (
        <div className="relative z-10 border-t border-brand-cyan/10 bg-window-header/60 px-5 py-3 md:px-10">
          {footer}
        </div>
      ) : null}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden motion-reduce:hidden"
      >
        <CrtSweep />
      </span>
    </section>
  );
}
