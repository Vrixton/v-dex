import { TeamSize } from "@/components/ui/team-size";
import type { Project } from "@/content/projects";

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

        <div className="flex items-center gap-3 py-2">
          <dt className="w-20 shrink-0 text-brand-cyan/70">[TEAM]:</dt>
          <dd className="flex items-center gap-2.5 text-fg">
            <TeamSize size={project.teamSize} />
          </dd>
        </div>
      </dl>
    </section>
  );
}
