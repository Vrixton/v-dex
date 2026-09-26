import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { PROJECTS_BY_NUMBER } from "@/content/projects";
import { ProjectCard } from "@/features/projects/project-card";

export default function ProjectsPage() {
  return (
    <Window
      title="CHALLENGE_LOGS_DB"
      breadcrumb="PROJECTS_REPOSITORY"
      ledTone="red"
      fill
      scrollable
      actions={
        <>
          <Badge tone="yellow">
            {`${String(PROJECTS_BY_NUMBER.length).padStart(2, "0")} RECORDS FOUND`}
          </Badge>
          <Badge tone="green" led pulse>
            SYNC: READY
          </Badge>
        </>
      }
    >
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {PROJECTS_BY_NUMBER.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </Window>
  );
}
