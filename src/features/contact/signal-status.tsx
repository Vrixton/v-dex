"use client";

import { SignalIcon } from "@/components/ui/icons";
import { Terminal, TerminalCursor } from "@/components/ui/terminal";
import { useLocale, useMessages } from "@/i18n/locale-provider";
import type { Messages } from "@/i18n/messages";

import type { TransmissionStatus } from "./transmission-status";

type SignalLabel = keyof Messages["contact"]["signal"]["labels"];

const LABEL: Record<TransmissionStatus, SignalLabel> = {
  idle: "online",
  sending: "online",
  sent: "online",
  failed: "error",
  limited: "unavailable",
};

const SIGNAL_TONE: Record<TransmissionStatus, string> = {
  idle: "text-status-ok",
  sending: "text-brand-yellow",
  sent: "text-status-ok",
  failed: "text-fg-danger",
  limited: "text-fg-muted",
};

export function SignalStatus({ status = "idle" }: { status?: TransmissionStatus }) {
  const locale = useLocale();
  const m = useMessages().contact.signal;

  return (
    <section className="flex flex-col gap-3 rounded-panel bg-surface p-4 md:p-5">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-sm text-fg md:text-base">{m.title}</h2>
        <SignalIcon
          className={`size-5 ${SIGNAL_TONE[status]} ${
            status === "sending" ? "motion-safe:animate-led-pulse" : ""
          }`}
        />
      </header>

      <Terminal program={m.program} status={m.labels[LABEL[status]]} locale={locale}>
        <p>
          {m.messages[status]}
          <TerminalCursor />
        </p>
      </Terminal>
    </section>
  );
}
