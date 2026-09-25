import { BracketFrame } from "@/components/ui/bracket-frame";
import { GymBadges } from "./gym-badges";
import { SkillList } from "./skill-list";

/**
 * Bloque de skills: un marco HUD que envuelve las medallas del stack y la
 * lista de habilidades, con el título encajado en el borde superior.
 *
 * La línea de arriba se dibuja en dos tramos, uno a cada lado del título,
 * en vez de tapar una línea continua con un fondo: el fondo de la ventana
 * es translúcido y dejaría ver el recuadro del parche.
 *
 * La fila va posicionada sobre el borde y desplazada media altura, así los
 * tramos quedan a la misma altura que las esquinas del marco.
 */
export function SkillsPanel() {
  const line = "h-px flex-1 bg-[color-mix(in_oklab,var(--vdex-cyan-500)_25%,transparent)]";

  return (
    <section className="relative rounded-panel border-x border-b border-[color-mix(in_oklab,var(--vdex-cyan-500)_25%,transparent)] px-4 pt-8 pb-4 md:px-6 md:pb-6">
      <BracketFrame className="-inset-px text-brand-cyan" />

      {/* Borde superior partido: tramo, título, tramo */}
      <div className="absolute inset-x-4 top-0 flex -translate-y-1/2 items-center gap-3">
        <span aria-hidden="true" className={line} />
        <h2 className="text-sm text-brand-cyan md:text-base">SKILLS</h2>
        <span aria-hidden="true" className={line} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-6">
        <GymBadges />
        <SkillList />
      </div>
    </section>
  );
}
