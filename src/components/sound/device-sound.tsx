"use client";

import { useEffect, useRef } from "react";

import { useDevice } from "@/components/device/device-context";

import { useSound, useSoundBootstrap } from "./use-sound";

export function DeviceSound() {
  const { phase } = useDevice();
  const previousPhase = useRef(phase);
  const play = useSound();

  useSoundBootstrap();

  useEffect(() => {
    if (previousPhase.current === phase) return;
    previousPhase.current = phase;

    if (phase === "closing") play("shutterClose");
    if (phase === "opening") play("shutterOpen");
  }, [phase, play]);

  return null;
}
