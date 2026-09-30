import { Terminal, TerminalLine } from "@/components/ui/terminal";
import { BracketFrame } from "@/components/ui/bracket-frame";
import type { Role } from "@/content/experience";
import { TeamSize } from "@/components/ui/team-size";
import { PinIcon } from "@/components/ui/icons";
import { duration, formatPeriod } from "@/lib/date";
import { ViewerGrid } from "@/components/ui/viewer-grid";
import { CompanyLogo } from "@/components/ui/company-logo";

export function RoleViewer({ role }: { role: Role }) {
  return (
    <div className="relative flex h-full flex-col rounded-panel border border-none bg-surface">
      <BracketFrame
        key={role.slug}
        className="-inset-2 text-brand-yellow motion-safe:animate-bracket-focus"
      />
      <ViewerGrid />
      <div className="relative min-h-0 hud-scrollbar flex-1 overflow-y-auto p-5 md:p-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <CompanyLogo name={role.logo} className="size-12 shrink-0 md:size-14" />
            <div>
              <p className="text-[10px] text-fg-muted md:text-xs">[COMPANY]:</p>
              <h2 className="text-lg text-brand-cyan text-shadow-glow md:text-xl">
                {role.company}
              </h2>
              <p className="text-xs text-fg md:text-sm">{role.role.toUpperCase()}</p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs text-fg md:text-sm">
              {role.periodLabel ?? formatPeriod(role.start, role.end)}
              <span className="ml-2 text-fg-muted">{duration(role.start, role.end)}</span>
            </p>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] text-fg-muted md:justify-end md:text-xs">
              <PinIcon className="size-3" />
              {role.location}
            </p>
            <TeamSize size={role.teamSize} />
          </div>
        </header>

        <Terminal program="EXPEDITION_LOG" status={role.status} className="mt-5 flex-1">
          <ul className="flex flex-col gap-2">
            {role.log.map((line, index) => (
              <TerminalLine key={line} cursor={index === role.log.length - 1}>
                {line}
              </TerminalLine>
            ))}
          </ul>
        </Terminal>
      </div>
    </div>
  );
}
