"use client";

import { useState } from "react";

import { HexBadge } from "@/components/ui/hex-badge";
import { CONQUERED, TECHNOLOGIES } from "@/content/stack";

/**
 * Medallas de gimnasio: el stack.
 *
 * Cada medalla es un botón porque se puede enfocar y consultar con teclado,
 * no solo con el ratón: el nombre aparece igual al tabular. La etiqueta
 * compartida usa aria-live para que el lector de pantalla la anuncie.
 */
export function GymBadges() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="flex flex-col gap-4 rounded-panel bg-surface p-4 md:p-5">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm text-fg md:text-base">
          GYM BADGES <span className="text-fg-muted">|| TECH STACK</span>
        </h3>
        <p className="rounded-sm border border-current/50 px-2 py-0.5 text-xs text-brand-yellow">
          {`${String(CONQUERED).padStart(2, "0")}/${TECHNOLOGIES.length} CONQUERED`}
        </p>
      </header>

      <ul className="flex flex-wrap gap-2 md:gap-3">
        {TECHNOLOGIES.map((tech) => (
          <li key={tech.name}>
            <button
              type="button"
              className="hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow motion-safe:transition-transform"
              onMouseEnter={() => setActive(tech.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(tech.name)}
              onBlur={() => setActive(null)}
            >
              <span className="sr-only">{`${tech.name}: ${tech.level}`}</span>
              <HexBadge level={tech.level} />
            </button>
          </li>
        ))}
      </ul>

      <p
        aria-live="polite"
        className="rounded-control bg-terminal px-3 py-2 text-xs text-brand-cyan md:text-sm"
      >
        {active ?? "Hover a badge to inspect"}
      </p>
    </section>
  );
}
