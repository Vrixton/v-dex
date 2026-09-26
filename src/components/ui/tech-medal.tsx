"use client";

import { useSound } from "@/components/sound/use-sound";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { HexBadge } from "@/components/ui/hex-badge";
import { TechIcon, type TechIconName } from "@/components/ui/tech-icons";
import { TECHNOLOGIES, type MedalLevel } from "@/content/stack";

/*
 * Tinta del logo. Un único tono oscuro sirve para oro, plata y bronce: las
 * tres placas son claras, así que se lee como grabado en el metal. La
 * bloqueada tiene la placa oscura y necesita lo contrario.
 *
 * No cuesta recursos: los iconos heredan el color con currentColor, así que
 * son clases CSS sobre el mismo sprite, no imágenes distintas.
 */
const INK: Record<MedalLevel, string> = {
  gold: "text-screen/75",
  silver: "text-screen/70",
  bronze: "text-screen/75",
  locked: "text-white/35",
};

/** El nivel y el nombre salen del stack: una tecnología vale igual en toda la app. */
function techByIcon(icon: TechIconName) {
  return TECHNOLOGIES.find((tech) => tech.icon === icon);
}

type TechMedalProps = {
  icon: TechIconName;
  /** Nombre bajo la medalla en móvil, donde no hay hover. */
  showName?: boolean;
};

/**
 * Medalla de una tecnología, con su logo grabado y su etiqueta flotante.
 *
 * Vive aquí y no dentro de una vista porque la usan la home y las fichas de
 * proyecto: si cada una tuviera su copia, la etiqueta acabaría distinta en
 * cada sitio, que es justo lo que pasó antes de extraerla.
 *
 * El grupo lleva nombre (group/badge) a propósito: el contenedor de la
 * pantalla usa otro para sus animaciones de entrada, y sin nombrarlos, un
 * hover en cualquier parte encendería todas las etiquetas a la vez.
 */
export function TechMedal({ icon, showName = true }: TechMedalProps) {
  const play = useSound();
  const tech = techByIcon(icon);
  if (!tech) return null;

  return (
    /* z-index al pasar por encima: si no, la etiqueta queda por debajo de
       las medallas siguientes, que se pintan después. */
    <li className="relative flex flex-col items-center gap-1 focus-within:z-30 hover:z-30">
      <button
        type="button"
        onMouseEnter={() => play("badge")}
        onFocus={() => play("badge")}
        className="group/badge relative block cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow motion-safe:transition-transform motion-safe:hover:-translate-y-1"
      >
        <span className="sr-only">{`${tech.name}: ${tech.level}`}</span>
        <span className="relative block">
          <HexBadge level={tech.level} />
          {/* El logo va sobre la placa interior de la medalla */}
          <TechIcon
            name={tech.icon}
            className={`${INK[tech.level]} absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2`}
          />
        </span>

        {/*
          Etiqueta flotante, con el mismo lenguaje que los avisos del
          sistema: cristal tintado, borde y esquinas en corchete.

          Van dos capas a propósito. La de fuera centra y la de dentro
          anima: si la misma llevara el centrado y la animación, el
          translate de los keyframes pisaría al del centrado y la
          etiqueta aparecería a la izquierda antes de colocarse.
        */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[75%] left-1/2 hidden -translate-x-1/2 md:group-hover/badge:block md:group-focus-visible/badge:block"
        >
          <span className="relative flex items-center overflow-hidden rounded-control border border-current/40 bg-screen/80 px-3 py-1.5 text-xs whitespace-nowrap text-brand-cyan backdrop-blur-sm motion-safe:animate-toast-in md:text-sm">
            {/* Cristal tintado con el color del acento */}
            <span aria-hidden="true" className="absolute inset-0 bg-current opacity-30" />
            <BracketFrame size="sm" />
            <span className="relative flex items-center gap-2">
              <span>{">_"}</span>
              <span className="ml-1 text-fg">{"[TECH]:"}</span>
              <span>{tech.name}</span>
            </span>
          </span>
        </span>
      </button>

      {/*
        En móvil no hay ratón, así que el nombre se muestra siempre:
        depender del hover dejaría a la mitad de los visitantes sin
        saber qué tecnología es cada medalla.
      */}
      {showName ? (
        <span
          aria-hidden="true"
          className="max-w-20 text-center text-[10px] leading-tight text-fg-muted md:hidden"
        >
          {tech.name}
        </span>
      ) : null}
    </li>
  );
}
