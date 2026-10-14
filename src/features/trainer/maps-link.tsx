"use client";

import { Button } from "@/components/ui/button";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { useMessages } from "@/i18n/locale-provider";

export function MapsLink({ href }: { href: string }) {
  const m = useMessages().about.habitat;

  return (
    <Button
      href={href}
      target="_blank"
      rel="noreferrer"
      size="sm"
      className="absolute right-4 bottom-4"
    >
      {m.maps}
      <span className="sr-only">{m.mapsHint}</span>
      <PixelChevron className="size-3 transition-colors group-hover/btn:text-brand-yellow motion-safe:group-hover/btn:animate-nudge-right" />
    </Button>
  );
}
