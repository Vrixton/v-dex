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
  actions?: ReactNode | undefined;
  children: ReactNode;
  className?: string | undefined;
};

/**
 * Pantalla del dispositivo: el marco oscuro con cabecera que envuelve cada
 * vista. Las scanlines van por encima del contenido, como el cristal de un
 * tubo CRT, y son puramente decorativas.
 */
export function Window({
  id,
  title,
  breadcrumb,
  ledTone = "cyan",
  actions,
  children,
  className,
}: WindowProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden rounded-window bg-screen inset-shadow-screen",
        className,
      )}
    >
      <WindowHeader title={title} breadcrumb={breadcrumb} ledTone={ledTone} actions={actions} />
      <div className="relative z-10 p-5 md:p-8">{children}</div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 screen-lines" />
    </section>
  );
}
