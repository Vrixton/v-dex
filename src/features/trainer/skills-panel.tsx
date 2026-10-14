import { BracketFrame } from "@/components/ui/bracket-frame";
import type { Locale } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";

import { GymBadges } from "./gym-badges";
import { SkillList } from "./skill-list";

type SkillsPanelProps = {
  locale: Locale;
};

export function SkillsPanel({ locale }: SkillsPanelProps) {
  const m = getMessages(locale).about;
  const line = "h-px flex-1 bg-[color-mix(in_oklab,var(--vdex-cyan-500)_25%,transparent)]";

  return (
    <section className="relative rounded-panel border-x border-b border-[color-mix(in_oklab,var(--vdex-cyan-500)_25%,transparent)] px-4 pt-8 pb-4 md:px-6 md:pb-6">
      <BracketFrame className="-inset-px text-brand-cyan" />
      <div className="absolute inset-x-4 top-0 flex -translate-y-1/2 items-center gap-3">
        <span aria-hidden="true" className={line} />
        <h2 className="text-sm whitespace-nowrap text-brand-cyan md:text-base">{m.skillsTitle}</h2>
        <span aria-hidden="true" className={line} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-6">
        <GymBadges locale={locale} />
        <SkillList locale={locale} />
      </div>
    </section>
  );
}
