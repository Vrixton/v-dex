"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { createCrtRenderer } from "@/lib/webgl/crt-renderer";
import { readTokenColor } from "@/lib/webgl/read-token-color";

const LINE_DARKNESS = 0.93;

export function CrtBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const base = readTokenColor("--vdex-cyan-100", [0.72, 0.96, 0.97]);

    const renderer = createCrtRenderer(canvas, {
      interactive: hasPointer && !prefersReducedMotion,
      base,
      line: base.map((channel) => channel * LINE_DARKNESS) as [number, number, number],
    });

    return () => renderer?.destroy();
  }, [prefersReducedMotion]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 size-full"
      />
      <div
        aria-hidden="true"
        className="motion-safe:animate-crt-flicker pointer-events-none fixed inset-0 -z-10 bg-black opacity-0"
      />
    </>
  );
}
