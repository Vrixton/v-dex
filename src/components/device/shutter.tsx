"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { useDevice } from "./device-context";

type ShutterProps = {
  side: "top" | "bottom";
  children?: ReactNode;
};

const sideClass: Record<ShutterProps["side"], string> = {
  top: "top-0 z-20 translate-y-[calc(var(--bezel-top-h)-50dvh)] border-b-(length:--seam-w) bg-(image:--gradient-bezel-top) shadow-bezel-top",
  // z-10: por debajo del panel superior, para que el botón central quede
  // encima cuando ambos se encuentran en el centro.
  bottom:
    "bottom-0 z-10 translate-y-[calc(50dvh-var(--bezel-bottom-h))] border-t-(length:--seam-w) bg-(image:--gradient-bezel-bottom) shadow-bezel-bottom",
};

/**
 * Una de las dos láminas del dispositivo.
 *
 * Solo se anima transform, que el navegador resuelve en la GPU sin recalcular
 * el layout. La duración viene de --shutter-duration, que el provider escribe
 * a partir de SHUTTER_MS: así el CSS y la máquina de estados no pueden
 * desincronizarse, y con prefers-reduced-motion ambos pasan a 0.
 */
export function Shutter({ side, children }: ShutterProps) {
  const { shutterPosition } = useDevice();

  return (
    <div
      data-state={shutterPosition}
      className={cn(
        "fixed inset-x-0 h-[50dvh] border-seam transition-transform duration-(--shutter-duration) ease-press data-[state=closed]:translate-y-0",
        sideClass[side],
      )}
      {...(side === "bottom" ? { "aria-hidden": true } : {})}
    >
      {children}
    </div>
  );
}
