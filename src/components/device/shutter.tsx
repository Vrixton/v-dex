"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useDevice } from "./device-context";
import { useBoot } from "./boot-context";

type ShutterProps = {
  side: "top" | "bottom";
  children?: ReactNode;
};

const sideClass: Record<ShutterProps["side"], string> = {
  top: "top-0 z-20 translate-y-[calc(var(--bezel-top-h)-50dvh)] border-b-(length:--seam-w) bg-(image:--gradient-bezel-top) shadow-bezel-top",
  bottom:
    "bottom-0 z-10 translate-y-[calc(50dvh-var(--bezel-bottom-h))] border-t-(length:--seam-w) bg-(image:--gradient-bezel-bottom) shadow-bezel-bottom",
};

export function Shutter({ side, children }: ShutterProps) {
  const { shutterPosition } = useDevice();
  const { isBooting } = useBoot();
  const { phase } = useBoot();
  return (
    <div
      data-shutter=""
      data-state={phase === "closed" ? "closed" : shutterPosition}
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
