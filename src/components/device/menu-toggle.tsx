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
 * Dos detalles de tacto:
 *
 * - El color no salta. Los degradados de fondo no se pueden interpolar, así
 *   que rojo y ámbar van en capas encima del cian y se funden con opacidad,
 *   como un LED que cambia de color. El ámbar solo aparece si la espera se
 *   alarga (SLOW_MS), así que comunica algo real.
 * - Al pulsar no hay rebote: la tecla se hunde. El canto inferior sólido se
 *   reduce y la sombra se acerca, que es lo que hace un botón real.
 *
 * El botón nunca se deshabilita, para no perder el foco del teclado a mitad
 * del ciclo. Las pulsaciones extra las descarta la máquina de estados.
 */
export function MenuToggle() {
  const { isMenuOpen, isBusy, isLoading, tone, toggleMenu } = useDevice();

  return (
    <button
      id="menu-toggle"
      type="button"
      aria-label="Menu"
      aria-expanded={isMenuOpen}
      aria-busy={isBusy}
      {...(isMenuOpen ? { "aria-controls": "device-menu" } : {})}
      data-state={isMenuOpen ? "open" : "closed"}
      data-tone={tone}
      onClick={toggleMenu}
      className="group absolute bottom-0 left-1/2 size-(--menu-toggle-size) -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
    >
      {/* Cuerpo de la tecla: es lo que se hunde al pulsar */}
      <span className="block size-full rounded-full bg-seam p-[calc(var(--menu-toggle-size)*0.06)] shadow-key transition-[box-shadow,translate] duration-100 ease-out group-active:translate-y-[2px] group-active:shadow-key-pressed">
        <span className="block size-full rounded-full bg-white p-[calc(var(--menu-toggle-size)*0.04)]">
          <span className="relative grid size-full place-items-center overflow-hidden rounded-full bg-(image:--gradient-button-cyan) text-white group-hover:brightness-115 motion-safe:transition-[filter] motion-safe:duration-800">
            {/* Capas de color apiladas sobre la cian; se funden con opacidad */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-(image:--gradient-button-red) opacity-0 transition-opacity duration-300 ease-in-out group-data-[tone=red]:opacity-100 motion-reduce:transition-none"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-(image:--gradient-button-amber) opacity-0 transition-opacity duration-300 ease-in-out group-data-[tone=amber]:opacity-100 motion-reduce:transition-none"
            />
            {/* Reflejo del cristal */}
            <span className="absolute top-[8%] left-1/2 h-[22%] w-[45%] -translate-x-1/2 rounded-full bg-white/50" />
            {isLoading ? <LoaderIcon /> : isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </span>
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
    <svg {...iconProps} className="relative mt-[6%] size-[50%]">
      <path d="M5 7h14M5 12h14M5 17h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg {...iconProps} className="relative mt-[6%] size-[45%]">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg
      {...iconProps}
      className="relative mt-[6%] size-[50%] animate-spin motion-reduce:[animation-duration:2.4s]"
    >
      <circle cx="12" cy="12" r="8" opacity="0.35" />
      <path d="M12 4a8 8 0 0 1 8 8" />
    </svg>
  );
}
