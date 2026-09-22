import { APP_VERSION } from "@/lib/app-info";

import { Screw } from "./screw";
import { SpeakerGrill } from "./speaker-grill";
import type { ShutterState } from "./types";

type BezelBottomProps = {
  state?: ShutterState;
};

/**
 * Mitad inferior del dispositivo. Misma técnica de dos capas que BezelTop.
 * Su obturador va en z-10, por debajo del superior (z-20), para que el botón
 * central quede por encima cuando ambos se encuentran en el centro.
 */
export function BezelBottom({ state = "open" }: BezelBottomProps) {
  return (
    <>
      <div
        aria-hidden="true"
        data-state={state}
        className="fixed inset-x-0 bottom-0 z-10 h-[50dvh] translate-y-[calc(50dvh-var(--bezel-bottom-h))] border-t-(length:--seam-w) border-seam bg-(image:--gradient-bezel-bottom) data-[state=closed]:translate-y-0"
      />

      <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex h-(--bezel-bottom-h) items-center justify-between px-4 pb-[env(safe-area-inset-bottom)] md:px-10">
        <Screw angle={-10} />
        <SpeakerGrill className="hidden md:flex" />
        <p className="text-sm tracking-[0.2em] text-bezel-ink md:text-base">V-DEX V{APP_VERSION}</p>
        <SpeakerGrill className="hidden md:flex" />
        <Screw angle={50} />
      </footer>
    </>
  );
}
