"use client";

import { createPortal } from "react-dom";
import { useBoot } from "./boot-context";

export const POWER_ON_MS = 940;

export function PowerOn() {
  const { phase } = useBoot();

  if (phase !== "powering" || typeof document === "undefined") return null;

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[8] grid place-items-center overflow-hidden"
    >
      <span className="absolute inset-0 bg-screen-off motion-safe:animate-crt-lightup">
        <span className="absolute inset-0 bg-(image:--gradient-crt-mask)" />
      </span>

      <span className="relative size-full origin-center bg-white shadow-[0_0_90px_30px_var(--color-brand-cyan)] motion-safe:animate-crt-expand motion-reduce:hidden" />
    </div>,
    document.body,
  );
}
