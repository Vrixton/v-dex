"use client";

import Link from "next/link";

import { useSound } from "@/components/sound/use-sound";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { LockIcon } from "@/components/ui/icons";
import { BracketFrame } from "@/components/ui/bracket-frame";
/**
 * Enlace al sitio del proyecto.
 *
 * Vive aparte porque necesita sonido, y el sonido necesita cliente: la
 * página es un componente de servidor que se genera en el build, y ponerle
 * "use client" le quitaría esa ventaja por un detalle de un botón.
 *
 * Sin enlace el proyecto es privado o ya no está en línea: se dice, en vez
 * de dejar un botón que lleva a una página caída.
 */
export function ProjectLink({
  url,
  label,
  note,
}: {
  url?: string | undefined;
  label: string;
  note?: string | undefined;
}) {
  const play = useSound();

  if (!url) {
    return (
      <p className="relative flex items-center gap-2 rounded-control border border-current/40 bg-screen/80 px-4 py-2 text-xs text-fg-muted md:text-sm">
        <span aria-hidden="true" className="absolute inset-0 bg-current opacity-30" />
        <BracketFrame size="sm" />
        <LockIcon className="size-3.5 shrink-0" />
        <span className="text-white">[ACCESS]:</span>PRIVATE
      </p>
    );
  }

  return (
    <>
      <Link
        href={url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        onClick={() => play("click")}
        className="group/goto relative mb-5 flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-none border-4 border-brand-cyan-dark bg-brand-cyan px-4 py-3 text-base text-brand-cyan-dark shadow-[4px_4px_0_0_var(--color-brand-cyan-dark)] transition-all hover:bg-brand-cyan/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow active:translate-x-[4px] active:translate-y-[4px] active:shadow-none md:mb-0"
      >
        <span className="relative">{label}</span>
        <PixelChevron className="relative size-3 transition-colors group-hover/goto:text-brand-yellow motion-safe:group-hover/goto:animate-nudge-right" />
      </Link>
      {note ? <p className="max-w-56 text-right text-[10px] text-fg-muted">{note}</p> : null}
    </>
  );
}
