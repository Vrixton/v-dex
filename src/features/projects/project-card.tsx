import Link from "next/link";

import { BracketFrame } from "@/components/ui/bracket-frame";
import type { Project } from "@/content/projects";

import { ProjectTypeTag } from "./project-type";

/**
 * Registro del catálogo.
 *
 * La tarjeta entera es un enlace: el objetivo táctil es grande y con teclado
 * se recorre en un solo tabulador por proyecto.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col gap-3 rounded-panel border border-white/10 bg-surface p-4 transition-colors hover:border-brand-cyan/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow motion-safe:transition-transform motion-safe:hover:-translate-y-1"
      >
        <BracketFrame
          size="sm"
          className="inset-2 text-brand-cyan opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        />

        <p className="text-xs text-fg-muted">{`#${String(project.number).padStart(3, "0")}`}</p>

        {/* Marcador del logo hasta tener los definitivos */}
        <span
          aria-hidden="true"
          className="mx-auto grid size-16 place-items-center rounded-panel bg-terminal text-lg text-fg-muted"
        >
          {project.name.slice(0, 2)}
        </span>

        <div className="mt-auto flex flex-col gap-2">
          <h2 className="text-sm text-fg transition-colors group-hover:text-brand-cyan md:text-base">
            {project.name}
          </h2>
          <ul className="flex flex-wrap gap-1.5">
            {project.types.map((type) => (
              <ProjectTypeTag key={type} type={type} />
            ))}
          </ul>
        </div>
      </Link>
    </li>
  );
}
