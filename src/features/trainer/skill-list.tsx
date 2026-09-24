import { Chip } from "@/components/ui/chip";
import { SKILLS } from "@/content/skills";

/**
 * Skills del trainer.
 *
 * Una sola lista, sin agrupar: el prefijo y el color ya dicen de qué tipo
 * es cada una, y agrupar obligaría a tres bloques con títulos que no
 * aportan nada a esta escala.
 */
export function SkillList() {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-center text-sm text-brand-cyan md:text-base">SKILLS</h3>
      <ul className="flex flex-wrap justify-center gap-2">
        {SKILLS.map((skill) => (
          <Chip key={skill.label} kind={skill.kind}>
            {skill.label}
          </Chip>
        ))}
      </ul>
    </section>
  );
}
