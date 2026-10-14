import type { ReactNode } from "react";

import type { Locale } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";
import { highlight } from "@/lib/rich-text";
import { cn } from "@/lib/cn";

export function Terminal({
  program,
  status,
  locale,
  children,
  className,
}: {
  program: string;
  status?: string | undefined;
  locale: Locale;
  children: ReactNode;
  className?: string | undefined;
}) {
  const m = getMessages(locale).device.terminal;

  return (
    <section className={cn("flex flex-col gap-3 rounded-panel bg-terminal p-4 md:p-6", className)}>
      <header className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm text-status-ok">
          <span aria-hidden="true">{">_ "}</span>
          {`${program}.EXE`}
        </h2>
        <p className="text-xs text-fg-muted">{`[${m.statusLabel}]: ${status ?? m.statusActive}`}</p>
      </header>

      <div className="mt-5 flex flex-col gap-2 text-sm leading-relaxed text-fg">{children}</div>
    </section>
  );
}

export function TerminalLine({ children, cursor = false }: { children: string; cursor?: boolean }) {
  return (
    <li className="flex gap-2.5">
      <span aria-hidden="true" className="shrink-0 text-status-ok">
        {">"}
      </span>
      <span>
        {highlight(children)}
        {cursor ? <TerminalCursor /> : null}
      </span>
    </li>
  );
}

export function TerminalCursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-2 inline-block h-[1em] w-[0.5em] bg-status-ok motion-safe:animate-cursor-blink"
    />
  );
}
