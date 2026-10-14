import { Chip } from "@/components/ui/chip";
import { SKILLS, SKILL_PREFIX, type SkillKind } from "@/content/skills";
import type { Locale } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";

const KINDS: readonly SkillKind[] = ["technical", "personal", "communication"];

const legendClass: Record<SkillKind, string> = {
  technical: "text-brand-cyan",
  personal: "text-fg-danger",
  communication: "text-brand-yellow",
};

type SkillListProps = {
  locale: Locale;
};

export function SkillList({ locale }: SkillListProps) {
  const m = getMessages(locale).about;

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-fg-muted md:text-xs">
        {KINDS.map((kind) => (
          <li key={kind} className="flex items-center gap-1.5">
            <span
              className={`flex grow items-center justify-center gap-2 rounded-control border bg-surface px-1 text-xs whitespace-nowrap md:text-xs ${legendClass[kind]}`}
            >
              {SKILL_PREFIX[kind]}
            </span>
            <span className="uppercase">{m.legend[kind]}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap content-start gap-2">
        {SKILLS.map((skill) => (
          <Chip key={skill.id} kind={skill.kind}>
            {m.skills[skill.id]}
          </Chip>
        ))}
      </ul>
    </div>
  );
}
