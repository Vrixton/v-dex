"use client";

import Link from "next/link";

import { useSound } from "@/components/sound/use-sound";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { ProjectLogo } from "@/components/ui/project-logo";
import type { Project } from "@/content/projects";

import { ProjectTypeTag } from "./project-type";

/**
 * Registro del catálogo.
 *
 * La tarjeta entera es un enlace: el objetivo táctil es grande y con teclado
 * se recorre en un solo tabulador por proyecto.
 *
 * Capas, de abajo arriba: la tarjeta con el azul al 20%, la banda inferior
 * con el mismo azul al 50%, el número como decoración sobre la banda y, por
 * encima, el nombre. El logo cae en medio y se monta sobre la banda.
 *
 * El resumen aparece dentro de la propia tarjeta al señalarla, no en una
 * barra aparte: la información surge donde está el cursor y la tarjeta
 * activa muestra más que las demás, que es lo que da vida a la rejilla.
 */
export function ProjectCard({ project }: { project: Project }) {
  const play = useSound();
  const number = `#${String(project.number).padStart(3, "0")}`;

  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        className="group/card relative block p-3 focus-visible:outline-none"
      >
        {/*
          inset-3 coincide con el padding: en reposo las esquinas están sobre
          el borde del marco. Al activarse pasan a inset-0 y se despliegan.
        */}
        <BracketFrame className="inset-3 text-brand-cyan opacity-0 transition-all duration-200 group-hover/card:inset-0 group-hover/card:opacity-100 group-focus-visible/card:inset-0 group-focus-visible/card:opacity-100" />

        <div className="relative flex aspect-[3/2] flex-col overflow-hidden rounded-panel border border-brand-cyan/30 bg-surface-soft transition-colors group-hover/card:border-brand-cyan/70 group-hover/card:bg-brand-cyan/10 group-focus-visible/card:border-brand-cyan/70 group-focus-visible/card:bg-brand-cyan/10">
          <span className="relative z-10 p-5 text-sm text-fg md:text-base">{number}</span>

          <span
            aria-hidden="true"
            className="relative z-20 m-auto mb-18 grid size-20 place-items-center rounded-panel text-xl text-fg-muted md:size-25"
          >
            <ProjectLogo name={project.logo} className="relative z-10 m-auto size-10 md:size-20" />
          </span>

          {/*
            La banda va anclada al fondo y lleva dentro todo lo que crece:
            así, al aparecer el resumen, se expande hacia arriba en vez de
            empujar contenido fuera de la tarjeta, que es lo que lo cortaba.
          */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 rounded-t-panel bg-surface-strong p-3">
            {/* El número, como decoración sobre la banda */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 bottom-1 text-right text-7xl leading-none text-fg/5"
            >
              {number}
            </span>

            <div className="relative flex items-end justify-between gap-2">
              <ul className="flex flex-wrap gap-1.5">
                {project.types.map((type) => (
                  <ProjectTypeTag key={type} type={type} />
                ))}
              </ul>

              <p className="flex shrink-0 items-center gap-2 text-xs text-fg transition-colors group-hover/card:text-brand-cyan group-focus-visible/card:text-brand-cyan md:text-base">
                <PixelChevron className="size-3 text-brand-yellow opacity-0 transition-opacity group-hover/card:opacity-100 group-focus-visible/card:opacity-100 motion-safe:group-hover/card:animate-nudge-right motion-safe:group-focus-visible/card:animate-nudge-right" />
                {project.name}
              </p>
            </div>

            {/*
              El resumen solo en la tarjeta activa. Se reserva su alto con
              grid-rows para que la banda crezca con una transición suave.
            */}
            <div className="relative grid grid-rows-[0fr] transition-all duration-200 group-hover/card:grid-rows-[1fr] group-focus-visible/card:grid-rows-[1fr]">
              <p className="overflow-hidden text-[11px] leading-snug text-fg-muted opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100 md:text-xs">
                <span aria-hidden="true" className="text-status-ok">
                  {">_ "}
                </span>
                {project.summary}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
