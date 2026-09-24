import { SKILL_PREFIX, type SkillKind } from "@/content/skills";
import { cn } from "@/lib/cn";

type ChipProps = {
  kind: SkillKind;
  children: string;
  className?: string | undefined;
};

// El prefijo lleva el color; el texto se queda blanco para que se lea bien.
const prefixClass: Record<SkillKind, string> = {
  technical: "text-brand-cyan",
  personal: "text-fg-danger",
  communication: "text-brand-yellow",
};

const borderClass: Record<SkillKind, string> = {
  technical: "border-brand-cyan/50",
  personal: "border-fg-danger/50",
  communication: "border-brand-yellow/50",
};

/**
 * Etiqueta de skill. El prefijo indica el tipo (técnica, personal o de
 * comunicación) y se lee también en el texto oculto, para que la
 * clasificación no dependa solo del color.
 */
export function Chip({ kind, children, className }: ChipProps) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-control border bg-surface px-3 py-1.5 text-xs whitespace-nowrap md:text-sm",
        borderClass[kind],
        className,
      )}
    >
      <span aria-hidden="true" className={prefixClass[kind]}>
        {SKILL_PREFIX[kind]}
      </span>
      <span className="sr-only">{`${kind}: `}</span>
      <span className="text-fg">{children}</span>
    </li>
  );
}
