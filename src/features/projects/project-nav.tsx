"use client";

import Link from "next/link";

import { useSound } from "@/components/sound/use-sound";
import { Button } from "@/components/ui/button";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import type { Project } from "@/content/projects";
import { useLocale, useMessages } from "@/i18n/locale-provider";
import { localePath } from "@/i18n/paths";

const pad = (value: number) => String(value).padStart(3, "0");

export function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  const play = useSound();
  const locale = useLocale();
  const m = useMessages().projects;

  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <Link
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        onClick={() => play("click")}
        href={localePath(`/projects/${prev.slug}`, locale)}
        className="group/prev flex items-center gap-2 justify-self-start text-xs text-fg-muted transition-colors hover:text-brand-cyan md:text-sm"
      >
        <PixelChevron className="size-3 rotate-180 transition-colors group-hover/prev:text-brand-yellow motion-safe:group-hover/prev:animate-nudge-left md:size-4" />
        <span className="hidden sm:inline">{`#${pad(prev.number)} ${prev.name}`}</span>
        <span className="sm:hidden">{`#${pad(prev.number)}`}</span>
      </Link>

      <Button href={localePath("/projects", locale)}>{m.nav.all}</Button>

      <Link
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        onClick={() => play("click")}
        href={localePath(`/projects/${next.slug}`, locale)}
        className="group/next flex items-center gap-2 justify-self-end text-xs text-fg-muted transition-colors hover:text-brand-cyan md:text-sm"
      >
        <span className="hidden sm:inline">{`${next.name} #${pad(next.number)}`}</span>
        <span className="sm:hidden">{`#${pad(next.number)}`}</span>
        <PixelChevron className="size-3 transition-colors group-hover/next:text-brand-yellow motion-safe:group-hover/next:animate-nudge-right md:size-4" />
      </Link>
    </nav>
  );
}
