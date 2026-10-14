import type { ProjectType } from "@/content/projects";
import { cn } from "@/lib/cn";

const TONE: Record<ProjectType, string> = {
  ecommerce: "border-brand-cyan/60 text-brand-cyan",
  webApp: "border-status-ok/60 text-status-ok",
  dashboard: "border-brand-yellow/60 text-brand-yellow",
  portfolio: "border-level-border text-level",
};

export function ProjectTypeTag({
  type,
  label,
  className,
}: {
  type: ProjectType;
  label: string;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "rounded-control border px-2 py-0.5 text-[10px] whitespace-nowrap md:text-xs",
        TONE[type],
        className,
      )}
    >
      {label}
    </li>
  );
}
