"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { createCrtRenderer } from "@/lib/webgl/crt-renderer";
import { readTokenColor } from "@/lib/webgl/read-token-color";

/**
 * Fondo de tubo CRT.
 *
 * Ocupa toda la pantalla, detrás de todo, y solo él lleva el efecto: las
 * ventanas, el menú y los avisos flotan encima y se quedan nítidos.
 *
 * Es una mejora progresiva. Si WebGL no está disponible, el canvas no pinta
 * nada y queda a la vista el fondo CSS del body, que es el mismo color con
 * sus líneas. La página nunca depende de esto para funcionar.
 *
 * Se pinta bajo demanda: un fotograma al cargar y luego solo mientras el
 * cursor lo deforma. Quieto no consume nada.
 *
 * Con prefers-reduced-motion queda estático, igual que en táctil: sin
 * puntero fino no hay imán al que reaccionar.
 */
/** Cuánto se oscurecen las líneas respecto al fondo. */
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
      // Las líneas son el mismo color, más apagado: así el patrón se lee
      // como sombra del tubo y no como otro color encima.
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
      {/*
        Parpadeo del tubo. La capa es negra porque un CRT parpadea
        oscureciendo: sobre un fondo tan claro, una capa blanca no se vería.

        Va en CSS y no en el shader a propósito: animar opacity lo resuelve
        el compositor en la GPU, sin tocar el hilo principal y sin obligar
        al shader a repintarse. El navegador la pausa al cambiar de pestaña.
      */}
      <div
        aria-hidden="true"
        className="motion-safe:animate-crt-flicker pointer-events-none fixed inset-0 -z-10 bg-black opacity-0"
      />
    </>
  );
}
