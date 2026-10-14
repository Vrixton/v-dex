"use client";

import { BracketFrame } from "@/components/ui/bracket-frame";
import { Button } from "@/components/ui/button";
import { LockIcon } from "@/components/ui/icons";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";

export function ProjectLink({
  url,
  target,
}: {
  url?: string | undefined;
  target?: string | undefined;
}) {
  const m = useMessages().projects;

  if (!url || !target) {
    return (
      <p className="relative flex items-center gap-2 rounded-control border border-current/40 bg-screen/80 px-4 py-2 text-xs text-fg-muted md:text-sm">
        <span aria-hidden="true" className="absolute inset-0 bg-current opacity-30" />
        <BracketFrame size="sm" />
        <LockIcon className="size-3.5 shrink-0" />
        <span className="text-white">{`[${m.access.label}]:`}</span>
        {m.access.private}
      </p>
    );
  }

  return (
    <Button href={url} target="_blank" rel="noreferrer" size="lg" className="mb-5 md:mb-0">
      <span className="relative">{format(m.linkLabel, { target })}</span>
      <PixelChevron className="relative size-3 transition-colors group-hover/btn:text-brand-yellow motion-safe:group-hover/btn:animate-nudge-right" />
    </Button>
  );
}
