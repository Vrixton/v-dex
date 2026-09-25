import { Chip } from "@/components/ui/chip";
import { SKILLS, SKILL_PREFIX, type SkillKind } from "@/content/skills";

/**
 * Skills del trainer.
 *
 * Una sola lista, sin agrupar: el prefijo y el color ya dicen de qué tipo
 * es cada una, y agrupar obligaría a tres bloques con títulos que no
 * aportan nada a esta escala. El título del bloque lo pone SkillsPanel.
 */
const LEGEND: ReadonlyArray<{ kind: SkillKind; label: string }> = [
  { kind: "technical", label: "technical" },
  { kind: "personal", label: "personal" },
  { kind: "communication", label: "communication" },
];

const legendClass: Record<SkillKind, string> = {
  technical: "text-brand-cyan",
  personal: "text-fg-danger",
  communication: "text-brand-yellow",
};

export function SkillList() {
  return (
    <div className="flex flex-col gap-3">
      {/* Leyenda: sin ella, los tres prefijos y sus colores son decoración */}
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-fg-muted md:text-xs">
        {LEGEND.map(({ kind, label }) => (
          <li key={kind} className="flex items-center gap-1.5">
            <span
              className={`flex grow items-center justify-center gap-2 rounded-control border bg-surface px-1 text-xs whitespace-nowrap md:text-xs ${legendClass[kind]}`}
            >
              {SKILL_PREFIX[kind]}
            </span>
            <span className="text-transform: uppercase">{label}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap content-start gap-2">
        {SKILLS.map((skill) => (
          <Chip key={skill.label} kind={skill.kind}>
            {skill.label}
          </Chip>
        ))}
      </ul>
    </div>
  );
}
