"use client";

import { useDevice } from "./device-context";

/**
 * Botón central del dispositivo.
 *
 * Tres estados visuales: hamburguesa (menú cerrado), X (menú abierto) y
 * loader mientras el dispositivo está cerrado o en movimiento. El loader
 * convierte la animación en el propio indicador de carga: si la vista tarda,
 * el dispositivo se queda cerrado girando, en vez de abrirse a medias.
 *
 * El botón nunca se deshabilita, para no perder el foco del teclado a mitad
 * del ciclo. Las pulsaciones extra las descarta la máquina de estados.
 */
export function MenuToggle() {
  const { isMenuOpen, isBusy, toggleMenu } = useDevice();

  return (
    <button
      type="button"
      aria-label="Menu"
      aria-expanded={isMenuOpen}
      aria-busy={isBusy}
      data-state={isMenuOpen ? "open" : "closed"}
      onClick={toggleMenu}
      className="group absolute bottom-0 left-1/2 size-(--menu-toggle-size) -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-seam p-[calc(var(--menu-toggle-size)*0.07)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
    >
      <span className="block size-full rounded-full bg-white p-[calc(var(--menu-toggle-size)*0.05)]">
        <span className="relative grid size-full place-items-center rounded-full bg-(image:--gradient-button-cyan) text-white group-hover:brightness-110 group-active:scale-95 group-data-[state=open]:bg-(image:--gradient-button-red) motion-safe:transition-[scale,filter] motion-safe:duration-150">
          {/* Reflejo del cristal */}
          <span className="absolute top-[8%] left-1/2 h-[22%] w-[45%] -translate-x-1/2 rounded-full bg-white/50" />
          {isBusy ? <LoaderIcon /> : isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </span>
      </span>
    </button>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
} as const;

function MenuIcon() {
  return (
    <svg {...iconProps} className="relative mt-[10%] size-[50%]">
      <path d="M5 7h14M5 12h14M5 17h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg {...iconProps} className="relative mt-[10%] size-[45%]">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg
      {...iconProps}
      className="relative mt-[10%] size-[50%] animate-spin motion-reduce:[animation-duration:2.4s]"
    >
      <circle cx="12" cy="12" r="8" opacity="0.35" />
      <path d="M12 4a8 8 0 0 1 8 8" />
    </svg>
  );
}
