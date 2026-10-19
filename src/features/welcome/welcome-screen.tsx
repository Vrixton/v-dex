"use client";

import { useEffect, useRef } from "react";

import { useBoot } from "@/components/device/boot-context";
import { useSound } from "@/components/sound/use-sound";
import { Window } from "@/components/window/window";
import { useMessages } from "@/i18n/locale-provider";

const DEFAULT_PET = "robot";

export function WelcomeScreen() {
  const { phase, completeBoot } = useBoot();
  const play = useSound();
  const m = useMessages().device.welcome;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isReady = phase === "welcome";

  useEffect(() => {
    if (!isReady) return;
    buttonRef.current?.focus();
  }, [isReady]);

  function handleContinue() {
    play("select");
    completeBoot(DEFAULT_PET);
  }

  return (
    <Window
      id="device-welcome"
      title={m.title}
      className="min-h-[70dvh]"
      footer={
        <div className="flex justify-end">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleContinue}
            className="rounded-control border border-brand-cyan/40 bg-surface-hover px-6 py-2 text-sm tracking-widest text-brand-cyan uppercase transition-colors hover:bg-brand-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            {m.continue}
          </button>
        </div>
      }
    >
      <div
        data-ready={isReady}
        className="flex flex-1 flex-col items-center justify-center gap-3 text-center opacity-0 transition-opacity delay-100 duration-300 data-[ready=true]:opacity-100"
      >
        <h1 className="text-3xl leading-tight text-brand-cyan md:text-4xl">{m.heading}</h1>
        <p className="text-base text-fg/70">{m.intro}</p>
      </div>
    </Window>
  );
}
