"use client";
import Link from "next/link";
import { useSound } from "@/components/sound/use-sound";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import type { Project } from "@/content/projects";

const pad = (value: number) => String(value).padStart(3, "0");

/**
 * Navegación entre fichas: se pasa de registro sin volver al índice, como en
 * una Pokédex.
 *
 * Vive aparte de la página porque va en el pie fijo de la ventana y porque
 * es lo que más se retoca: aquí se ajusta sin tocar el contenido de la ficha.
 *
 * Los grupos llevan nombre (group/prev, group/next) porque hay dos en la
 * misma barra: sin nombrarlos, pasar por uno animaría también el otro.
 *
 * La flecha se desplaza hacia su lado en vez de parpadear como la del menú:
 * allí el chevron es un cursor que señala la selección, aquí indica
 * dirección, y el movimiento lo dice sin necesidad de explicarlo.
 */
export function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  const play = useSound();
  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <Link
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        onClick={() => play("click")}
        href={`/projects/${prev.slug}`}
        className="group/prev flex items-center gap-2 justify-self-start text-xs text-fg-muted transition-colors hover:text-brand-cyan md:text-sm"
      >
        <PixelChevron className="size-3 rotate-180 transition-colors group-hover/prev:text-brand-yellow motion-safe:group-hover/prev:animate-nudge-left md:size-4" />
        <span className="hidden sm:inline">{`#${pad(prev.number)} ${prev.name}`}</span>
        <span className="sm:hidden">{`#${pad(prev.number)}`}</span>
      </Link>

      <Link
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        onClick={() => play("click")}
        href="/projects"
        className="rounded-control border border-brand-cyan bg-brand-cyan/15 px-4 py-1.5 text-xs font-medium text-brand-cyan transition-colors hover:bg-brand-cyan/25 md:text-sm"
      >
        BACK_TO_DB
      </Link>

      <Link
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        onClick={() => play("click")}
        href={`/projects/${next.slug}`}
        className="group/next flex items-center gap-2 justify-self-end text-xs text-fg-muted transition-colors hover:text-brand-cyan md:text-sm"
      >
        <span className="hidden sm:inline">{`${next.name} #${pad(next.number)}`}</span>
        <span className="sm:hidden">{`#${pad(next.number)}`}</span>
        <PixelChevron className="size-3 transition-colors group-hover/next:text-brand-yellow motion-safe:group-hover/next:animate-nudge-right md:size-4" />
      </Link>
    </nav>
  );
}
