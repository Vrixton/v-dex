"use client";

import { Button } from "@/components/ui/button";
import { PixelChevron } from "@/components/ui/pixel-chevron";

export function MapsLink({ href }: { href: string }) {
  return (
    <Button
      href={href}
      target="_blank"
      rel="noreferrer"
      size="sm"
      className="absolute right-4 bottom-4"
    >
      VIEW_ON_MAPS
      <PixelChevron className="size-3 transition-colors group-hover/btn:text-brand-yellow motion-safe:group-hover/btn:animate-nudge-right" />
    </Button>
  );
}
