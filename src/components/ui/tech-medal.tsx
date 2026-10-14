"use client";

import { useSound } from "@/components/sound/use-sound";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { HexBadge } from "@/components/ui/hex-badge";
import { TechIcon, type TechIconName } from "@/components/ui/tech-icons";
import { TECHNOLOGIES, type MedalLevel } from "@/content/stack";
import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";

const INK: Record<MedalLevel, string> = {
  gold: "text-screen/75",
  silver: "text-screen/70",
  bronze: "text-screen/75",
  locked: "text-white/35",
};

function techByIcon(icon: TechIconName) {
  return TECHNOLOGIES.find((tech) => tech.icon === icon);
}

type TechMedalProps = {
  icon: TechIconName;
  showName?: boolean;
};

export function TechMedal({ icon, showName = true }: TechMedalProps) {
  const play = useSound();
  const m = useMessages().stack;
  const tech = techByIcon(icon);
  if (!tech) return null;

  return (
    <li className="relative flex flex-col items-center gap-1 focus-within:z-30 hover:z-30">
      <button
        type="button"
        onMouseEnter={() => play("badge")}
        onFocus={() => play("badge")}
        className="group/badge relative block cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow motion-safe:transition-transform motion-safe:hover:-translate-y-1"
      >
        <span className="sr-only">
          {format(m.medal, { tech: tech.name, level: m.levels[tech.level] })}
        </span>
        <span className="relative block">
          <HexBadge level={tech.level} />
          <TechIcon
            name={tech.icon}
            className={`${INK[tech.level]} absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2`}
          />
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[75%] left-1/2 hidden -translate-x-1/2 md:group-hover/badge:block md:group-focus-visible/badge:block"
        >
          <span className="relative flex items-center overflow-hidden rounded-control border border-current/40 bg-screen/80 px-3 py-1.5 text-xs whitespace-nowrap text-brand-cyan backdrop-blur-sm motion-safe:animate-toast-in md:text-sm">
            <span aria-hidden="true" className="absolute inset-0 bg-current opacity-30" />
            <BracketFrame size="sm" />
            <span className="relative flex items-center gap-2">
              <span>{">_"}</span>
              <span className="ml-1 text-fg">{`[${m.techLabel}]:`}</span>
              <span>{tech.name}</span>
            </span>
          </span>
        </span>
      </button>

      {showName ? (
        <span
          aria-hidden="true"
          className="max-w-20 text-center text-[10px] leading-tight text-fg-muted md:hidden"
        >
          {tech.name}
        </span>
      ) : null}
    </li>
  );
}
