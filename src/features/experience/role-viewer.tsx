"use client";

import { BracketFrame } from "@/components/ui/bracket-frame";
import { CompanyLogo } from "@/components/ui/company-logo";
import { PinIcon } from "@/components/ui/icons";
import { TeamSize } from "@/components/ui/team-size";
import { Terminal, TerminalLine } from "@/components/ui/terminal";
import { ViewerGrid } from "@/components/ui/viewer-grid";
import type { Role } from "@/content/experience";
import { useLocale, useMessages } from "@/i18n/locale-provider";
import { duration, formatPeriod } from "@/lib/date";

export function RoleViewer({ role }: { role: Role }) {
  const locale = useLocale();
  const messages = useMessages();
  const m = messages.experience;
  const entry = m.roles[role.id];
  const terminal = messages.device.terminal;

  return (
    <div className="relative flex h-full flex-col rounded-panel border border-none bg-surface">
      <BracketFrame
        key={role.id}
        className="-inset-2 text-brand-yellow motion-safe:animate-bracket-focus"
      />
      <ViewerGrid />
      <div className="relative min-h-0 hud-scrollbar flex-1 overflow-y-auto p-5 md:p-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <CompanyLogo name={role.logo} className="size-12 shrink-0 md:size-14" />
            <div>
              <p className="text-[10px] text-fg-muted md:text-xs">{`[${m.companyLabel}]:`}</p>
              <h2 className="text-lg text-brand-cyan text-shadow-glow md:text-xl">
                {role.company}
              </h2>
              <p className="text-xs text-fg md:text-sm">{entry.role.toUpperCase()}</p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs text-fg md:text-sm">
              {role.periodLabel ?? formatPeriod(role.start, role.end)}
              <span className="ml-2 text-fg-muted">{duration(role.start, role.end)}</span>
            </p>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] text-fg-muted md:justify-end md:text-xs">
              <PinIcon className="size-3" />
              {entry.location}
            </p>
            <TeamSize size={role.teamSize} />
          </div>
        </header>

        <Terminal
          program={m.program}
          status={role.status === "active" ? terminal.statusActive : terminal.statusClosed}
          locale={locale}
          className="mt-5 flex-1"
        >
          <ul className="flex flex-col gap-2">
            {entry.log.map((line, index) => (
              <TerminalLine key={line} cursor={index === entry.log.length - 1}>
                {line}
              </TerminalLine>
            ))}
          </ul>
        </Terminal>
      </div>
    </div>
  );
}
