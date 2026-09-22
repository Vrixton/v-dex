"use client";

import { useDevice } from "./device-context";

/**
 * Botón central del dispositivo. Cian con hamburguesa cuando el menú está
 * cerrado; rojo con X cuando está abierto.
 *
 * Accesibilidad: la etiqueta es fija ("Menu") y el estado lo comunica
 * aria-expanded. Cambiar ambos a la vez haría que el lector de pantalla
 * anunciara información redundante.
 */
export function MenuToggle() {
  const { isMenuOpen, toggleMenu } = useDevice();

  return (
    <button
      type="button"
      aria-label="Menu"
      aria-expanded={isMenuOpen}
      data-state={isMenuOpen ? "open" : "closed"}
      onClick={toggleMenu}
      className="group absolute bottom-0 left-1/2 size-(--menu-toggle-size) -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-seam p-[calc(var(--menu-toggle-size)*0.07)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
    >
      <span className="block size-full rounded-full bg-white p-[calc(var(--menu-toggle-size)*0.05)]">
        <span className="relative grid size-full place-items-center rounded-full bg-(image:--gradient-button-cyan) text-white group-hover:brightness-110 group-active:scale-95 group-data-[state=open]:bg-(image:--gradient-button-red) motion-safe:transition-[scale,filter] motion-safe:duration-150">
          {/* Reflejo del cristal */}
          <span className="absolute top-[8%] left-1/2 h-[22%] w-[45%] -translate-x-1/2 rounded-full bg-white/50" />
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </span>
      </span>
    </button>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="relative mt-[10%] size-[50%]"
    >
      <path d="M5 7h14M5 12h14M5 17h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="relative mt-[10%] size-[45%]"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
