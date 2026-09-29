import { SignalIcon } from "@/components/ui/icons";
import { Terminal, TerminalCursor } from "@/components/ui/terminal";

import { TRANSMISSION_MESSAGES, type TransmissionStatus } from "./transmission-status";

const STATUS_LABELS: Record<TransmissionStatus, string> = {
  idle: "ONLINE",
  sending: "ONLINE",
  sent: "ONLINE",
  failed: "ERROR",
  limited: "UNAVAILABLE",
};

const SIGNAL_TONE: Record<TransmissionStatus, string> = {
  idle: "text-status-ok",
  sending: "text-brand-yellow",
  sent: "text-status-ok",
  failed: "text-fg-danger",
  limited: "text-fg-muted",
};

export function SignalStatus({ status = "idle" }: { status?: TransmissionStatus }) {
  return (
    <section className="flex flex-col gap-3 rounded-panel bg-surface p-4 md:p-5">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-sm text-fg md:text-base">SIGNAL_STATUS</h2>
        <SignalIcon
          className={`size-5 ${SIGNAL_TONE[status]} ${
            status === "sending" ? "motion-safe:animate-led-pulse" : ""
          }`}
        />
      </header>

      <Terminal program="COMMUNICATION_LINK" status={STATUS_LABELS[status]}>
        <p>
          {TRANSMISSION_MESSAGES[status]}
          <TerminalCursor />
        </p>
      </Terminal>
    </section>
  );
}
