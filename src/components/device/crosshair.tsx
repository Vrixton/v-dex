"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Suavizado del seguimiento: cuanto más bajo, más inercia. */
const FOLLOW = 0.22;
/** Por debajo de este margen ya no se aprecia movimiento y el bucle para. */
const SETTLED = 0.4;

/**
 * Retículo de enfoque que sigue al cursor dentro de la pantalla.
 *
 * No reemplaza al cursor del sistema, lo acompaña: cambiarlo por una imagen
 * desalinea el punto de clic y se ve borroso en pantallas de alta densidad.
 * Así se gana el detalle del HUD sin perder precisión.
 *
 * Vive solo dentro del área de pantalla, nunca sobre los biseles: esos son
 * hardware, y el retículo es software.
 *
 * Se dibuja moviendo transform y el bucle se detiene en cuanto alcanza al
 * cursor, así que quieto no consume nada. En táctil no se monta.
 */
export function Crosshair({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const frame = frameRef.current;
    if (!container || !frame) return;
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    function draw() {
      current.x += (target.x - current.x) * FOLLOW;
      current.y += (target.y - current.y) * FOLLOW;
      frame!.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      const settled =
        Math.abs(target.x - current.x) < SETTLED && Math.abs(target.y - current.y) < SETTLED;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(draw);
    }

    function request() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    }

    function handleMove(event: PointerEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
      frame!.dataset.visible = "true";
      // Sobre algo interactivo el retículo se cierra: deja de ser adorno y
      // pasa a decir "esto se puede usar".
      frame!.dataset.locked = String(
        Boolean((event.target as HTMLElement | null)?.closest("a, button, [role='button']")),
      );
      request();
    }

    function handleLeave() {
      frame!.dataset.visible = "false";
    }

    container.addEventListener("pointermove", handleMove, { passive: true });
    container.addEventListener("pointerleave", handleLeave);

    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, [containerRef, prefersReducedMotion]);

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      data-visible="false"
      className="pointer-events-none fixed top-0 left-0 z-[5] hidden opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100 md:block"
    >
      {/* Cuatro esquinas alrededor del cursor; se cierran sobre lo interactivo */}
      <div className="relative size-9 -translate-x-1/2 -translate-y-1/2 text-brand-cyan transition-transform duration-150 [&[data-locked]]:scale-90">
        <span className="absolute top-0 left-0 size-2 border-t border-l border-current" />
        <span className="absolute top-0 right-0 size-2 border-t border-r border-current" />
        <span className="absolute bottom-0 left-0 size-2 border-b border-l border-current" />
        <span className="absolute right-0 bottom-0 size-2 border-r border-b border-current" />
      </div>
    </div>
  );
}
