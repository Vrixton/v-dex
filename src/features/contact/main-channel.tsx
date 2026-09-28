"use client";

import { useSound } from "@/components/sound/use-sound";
import { useToast } from "@/components/toast/toast-context";
import { Badge } from "@/components/ui/badge";
import { AtIcon, CopyIcon } from "@/components/ui/icons";
import { CONTACT } from "@/content/contact";

/**
 * Canal principal: el correo.
 *
 * Se copia al portapapeles en vez de abrir el cliente de correo, porque
 * mailto falla en cualquier ordenador sin cuenta configurada y la mayoría
 * escribe desde su propio webmail.
 */
export function MainChannel() {
  const play = useSound();
  const toast = useToast();

  async function copy() {
    play("copy");
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      toast({
        label: "EMAIL",
        value: "COPIED TO CLIPBOARD",
        tone: "success",
        key: "email",
        icon: <AtIcon className="size-4" />,
      });
    } catch {
      toast({
        label: "EMAIL",
        value: "COPY FAILED",
        tone: "warning",
        key: "email",
        icon: <AtIcon className="size-4" />,
      });
    }
  }

  return (
    <section className="flex flex-col gap-3 rounded-panel bg-surface p-4 md:p-5">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm text-fg md:text-base">MAIN_CHANNEL</h2>
        <Badge tone="yellow">{`[RESPONSE_TIME]: <24h`}</Badge>
      </header>

      <p className="text-[10px] text-fg-muted md:text-xs">
        <span className="text-fg-muted">[Trainer Notice]: </span>
        Click to copy. Let&apos;s talk about your next campaign.
      </p>

      <button
        type="button"
        onClick={copy}
        onMouseEnter={() => play("hover")}
        className="group/mail flex cursor-pointer items-center gap-3 rounded-control bg-terminal/50 px-4 py-3 transition-colors hover:bg-terminal/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        <span className="mx-auto truncate text-xs text-brand-cyan underline-offset-4 group-hover/mail:underline md:text-sm">
          {CONTACT.email}
        </span>
        <CopyIcon className="size-4 shrink-0 text-fg-muted transition-colors group-hover/mail:text-brand-cyan" />
      </button>
    </section>
  );
}
