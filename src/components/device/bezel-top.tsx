import { StatusLed } from "@/components/ui/status-led";

import { MenuToggle } from "./menu-toggle";
import { Screw } from "./screw";
import { SpeakerGrill } from "./speaker-grill";
import type { ShutterState } from "./types";

type BezelTopProps = {
  state?: ShutterState;
};

/**
 * Mitad superior del dispositivo. Son dos capas separadas a propósito:
 *
 * 1. El obturador: un panel de 50dvh que, abierto, se desplaza hacia arriba
 *    con transform y solo deja ver su borde inferior (la "barra"). Cerrado,
 *    baja hasta el centro. Solo se anima transform, que corre en la GPU.
 * 2. La decoración (tornillos, LED, título): fija en el borde de la pantalla.
 *    Así, en el estado cerrado sigue arriba, como en el diseño, en lugar de
 *    viajar con el panel.
 *
 * El botón central vive dentro del obturador para viajar con su borde.
 */
export function BezelTop({ state = "open" }: BezelTopProps) {
  return (
    <>
      <div
        data-state={state}
        className="fixed inset-x-0 top-0 z-20 h-[50dvh] translate-y-[calc(var(--bezel-top-h)-50dvh)] border-b-(length:--seam-w) border-seam bg-(image:--gradient-bezel-top) data-[state=closed]:translate-y-0"
      >
        <MenuToggle />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-30 flex h-(--bezel-top-h) items-center justify-between px-4 pt-[env(safe-area-inset-top)] md:px-10"
      >
        <div className="flex items-center gap-4 md:gap-8">
          <Screw angle={35} />
          <StatusLed tone="green" pulse />
          <span className="text-lg tracking-[0.15em] text-white md:text-lg">V-DEX</span>
        </div>
        <div className="flex items-center gap-6 md:gap-24 lg:gap-40">
          <SpeakerGrill className="hidden md:flex" />
          <Screw angle={-40} />
        </div>
      </div>
    </>
  );
}
