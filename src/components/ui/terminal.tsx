import type { ReactNode } from "react";

import { highlight } from "@/lib/rich-text";
import { cn } from "@/lib/cn";

/**
 * Salida de consola del dispositivo.
 *
 * Un solo componente para todos los bloques que simulan una terminal: el
 * programa siempre termina en .EXE, el estado va a la derecha y el cursor
 * queda al final de la última línea. Centralizarlo evita que cada vista
 * invente su versión y que la estética se descuadre.
 */
export function Terminal({
  program,
  status = "ACTIVE",
  children,
  className,
}: {
  /** Nombre del programa, sin la extensión: se añade sola. */
  program: string;
  status?: string;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <section className={cn("flex flex-col gap-3 rounded-panel bg-terminal p-4 md:p-6", className)}>
      <header className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm text-status-ok">
          <span aria-hidden="true">{">_ "}</span>
          {`${program}.EXE`}
        </h2>
        <p className="text-xs text-fg-muted">{`[STATUS]: ${status}`}</p>
      </header>

      {/* Separación entre la cabecera y la salida, como en una terminal real */}
      <div className="mt-5 flex flex-col gap-2 text-sm leading-relaxed text-fg">{children}</div>
    </section>
  );
}

/**
 * Línea de salida. El marcador ">" es el del propio programa escribiendo,
 * no una viñeta decorativa.
 */
export function TerminalLine({
  children,
  cursor = false,
}: {
  children: string;
  /** Deja el cursor parpadeando al final: se usa en la última línea. */
  cursor?: boolean;
}) {
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

/** El cursor esperando: la consola sigue viva. */
export function TerminalCursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-2 inline-block h-[1em] w-[0.5em] bg-status-ok motion-safe:animate-cursor-blink"
    />
  );
}
