"use client";

import type { ReactNode } from "react";

import { useDevice } from "./device-context";

/**
 * Zona de contenido del dispositivo.
 *
 * Mientras las láminas están cerradas o en movimiento, el contenido queda
 * `inert`: no se puede tabular ni clicar algo que está tapado, y los lectores
 * de pantalla lo ignoran. El botón central vive fuera de aquí, así que sigue
 * siendo accesible durante todo el ciclo.
 */
export function Screen({ children }: { children: ReactNode }) {
  const { isBusy } = useDevice();

  return (
    <main
      id="screen"
      inert={isBusy}
      className="min-h-dvh px-4 pt-(--screen-inset-top) pb-(--screen-inset-bottom) md:px-8"
    >
      {children}
    </main>
  );
}
