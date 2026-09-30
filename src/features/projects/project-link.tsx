"use client";

import Link from "next/link";

import { useSound } from "@/components/sound/use-sound";
import { PixelChevron } from "@/components/ui/pixel-chevron";

/**
 * Enlace al sitio del proyecto.
 *
 * Vive aparte porque necesita sonido, y el sonido necesita cliente: la
 * página es un componente de servidor que se genera en el build, y ponerle
 * "use client" le quitaría esa ventaja por un detalle de un botón.
 */
export function ProjectLink({
  url,
  label,
  note,
}: {
  url: string;
  label: string;
  note?: string | undefined;
}) {
  const play = useSound();

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
