import type { ReactNode } from "react";

import type { LedTone } from "@/components/ui/status-led";
import { cn } from "@/lib/cn";

import { WindowHeader } from "./window-header";

// Con exactOptionalPropertyTypes, "?: string" no admite undefined explícito.
// Como estas props viajan de un componente a otro, se declara "| undefined".
type WindowProps = {
  id?: string | undefined;
  title: string;
  breadcrumb?: string | undefined;
  ledTone?: LedTone | undefined;
  ledPulse?: boolean | undefined;
  /** Contenido de la derecha de la cabecera: badges, contadores… */
  actions?: ReactNode | undefined;
  /** La ventana ocupa todo el alto disponible de la pantalla. */
  fill?: boolean | undefined;
  /** El cuerpo hace scroll y la cabecera se queda fija, como un programa. */
  scrollable?: boolean | undefined;
  children: ReactNode;
  className?: string | undefined;
};

/**
 * Pantalla del dispositivo: el marco que envuelve cada vista.
 *
 * El cuerpo es translúcido a propósito, para que el fondo del dispositivo se
 * transparente por detrás. El efecto CRT vive solo en ese fondo; aquí lo que
 * hay es el glow cian del borde y el barrido de refresco.
 */
export function Window({
  id,
  title,
  breadcrumb,
  ledTone = "cyan",
  ledPulse = true,
  actions,
  fill = false,
  scrollable = false,
  children,
  className,
}: WindowProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate flex flex-col overflow-hidden rounded-window border border-white/10 bg-window inset-shadow-window",
        // Alto exacto, no mínimo: si fuera mínimo el contenido la estiraría
        // y el scroll acabaría en la página en vez de dentro de la ventana.
        fill && "h-[calc(97dvh-var(--screen-inset-top)-var(--screen-inset-bottom))]",
        className,
      )}
    >
      <WindowHeader
        title={title}
        breadcrumb={breadcrumb}
        ledTone={ledTone}
        ledPulse={ledPulse}
        actions={actions}
      />

      {scrollable ? (
        /*
          Cuerpo con scroll propio. La cabecera queda fija arriba, como el
          título de una ventana, y solo se mueve el contenido.

          tabIndex lo hace alcanzable con teclado: sin eso, quien no usa
          ratón no podría recorrer el contenido que queda fuera de vista.
        */
        <div className="relative z-10 min-h-0 flex-1">
          <div
            tabIndex={0}
            role="region"
            aria-label={`${title} content`}
            className="h-full hud-scrollbar overflow-y-auto overscroll-contain p-5 focus-visible:outline-none md:p-8"
          >
            {children}
          </div>
          {/* Desvanecido: avisa de que el contenido continúa */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-window to-transparent"
          />
        </div>
      ) : (
        <div className="relative z-10 flex flex-1 flex-col p-5 md:p-8">{children}</div>
      )}

      {/*
        Barrido de refresco del tubo.

        Son tres capas por un motivo concreto: los porcentajes de translate se
        calculan sobre la altura del PROPIO elemento, así que una línea de 1px
        solo recorrería 1px. El carril mide lo mismo que la ventana, se
        desplaza él, y la línea viaja dentro. Solo se anima transform, que va
        en el compositor y no repinta el contenido.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden motion-reduce:hidden"
      >
        <span className="absolute inset-0 motion-safe:animate-crt-sweep">
          {/* Halo suave */}
          <span className="absolute inset-x-0 top-0 h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-sweep to-transparent opacity-10" />
          {/* Línea del haz */}
          <span className="absolute inset-x-0 top-0 h-px bg-brand-cyan/4 shadow-glow-md" />
        </span>
      </span>
    </section>
  );
}
