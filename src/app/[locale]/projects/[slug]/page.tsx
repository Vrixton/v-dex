import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { ProjectLogo } from "@/components/ui/project-logo";
import { TechIconSprite } from "@/components/ui/tech-icons";
import { TechMedal } from "@/components/ui/tech-medal";
import { Terminal, TerminalLine } from "@/components/ui/terminal";
import { Window } from "@/components/window/window";
import { PROJECTS, findProject, neighbours } from "@/content/projects";
import { ProjectContext } from "@/features/projects/project-context";
import { ProjectLink } from "@/features/projects/project-link";
import { ProjectNav } from "@/features/projects/project-nav";
import { ProjectTypeTag } from "@/features/projects/project-type";
import { format } from "@/i18n/format";
import { LOCALES } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";
import { routeLocale } from "@/i18n/route-locale";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => PROJECTS.map((project) => ({ locale, slug: project.slug })));
}

const pad = (value: number) => String(value).padStart(3, "0");

type ProjectDetailProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const locale = await routeLocale(params);
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const messages = getMessages(locale);
  const m = messages.projects;
  const entry = m.items[project.slug];
  const around = neighbours(slug);

  return (
    <Window
      title={m.detail.title}
      breadcrumb={m.window.breadcrumb}
      ledTone="red"
      fill
      scrollable
      actions={
        <>
          <Badge tone="yellow">{format(m.detail.entry, { number: pad(project.number) })}</Badge>
          <Badge tone="green" led className="hidden sm:flex">
            {messages.device.sync}
          </Badge>
        </>
      }
      footer={around ? <ProjectNav prev={around.prev} next={around.next} /> : null}
    >
      <TechIconSprite />

      <div className="relative flex flex-col gap-5">
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
            className="relative z-10 grid size-20 place-items-center rounded-panel text-xl text-fg-muted md:size-25"
          >
            <ProjectLogo name={project.logo} className="size-20 shrink-0 md:size-25" />
          </span>

          <div className="flex flex-col gap-1">
            <p className="text-xs text-fg-muted">{`[${m.detail.nameLabel}]:`}</p>
            <h1 className="text-2xl text-brand-cyan text-shadow-glow md:text-3xl">
              {project.name}
            </h1>
            <ul className="mt-1 flex flex-wrap gap-2">
              {project.types.map((type) => (
                <ProjectTypeTag key={type} type={type} label={m.types[type]} />
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 md:ml-auto md:items-end">
            <ProjectLink url={project.link?.url} target={project.link?.target} />
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Terminal program={m.detail.program} locale={locale}>
            <p className="text-fg-muted">{entry.summary}</p>
            <p className="text-fg-muted">
              <span className="text-brand-yellow">{`[${m.detail.challengeLabel}]: `}</span>
              {entry.challenge}
            </p>
            <ul className="flex flex-col gap-2">
              {entry.work.map((line, index) => (
                <TerminalLine key={line} cursor={index === entry.work.length - 1}>
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
                    {messages.stack.title}{" "}
                    <span className="hidden text-fg-muted sm:inline">
                      || {messages.stack.subtitle}
                    </span>
                  </span>
                </h2>
                <Badge tone="yellow">
                  {format(messages.stack.equipped, {
                    count: String(project.stack.length).padStart(2, "0"),
                  })}
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
