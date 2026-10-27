"use client";

import { Button } from "@/components/ui/button";
import { useLocale, useMessages } from "@/i18n/locale-provider";
import { localePath } from "@/i18n/paths";

export default function NotFound() {
  const locale = useLocale();
  const messages = useMessages();
  const m = messages.notFound;
  const d = messages.device;

  return (
    <div
      id="device-buffer"
      className="flex min-h-[calc(100dvh-var(--screen-inset-top)-var(--screen-inset-bottom))] flex-col justify-center"
    >
      <p className="text-sm leading-relaxed text-fg md:text-base">
        <span className="font-bold">[{d.terminal.statusLabel}]:</span> 404 {m.breadcrumb}
      </p>
      <h1 className="text-sm leading-relaxed font-bold text-brand-yellow md:text-base">{m.body}</h1>
      <div className="mt-9 self-start">
        <Button href={localePath("/", locale)} size="lg">
          {m.home}
        </Button>
      </div>
    </div>
  );
}
