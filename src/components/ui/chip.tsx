import { SKILL_PREFIX, type SkillKind } from "@/content/skills";
import { cn } from "@/lib/cn";

type ChipProps = {
  kind: SkillKind;
  children: string;
  className?: string | undefined;
};

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

export function Chip({ kind, children, className }: ChipProps) {
  return (
    <li
      className={cn(
        "relative flex grow items-center justify-center rounded-control border bg-surface px-3 py-1 text-xs whitespace-nowrap md:text-sm",
        borderClass[kind],
        className,
      )}
    >
      <span aria-hidden="true" className={cn("absolute left-3", prefixClass[kind])}>
        {SKILL_PREFIX[kind]}
      </span>
      <span className="sr-only">{`${kind}: `}</span>
      <span className="px-7 text-fg">{children}</span>
    </li>
  );
}
