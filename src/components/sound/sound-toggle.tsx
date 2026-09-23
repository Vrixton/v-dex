"use client";

import { cn } from "@/lib/cn";

import { useSoundEnabled, useSoundToggle } from "./use-sound";

/**
 * Interruptor de efectos de sonido, con el aspecto de un conmutador físico.
 *
 * Es un botón con aria-pressed y no un checkbox: el estado es binario y así
 * los lectores de pantalla lo anuncian como "activado/desactivado". El icono
 * es decorativo; el nombre accesible lo da el texto oculto.
 *
 * Apagado por defecto: nadie debería recibir sonido sin pedirlo.
 */
export function SoundToggle({ className }: { className?: string }) {
  const isEnabled = useSoundEnabled();
  const toggle = useSoundToggle();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isEnabled}
      className={cn(
        "group pointer-events-auto flex cursor-pointer items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bezel-ink",
        className,
      )}
    >
      <span className="sr-only">Sound effects</span>
      <SpeakerIcon />

      {/* Carril */}
      <span
        aria-hidden="true"
        className="relative block h-7 w-11 rounded-full bg-[var(--vdex-silver-500)] shadow-[inset_0_2px_3px_rgb(0_0_0/0.35)]"
      >
        {/* Perilla: sobresale del carril, como en un conmutador real */}
        <span className="absolute top-1/2 left-0 size-6 -translate-y-1/2 rounded-full border-2 border-seam/20 bg-[var(--vdex-silver-200)] shadow-[0_1px_3px_rgb(0_0_0/0.4)] transition-[translate,background-color,box-shadow,filter] duration-200 ease-out group-hover:brightness-110 group-aria-pressed:translate-x-4 group-aria-pressed:border-white group-aria-pressed:bg-brand-cyan group-aria-pressed:text-brand-cyan group-aria-pressed:shadow-[0_0_10px_2px_currentColor]" />
      </span>
    </button>
  );
}

function SpeakerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 text-bezel-ink opacity-70 transition-opacity group-aria-pressed:opacity-100 md:size-5"
    >
      <path d="M11 5 6 9H3v6h3l5 4z" />
      {/* Ondas: solo se ven con el sonido activado */}
      <path
        d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"
        className="opacity-0 transition-opacity group-aria-pressed:opacity-100"
      />
    </svg>
  );
}
