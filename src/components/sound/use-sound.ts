"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

import { audioEngine } from "@/lib/audio/audio-engine";
import {
  getServerSoundPreference,
  getSoundPreference,
  setSoundPreference,
  subscribeToSoundPreference,
} from "@/lib/audio/sound-preference";
import type { SoundName } from "@/lib/audio/sound-catalog";

export function useSoundEnabled(): boolean {
  return useSyncExternalStore(
    subscribeToSoundPreference,
    getSoundPreference,
    getServerSoundPreference,
  );
}

export function useSound(): (name: SoundName) => void {
  const isEnabled = useSoundEnabled();

  return useCallback(
    (name: SoundName) => {
      if (!isEnabled) return;
      if (name === "hover" && !window.matchMedia("(hover: hover)").matches) return;
      if (!audioEngine.isRunning()) {
        void audioEngine.start().then(() => audioEngine.play(name));
        return;
      }

      audioEngine.play(name);
    },
    [isEnabled],
  );
}

export function useSoundBootstrap(): void {
  const isEnabled = useSoundEnabled();

  useEffect(() => {
    if (!isEnabled || audioEngine.isRunning()) return;

    const wake = () => {
      void audioEngine.start();
    };

    const events = ["pointerdown", "keydown", "touchstart"] as const;
    for (const event of events) {
      window.addEventListener(event, wake, { once: true, passive: true });
    }

    return () => {
      for (const event of events) window.removeEventListener(event, wake);
    };
  }, [isEnabled]);
}

export function useSoundToggle(): () => void {
  const isEnabled = useSoundEnabled();

  return useCallback(() => {
    const next = !isEnabled;
    setSoundPreference(next);

    if (!next) return;
    void audioEngine.start().then(() => audioEngine.play("power"));
  }, [isEnabled]);
}
