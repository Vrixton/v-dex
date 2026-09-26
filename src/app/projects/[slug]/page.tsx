import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { TechIconSprite } from "@/components/ui/tech-icons";
import { Terminal, TerminalLine } from "@/components/ui/terminal";
import { TechMedal } from "@/components/ui/tech-medal";
import { Window } from "@/components/window/window";
import { PROJECTS, findProject, neighbours } from "@/content/projects";
import { ProjectTypeTag } from "@/features/projects/project-type";
import { ProjectNav } from "@/features/projects/project-nav";
import { ProjectLink } from "@/features/projects/project-link";
import { ProjectContext } from "@/features/projects/project-context";

/** Cada ficha se genera en el build: llega como HTML, sin esperar a nada. */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

const pad = (value: number) => String(value).padStart(3, "0");

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const around = neighbours(slug);

  return (
    <Window
      title="TARGET_LOG_INSPECTOR"
      breadcrumb="PROJECTS_REPOSITORY"
      ledTone="red"
      fill
      scrollable
      actions={
        <>
          <Badge tone="yellow" className="hidden sm:flex">{`ENTRY #${pad(project.number)}`}</Badge>
          <Badge tone="green" led pulse>
            SYNC: READY
          </Badge>
        </>
      }
      /*
        La navegación va al pie fijo y no al final del contenido: si vive
        dentro del scroll, hay que bajar hasta abajo para descubrir que se
        puede volver o pasar de ficha.
      */
      footer={around ? <ProjectNav prev={around.prev} next={around.next} /> : null}
    >
      <TechIconSprite />

      <div className="relative flex flex-col gap-5">
        {/* El número, como marca de agua del registro */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-0 text-[7rem] leading-none text-fg/5 md:text-[10rem]"
        >
          {pad(project.number)}
        </span>

        <header className="relative flex flex-col gap-4 rounded-panel bg-surface p-4 md:flex-row md:items-center md:gap-6 md:p-5">
          <BracketFrame className="inset-2 text-brand-cyan" />

          <span
            aria-hidden="true"
            className="grid size-20 shrink-0 place-items-center rounded-panel bg-terminal text-2xl text-fg-muted"
          >
            {project.name.slice(0, 2)}
          </span>

          <div className="flex flex-col gap-1">
            <p className="text-xs text-fg-muted">[PROJECT_NAME]</p>
            <h1 className="text-2xl text-brand-cyan text-shadow-glow md:text-3xl">
              {project.name}
            </h1>
            <ul className="mt-1 flex flex-wrap gap-2">
              {project.types.map((type) => (
                <ProjectTypeTag key={type} type={type} />
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 md:ml-auto md:items-end">
            {project.link ? (
              <ProjectLink
                url={project.link.url}
                label={project.link.label}
                note={project.link.note}
              />
            ) : null}
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Terminal program="MISSION_LOG">
            <p className="text-fg-muted">{project.summary}</p>

            {/* El reto va dentro de la misma consola: una caja por dato
                convertiría la ficha en un archivador. */}
            <p className="text-fg-muted">
              <span className="text-brand-yellow">{"[CHALLENGE]: "}</span>
              {project.challenge}
            </p>
            <ul className="flex flex-col gap-2">
              {project.work.map((line, index) => (
                <TerminalLine key={line} cursor={index === project.work.length - 1}>
                  {line}
                </TerminalLine>
              ))}
            </ul>
          </Terminal>

          <div className="flex flex-col gap-5">
            <ProjectContext project={project} />

            <section className="flex flex-col gap-4 rounded-panel bg-surface p-4 md:p-5">
              <header className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm text-fg md:text-base">
                  <span>
                    GYM_BADGES <span className="text-fg-muted">|| TECH_STACK</span>
                  </span>
                </h2>
                <Badge tone="yellow">
                  {`${String(project.stack.length).padStart(2, "0")} EQUIPPED`}
                </Badge>
              </header>
              <ul className="mt-3 flex flex-wrap gap-2 md:gap-3">
                {project.stack.map((icon) => (
                  <TechMedal key={icon} icon={icon} />
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Window>
  );
}
