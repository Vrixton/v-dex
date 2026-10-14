import { Badge } from "@/components/ui/badge";
import { TechIconSprite } from "@/components/ui/tech-icons";
import { TechMedal } from "@/components/ui/tech-medal";
import { CONQUERED, TECHNOLOGIES } from "@/content/stack";
import type { Locale } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";

export function GymBadges({ locale }: { locale: Locale }) {
  const m = getMessages(locale).stack;

  return (
    <section className="flex flex-col gap-4 rounded-panel bg-surface p-4 md:p-5">
      <TechIconSprite />

      <header className="flex flex-wrap items-center justify-between gap-2">
        <span>
          {m.title} <span className="hidden text-fg-muted sm:inline">|| {m.subtitle}</span>
        </span>
        <Badge tone="yellow">
          {`${String(CONQUERED).padStart(2, "0")}/${TECHNOLOGIES.length} ${m.conquered}`}
        </Badge>
      </header>

      <ul className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-3">
        {TECHNOLOGIES.map((tech) => (
          <TechMedal key={tech.name} icon={tech.icon} />
        ))}
      </ul>
    </section>
  );
}
