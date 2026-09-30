"use client";

import Link from "next/link";

import { useSound } from "@/components/sound/use-sound";
import { PixelChevron } from "@/components/ui/pixel-chevron";

export function MapsLink({ href }: { href: string }) {
  const play = useSound();

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => play("hover")}
      onFocus={() => play("hover")}
      onClick={() => play("click")}
      className="group/maps absolute right-4 bottom-4 flex cursor-pointer items-center gap-2 rounded-none border-4 border-brand-cyan-dark bg-brand-cyan px-3 py-1.5 text-[10px] text-brand-cyan-dark shadow-[4px_4px_0_0_var(--color-brand-cyan-dark)] transition-all hover:bg-brand-cyan/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow active:translate-x-[4px] active:translate-y-[4px] active:shadow-none md:text-xs"
    >
      VIEW_ON_MAPS
      <PixelChevron className="size-3 transition-colors group-hover/maps:text-brand-yellow motion-safe:group-hover/maps:animate-nudge-right" />
    </Link>
  );
}
