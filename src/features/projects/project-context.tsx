import { TeamSprites } from "@/components/ui/team-sprites";
import type { Project } from "@/content/projects";

/** El texto del equipo sale del número: así no hay dos criterios de escritura. */
function teamLabel(size: number | undefined): string {
  if (!size) return "—";
  return size === 1 ? "Solo" : `${size} devs`;
}

/**
 * Datos de contexto del registro, como la hoja de especificaciones de un
 * aparato: etiqueta a la izquierda, valor a la derecha, filas separadas.
 *
 * Solo entran datos que cambian entre proyectos. Uno que vale igual en todos
 * (todos están en producción, casi todos del mismo sector) no informa de nada
 * y solo ocupa sitio.
 *
 * Aparte de la página porque es la parte que más va a cambiar: aquí se
 * rediseña sin tocar el resto de la ficha.
 */
export function ProjectContext({ project }: { project: Project }) {
  const rows = [
    // La empresa se omite cuando es el propio nombre del proyecto
    ...(project.company.toUpperCase() === project.name ? [] : [["COMPANY", project.company]]),
    ["ROLE", project.role],
    ["PERIOD", project.period],
  ] as const;

  return (
    <section className="flex flex-col gap-3 rounded-panel bg-surface p-4 md:p-5">
      <h2 className="text-sm text-fg md:text-base">CONTEXT</h2>

      <dl className="flex flex-col text-xs md:text-sm">
        <div className="flex gap-3 border-b border-white/5 py-2">
          <dt className="w-20 shrink-0 text-brand-cyan/70">[SCOPE]:</dt>
          <dd className="text-brand-yellow">{project.kind}</dd>
        </div>
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-3 border-b border-white/5 py-2 last:border-none">
            <dt className="w-20 shrink-0 text-brand-cyan/70">{`[${label}]:`}</dt>
            <dd className="text-fg">{value}</dd>
          </div>
        ))}

        {/* El equipo, como un indicador del aparato: un punto por persona */}
        <div className="flex items-center gap-3 py-2">
          <dt className="w-20 shrink-0 text-brand-cyan/70">[TEAM]:</dt>
          <dd className="flex items-center gap-2.5 text-fg">
            <span className="flex items-baseline gap-1">
              <span className="text-base text-brand-yellow md:text-lg">
                {String(project.teamSize ?? 0).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-fg-muted">
                {project.teamSize === 1 ? "DEV" : "DEVS"}
              </span>
            </span>
            {project.teamSize ? <TeamSprites size={project.teamSize} /> : null}
          </dd>
        </div>
      </dl>
    </section>
  );
}
