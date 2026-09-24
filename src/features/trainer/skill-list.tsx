import { Chip } from "@/components/ui/chip";
import { SKILLS } from "@/content/skills";

/**
 * Skills del trainer.
 *
 * Una sola lista, sin agrupar: el prefijo y el color ya dicen de qué tipo
 * es cada una, y agrupar obligaría a tres bloques con títulos que no
 * aportan nada a esta escala. El título del bloque lo pone SkillsPanel.
 */
export function SkillList() {
  return (
    <ul className="flex flex-wrap content-start justify-center gap-2">
      {SKILLS.map((skill) => (
        <Chip key={skill.label} kind={skill.kind}>
          {skill.label}
        </Chip>
      ))}
    </ul>
  );
}
