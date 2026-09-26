"use client";

import Link from "next/link";

import { useSound } from "@/components/sound/use-sound";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import type { Project } from "@/content/projects";

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
 * En reposo solo se ve el marco fino. Las esquinas aparecen al activarse y
 * se abren desde el borde del marco hacia fuera, como si salieran de él.
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
        <div className="relative flex aspect-[4/3] flex-col overflow-hidden rounded-panel border border-brand-cyan/30 bg-surface-soft transition-colors group-hover/card:border-brand-cyan/70 group-hover/card:bg-brand-cyan/10 group-focus-visible/card:border-brand-cyan/70 group-focus-visible/card:bg-brand-cyan/10">
          {/* Banda inferior: de borde a borde del marco */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/5 rounded-t-panel bg-surface-strong"
          />
          {/* El número, como decoración sobre la banda */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 right-1 bottom-0 mr-2 mb-2 text-right text-7xl leading-none text-fg/5 md:text-7xl"
          >
            {number}
          </span>

          <span className="relative z-10 p-5 text-sm text-fg md:text-base">{number}</span>

          {/* Marcador del logo hasta tener los definitivos */}
          <span
            aria-hidden="true"
            className="relative z-10 m-auto grid size-16 place-items-center rounded-panel bg-window-header text-xl text-fg-muted md:size-24"
          >
            {project.name.slice(0, 2)}
          </span>

          <p className="relative z-10 flex items-center justify-end gap-2 p-3 text-xs text-fg transition-colors group-hover/card:text-brand-cyan group-focus-visible/card:text-brand-cyan md:text-lg">
            <PixelChevron className="size-3 text-brand-yellow opacity-0 transition-opacity group-hover/card:opacity-100 group-focus-visible/card:opacity-100 motion-safe:group-hover/card:animate-nudge-right motion-safe:group-focus-visible/card:animate-nudge-right" />
            {project.name}
          </p>
        </div>
      </Link>
    </li>
  );
}
