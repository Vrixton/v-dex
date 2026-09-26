import type { ProjectType } from "@/content/projects";
import { cn } from "@/lib/cn";

/** Cada tipo con su color, como los tipos elementales de una ficha. */
const TONE: Record<ProjectType, string> = {
  "E-COMMERCE": "border-brand-cyan/60 text-brand-cyan",
  "WEB APP": "border-status-ok/60 text-status-ok",
  DASHBOARD: "border-brand-yellow/60 text-brand-yellow",
  PORTFOLIO: "border-level-border text-level",
};

export function ProjectTypeTag({ type, className }: { type: ProjectType; className?: string }) {
  return (
    <li
      className={cn(
        "rounded-control border px-2 py-0.5 text-[10px] whitespace-nowrap md:text-xs",
        TONE[type],
        className,
      )}
    >
      {type}
    </li>
  );
}
