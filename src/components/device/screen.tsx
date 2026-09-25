"use client";

import { useRef, type ReactNode } from "react";

import { MenuScreen } from "@/features/menu/menu-screen";
import { useHasMounted } from "@/hooks/use-has-mounted";

import { Crosshair } from "./crosshair";
import { useDevice } from "./device-context";

/**
 * Zona de contenido del dispositivo.
 *
 * Dos responsabilidades:
 *
 * 1. Decide qué se ve: el menú o la vista de la ruta actual. El cambio ocurre
 *    con las láminas cerradas, así que nunca se ve el salto.
 * 2. Anima la entrada de la ventana: crece desde el centro con opacidad,
 *    como una app al abrirse. Solo se animan scale y opacity.
 *
 * Mientras el dispositivo no está abierto, el contenido queda `inert`: no se
 * puede tabular ni clicar algo que está tapado, y los lectores de pantalla lo
 * ignoran. El botón central vive fuera, así que sigue accesible.
 */
export function Screen({ children }: { children: ReactNode }) {
  const { isContentVisible, isMenuOpen } = useDevice();
  // En la primera carga no hay ciclo de apertura, así que la animación la
  // dispara la hidratación.
  const hasMounted = useHasMounted();
  const screenRef = useRef<HTMLElement>(null);

  const isReady = hasMounted && isContentVisible;

  return (
    <main
      ref={screenRef}
      id="screen"
      inert={!isContentVisible}
      className="min-h-dvh px-4 pt-(--screen-inset-top) pb-(--screen-inset-bottom) md:px-8"
    >
      <div
        data-ready={isReady}
        className="group/screen mx-auto max-w-6xl scale-[0.92] opacity-0 transition-[scale,opacity] duration-(--window-duration) ease-out-window data-[ready=true]:scale-100 data-[ready=true]:opacity-100 motion-reduce:scale-100 motion-reduce:transition-opacity"
      >
        {isMenuOpen ? <MenuScreen /> : children}
      </div>

      {/* El retículo solo existe dentro de la pantalla: los biseles son
          hardware y no deben reaccionar al cursor. */}
      <Crosshair containerRef={screenRef} />
    </main>
  );
}
