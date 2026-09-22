import { StatusLed } from "@/components/ui/status-led";

import { MenuToggle } from "./menu-toggle";
import { Screw } from "./screw";
import { Shutter } from "./shutter";
import { SpeakerGrill } from "./speaker-grill";

/**
 * Mitad superior del dispositivo. Son dos capas separadas a propósito:
 *
 * 1. El obturador (<Shutter>): un panel de 50dvh que, abierto, se desplaza
 *    hacia arriba y solo deja ver su borde inferior (la "barra"). Cerrado,
 *    baja hasta el centro.
 * 2. La decoración (tornillos, LED, título): fija en el borde de la pantalla.
 *    Así, en el estado cerrado sigue arriba, como en el diseño, en lugar de
 *    viajar con el panel.
 *
 * El botón central vive dentro del obturador para viajar con su borde.
 */
export function BezelTop() {
  return (
    <>
      <Shutter side="top">
        <MenuToggle />
      </Shutter>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-30 flex h-(--bezel-top-h) items-center justify-between px-4 pt-[env(safe-area-inset-top)] md:px-10"
      >
        <div className="flex items-center gap-4 md:gap-8">
          <Screw angle={35} />
          <StatusLed tone="green" pulse />
          <span className="text-lg tracking-[0.15em] text-white">V-DEX</span>
        </div>
        <div className="flex items-center gap-6 md:gap-24 lg:gap-40">
          <SpeakerGrill className="hidden md:flex" />
          <Screw angle={-40} />
        </div>
      </div>
    </>
  );
}
