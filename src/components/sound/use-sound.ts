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

/** true si el usuario activó el sonido. */
export function useSoundEnabled(): boolean {
  return useSyncExternalStore(
    subscribeToSoundPreference,
    getSoundPreference,
    getServerSoundPreference,
  );
}

/**
 * Devuelve una función para reproducir sonidos. Los componentes solo piden
 * play("click") y no saben nada de Web Audio.
 *
 * El sonido de hover se descarta en dispositivos táctiles: ahí el evento se
 * dispara al tocar, y sonaría a destiempo.
 */
export function useSound(): (name: SoundName) => void {
  const isEnabled = useSoundEnabled();

  return useCallback(
    (name: SoundName) => {
      if (!isEnabled) return;
      if (name === "hover" && !window.matchMedia("(hover: hover)").matches) return;

      // Al volver con el sonido ya activado, el contexto aún no existe: los
      // navegadores lo bloquean hasta que hay un gesto. Si esta llamada viene
      // de uno (un clic), arranca el motor y suena igualmente.
      if (!audioEngine.isRunning()) {
        void audioEngine.start().then(() => audioEngine.play(name));
        return;
      }

      audioEngine.play(name);
    },
    [isEnabled],
  );
}

/**
 * Despierta el motor en el primer gesto del usuario cuando la preferencia
 * ya venía activada de una visita anterior. Sin esto, el primer sonido de la
 * sesión se perdería mientras el contexto arranca.
 */
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

/** Activa o desactiva el sonido. Al activarlo suena una muestra de volumen. */
export function useSoundToggle(): () => void {
  const isEnabled = useSoundEnabled();

  return useCallback(() => {
    const next = !isEnabled;
    setSoundPreference(next);

    if (!next) return;
    // El AudioContext solo puede crearse desde un gesto del usuario,
    // y este clic lo es.
    void audioEngine.start().then(() => audioEngine.play("power"));
  }, [isEnabled]);
}
