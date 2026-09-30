import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { ROLES } from "@/content/experience";
import { ExpeditionLog } from "@/features/experience/expedition-log";

export default function ExperiencePage() {
  return (
    <Window
      title="EXPEDITION_LOG"
      breadcrumb="SELECTED_ROLES"
      ledTone="yellow"
      fill
      scrollable
      actions={
        <>
          <Badge tone="yellow">{`${String(ROLES.length).padStart(2, "0")} LOGS FOUND`}</Badge>
          <Badge tone="green" led pulse className="hidden sm:flex">
            SYNC: READY
          </Badge>
        </>
      }
    >
      <ExpeditionLog />
    </Window>
  );
}
