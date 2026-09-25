"use client";

import { useSound } from "@/components/sound/use-sound";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { HexBadge } from "@/components/ui/hex-badge";
import { Badge } from "@/components/ui/badge";
import { TechIcon, TechIconSprite } from "@/components/ui/tech-icons";
import { CONQUERED, TECHNOLOGIES, type MedalLevel } from "@/content/stack";

/**
 * Medallas de gimnasio: el stack.
 *
 * El nombre aparece flotando sobre la medalla al pasar el ratón y también
 * al llegar con el teclado, porque cada medalla es un botón enfocable. La
 * etiqueta flotante es decorativa: el nombre y el nivel van además en un
 * texto oculto, que es lo que anuncia el lector de pantalla.
 *
 * El grupo lleva nombre (group/badge) a propósito: el contenedor de la
 * pantalla usa otro para sus animaciones de entrada, y sin nombrarlos, un
 * hover en cualquier parte encendería las catorce etiquetas a la vez.
 */
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

export function GymBadges() {
  const play = useSound();

  return (
    <section className="flex flex-col gap-4 rounded-panel bg-surface p-4 md:p-5">
      <TechIconSprite />
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm text-fg md:text-base">GYM_BADGES || TECH_STACK</h3>
        <Badge tone="yellow">
          {`${String(CONQUERED).padStart(2, "0")}/${TECHNOLOGIES.length} CONQUERED`}
        </Badge>
      </header>

      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 md:gap-3">
        {TECHNOLOGIES.map((tech) => (
          /* z-index al pasar por encima: si no, la etiqueta queda por debajo
             de las medallas siguientes, que se pintan después. */
          <li
            key={tech.name}
            className="relative flex flex-col items-center gap-1 focus-within:z-30 hover:z-30"
          >
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
            <span
              aria-hidden="true"
              className="max-w-20 text-center text-[10px] leading-tight text-fg-muted md:hidden"
            >
              {tech.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
