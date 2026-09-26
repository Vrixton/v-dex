"use client";

import Link from "next/link";

import { useSound } from "@/components/sound/use-sound";

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
        className="rounded-control border border-brand-cyan bg-brand-cyan/15 px-4 py-2 text-center text-sm font-medium text-brand-cyan transition-colors hover:bg-brand-cyan/25"
      >
        {label}
      </Link>
      {note ? <p className="max-w-56 text-right text-[10px] text-fg-muted">{note}</p> : null}
    </>
  );
}
