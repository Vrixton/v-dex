"use client";

import { useEffect, useRef, useState } from "react";

import { useBoot } from "@/components/device/boot-context";
import { DEFAULT_PET } from "@/components/device/pets";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { Button } from "@/components/ui/button";
import { Window } from "@/components/window/window";
import { useMessages } from "@/i18n/locale-provider";

import { PetChooser } from "./pet-chooser";

export function WelcomeScreen() {
  const { phase, completeBoot } = useBoot();
  const m = useMessages().device.welcome;
  const [selectedId, setSelectedId] = useState(DEFAULT_PET.id);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isReady = phase === "welcome";

  useEffect(() => {
    if (!isReady) return;
    buttonRef.current?.focus();
  }, [isReady]);

  return (
    <Window id="device-welcome" fill>
      <div className="relative flex min-h-0 flex-1 flex-col border border-brand-cyan/20 bg-brand-cyan/5">
        <BracketFrame className="inset-0 text-brand-cyan" />
        <div className="flex min-h-0 hud-scrollbar flex-1 overflow-y-auto overscroll-contain">
          <div
            data-ready={isReady}
            className="m-auto flex flex-col items-center gap-5 px-10 py-5 text-center opacity-0 transition-opacity delay-100 duration-300 data-[ready=true]:opacity-100"
          >
            <div className="flex flex-col gap-1">
              <p className="text-base text-sm">{m.eyebrow}</p>
              <h1 className="text-4xl tracking-[0.15em] text-brand-cyan uppercase">{m.heading}</h1>
            </div>

            <div className="flex flex-col items-center gap-8">
              <p className="text-base text-xs">{m.intro}</p>
              <PetChooser selectedId={selectedId} onSelect={setSelectedId} />
              <p className="mt-2 max-w-2xl text-xs text-fg/50">{m.hint}</p>
            </div>

            <Button ref={buttonRef} size="lg" onClick={() => completeBoot(selectedId)}>
              {m.continue}
            </Button>
          </div>
        </div>
      </div>
    </Window>
  );
}
