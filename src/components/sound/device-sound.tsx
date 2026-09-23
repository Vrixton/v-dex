"use client";

import { useEffect, useRef } from "react";

import { useDevice } from "@/components/device/device-context";

import { useSound, useSoundBootstrap } from "./use-sound";

/**
 * Pone voz al movimiento de las láminas.
 *
 * Va en un componente aparte, y no dentro del dispositivo, para que la
 * máquina de estados no sepa nada de audio: aquí solo se observa la fase y
 * se reacciona. Si mañana quitamos el sonido, se borra este archivo y ya.
 *
 * También despierta el motor de audio al primer gesto de la sesión.
 *
 * No pinta nada: es solo un efecto.
 */
export function DeviceSound() {
  const { phase } = useDevice();
  const previousPhase = useRef(phase);
  const play = useSound();

  // Deja el motor listo en cuanto el usuario toque algo, si ya tenía el
  // sonido activado de una visita anterior.
  useSoundBootstrap();

  useEffect(() => {
    if (previousPhase.current === phase) return;
    previousPhase.current = phase;

    if (phase === "closing") play("shutterClose");
    if (phase === "opening") play("shutterOpen");
  }, [phase, play]);

  return null;
}
