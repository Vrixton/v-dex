"use client";

import { BracketFrame } from "@/components/ui/bracket-frame";
import { Button } from "@/components/ui/button";
import { LockIcon } from "@/components/ui/icons";
import { PixelChevron } from "@/components/ui/pixel-chevron";

export function ProjectLink({
  url,
  label,
  note,
}: {
  url?: string | undefined;
  label: string;
  note?: string | undefined;
}) {
  if (!url) {
    return (
      <p className="relative flex items-center gap-2 rounded-control border border-current/40 bg-screen/80 px-4 py-2 text-xs text-fg-muted md:text-sm">
        <span aria-hidden="true" className="absolute inset-0 bg-current opacity-30" />
        <BracketFrame size="sm" />
        <LockIcon className="size-3.5 shrink-0" />
        <span className="text-white">[ACCESS]:</span>PRIVATE
      </p>
    );
  }

  return (
    <>
      <Button href={url} target="_blank" rel="noreferrer" size="lg" className="mb-5 md:mb-0">
        <span className="relative">{label}</span>
        <PixelChevron className="relative size-3 transition-colors group-hover/btn:text-brand-yellow motion-safe:group-hover/btn:animate-nudge-right" />
      </Button>
      {note ? <p className="max-w-56 text-right text-[10px] text-fg-muted">{note}</p> : null}
    </>
  );
}
