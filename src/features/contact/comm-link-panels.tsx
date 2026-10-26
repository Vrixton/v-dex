"use client";

import { useState, type ReactNode } from "react";

import { ContactForm } from "./contact-form";
import { SignalStatus } from "./signal-status";
import type { TransmissionStatus } from "./transmission-status";

export function CommLinkPanels({
  mainChannel,
  cartridge,
  links,
}: {
  mainChannel: ReactNode;
  cartridge: ReactNode;
  links: ReactNode;
}) {
  const [status, setStatus] = useState<TransmissionStatus>("idle");

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <ContactForm onStatusChange={setStatus} />
      <div className="flex flex-col gap-5">
        <div className={status === "idle" ? "hidden sm:block" : undefined}>
          <SignalStatus status={status} />
        </div>
        {mainChannel}
        <div className="grid gap-5 sm:grid-cols-2">
          {cartridge}
          {links}
        </div>
      </div>
    </div>
  );
}
