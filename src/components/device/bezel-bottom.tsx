import { APP_VERSION } from "@/lib/app-info";

import { Screw } from "./screw";
import { Shutter } from "./shutter";
import { SpeakerGrill } from "./speaker-grill";
import { SoundToggle } from "@/components/sound/sound-toggle";

/** Mitad inferior del dispositivo. Misma técnica de dos capas que BezelTop. */
export function BezelBottom() {
  return (
    <>
      <Shutter side="bottom" />

      <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex h-(--bezel-bottom-h) items-center justify-between px-4 pb-[env(safe-area-inset-bottom)] md:px-10">
        <Screw angle={-10} />
        <SpeakerGrill className="hidden md:flex" />
        <SoundToggle />
        <p className="text-sm tracking-[0.2em] text-bezel-ink md:text-lg">V-DEX V{APP_VERSION}</p>
        <span></span>
        <SpeakerGrill className="hidden md:flex" />
        <Screw angle={50} />
      </footer>
    </>
  );
}
