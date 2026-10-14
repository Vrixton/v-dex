import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { PROJECTS_BY_NUMBER } from "@/content/projects";
import { ProjectCard } from "@/features/projects/project-card";
import { format } from "@/i18n/format";
import { getMessages } from "@/i18n/messages";
import { routeLocale, type LocaleRouteProps } from "@/i18n/route-locale";

export default async function ProjectsPage({ params }: LocaleRouteProps) {
  const locale = await routeLocale(params);
  const messages = getMessages(locale);
  const m = messages.projects;

  return (
    <Window
      title={m.window.title}
      breadcrumb={m.window.breadcrumb}
      ledTone="red"
      fill
      scrollable
      actions={
        <>
          <Badge tone="yellow">
            {format(m.window.recordsFound, {
              count: String(PROJECTS_BY_NUMBER.length).padStart(2, "0"),
            })}
          </Badge>
          <Badge tone="green" className="hidden sm:flex" led pulse>
            {messages.device.sync}
          </Badge>
        </>
      }
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-2 lg:grid-cols-3">
        {PROJECTS_BY_NUMBER.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </Window>
  );
}
