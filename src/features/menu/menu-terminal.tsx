"use client";

import { useTypewriter } from "@/hooks/use-typewriter";

/**
 * Línea inferior del menú. El texto se escribe solo; aria-live="polite" hace
 * que el lector de pantalla anuncie el mensaje final una vez, sin leer cada
 * carácter según aparece.
 */
export function MenuTerminal({ message }: { message: string }) {
  const typed = useTypewriter(message);

  return (
    <p className="flex items-center gap-2 rounded-control bg-terminal px-4 py-3 text-sm text-status-ok md:text-base">
      <span aria-hidden="true">{">_"}</span>
      <span className="sr-only">{message}</span>
      <span aria-hidden="true">{typed}</span>
      <span
        aria-hidden="true"
        className="inline-block h-[1em] w-[0.5em] bg-status-ok motion-safe:animate-cursor-blink"
      />
    </p>
  );
}
