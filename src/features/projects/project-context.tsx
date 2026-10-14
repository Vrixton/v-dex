"use client";

import { TeamSize } from "@/components/ui/team-size";
import type { Project } from "@/content/projects";
import { useMessages } from "@/i18n/locale-provider";

export function ProjectContext({ project }: { project: Project }) {
  const m = useMessages().projects;
  const entry = m.items[project.slug];

  const rows = [
    ...(entry.company.toUpperCase() === project.name ? [] : [[m.context.company, entry.company]]),
    [m.context.role, entry.role],
    [m.context.period, project.period],
  ] as const;

  return (
    <section className="flex flex-col gap-3 rounded-panel bg-surface p-4 md:p-5">
      <h2 className="text-sm text-fg md:text-base">{m.context.title}</h2>

      <dl className="flex flex-col text-xs md:text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-3 border-b border-white/5 py-2 last:border-none">
            <dt className="w-20 shrink-0 text-brand-cyan/70">{`[${label}]:`}</dt>
            <dd className="text-fg">{value}</dd>
          </div>
        ))}

        <div className="flex items-center gap-3 py-2">
          <dt className="w-20 shrink-0 text-brand-cyan/70">{`[${m.context.team}]:`}</dt>
          <dd className="flex items-center gap-2.5 text-fg">
            <TeamSize size={project.teamSize} />
          </dd>
        </div>
      </dl>
    </section>
  );
}
