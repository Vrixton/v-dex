import { Badge } from "@/components/ui/badge";
import { TechIconSprite } from "@/components/ui/tech-icons";
import { TechMedal } from "@/components/ui/tech-medal";
import { CONQUERED, TECHNOLOGIES } from "@/content/stack";

/**
 * Medallas de gimnasio: el stack completo.
 *
 * La medalla en sí vive en TechMedal, que también usan las fichas de
 * proyecto: aquí solo queda la cabecera con el contador y la rejilla.
 */
export function GymBadges() {
  return (
    <section className="flex flex-col gap-4 rounded-panel bg-surface p-4 md:p-5">
      <TechIconSprite />

      <header className="flex flex-wrap items-center justify-between gap-2">
        <span>
          GYM_BADGES <span className="text-fg-muted">|| TECH_STACK</span>
        </span>
        <Badge tone="yellow">
          {`${String(CONQUERED).padStart(2, "0")}/${TECHNOLOGIES.length} CONQUERED`}
        </Badge>
      </header>

      <ul className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-3">
        {TECHNOLOGIES.map((tech) => (
          <TechMedal key={tech.name} icon={tech.icon} />
        ))}
      </ul>
    </section>
  );
}
