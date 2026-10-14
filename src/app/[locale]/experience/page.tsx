import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { ROLES } from "@/content/experience";
import { ExpeditionLog } from "@/features/experience/expedition-log";
import { format } from "@/i18n/format";
import { getMessages } from "@/i18n/messages";
import { routeLocale, type LocaleRouteProps } from "@/i18n/route-locale";

export default async function ExperiencePage({ params }: LocaleRouteProps) {
  const locale = await routeLocale(params);
  const messages = getMessages(locale);
  const m = messages.experience;

  return (
    <Window
      title={m.window.title}
      breadcrumb={m.window.breadcrumb}
      ledTone="yellow"
      fill
      scrollable
      actions={
        <>
          <Badge tone="yellow">
            {format(m.window.logsFound, {
              count: String(ROLES.length).padStart(2, "0"),
            })}
          </Badge>
          <Badge tone="green" led pulse className="hidden sm:flex">
            {messages.device.sync}
          </Badge>
        </>
      }
    >
      <ExpeditionLog />
    </Window>
  );
}
