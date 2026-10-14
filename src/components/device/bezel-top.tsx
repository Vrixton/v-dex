import { StatusLed } from "@/components/ui/status-led";

import { MenuToggle } from "./menu-toggle";
import { Screw } from "./screw";
import { Shutter } from "./shutter";
import { SpeakerGrill } from "./speaker-grill";

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
          <StatusLed tone="green" pulse className="text-(color:--vdex-green-200)" />
          <span className="text-lg text-white">V-DEX</span>
        </div>
        <div className="flex items-center gap-6 md:gap-24 lg:gap-40">
          <SpeakerGrill className="hidden md:flex" />
          <Screw angle={-40} />
        </div>
      </div>
    </>
  );
}
