"use client";

import Link from "next/link";

import { useSound } from "@/components/sound/use-sound";
import { CV_FILE } from "@/content/contact";

/**
 * Botón de descarga del CV.
 *
 * Vive aparte porque necesita sonido, y el sonido necesita cliente: el
 * cartucho lee el tamaño del archivo con node:fs, que solo existe en el
 * servidor, así que no puede ser un componente de cliente.
 */
export function CvDownloadButton() {
  const play = useSound();

  return (
    <Link
      href={`/${CV_FILE}`}
      download
      onMouseEnter={() => play("hover")}
      onClick={() => play("click")}
      className="group/cv relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-none border-4 border-brand-yellow-dark bg-brand-yellow px-4 py-3 text-base text-brand-yellow-dark shadow-[4px_4px_0_0_var(--color-brand-yellow-dark)] transition-all hover:bg-brand-yellow/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
    >
      <span
        aria-hidden="true"
        className="relative transition-transform group-active/cv:-translate-y-1"
      >
        ⏏
      </span>
      <span className="relative">EJECT / DOWNLOAD</span>
    </Link>
  );
}
