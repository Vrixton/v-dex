"use client";

import { useState } from "react";

import { useSound } from "@/components/sound/use-sound";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { ROLES_BY_RECENCY, type RoleId } from "@/content/experience";
import { useMessages } from "@/i18n/locale-provider";

import { RoleCard } from "./role-card";
import { RoleSelect } from "./role-select";
import { RoleViewer } from "./role-viewer";

export function ExpeditionLog() {
  const play = useSound();
  const m = useMessages().experience;
  const [selected, setSelected] = useState<RoleId>(ROLES_BY_RECENCY[0]!.id);

  const index = ROLES_BY_RECENCY.findIndex((item) => item.id === selected);
  const role = ROLES_BY_RECENCY[index] ?? ROLES_BY_RECENCY[0]!;

  function step(direction: -1 | 1) {
    const next = ROLES_BY_RECENCY[index + direction];
    if (!next) return;
    play("select");
    setSelected(next.id);
  }

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="lg:hidden">
        <RoleSelect value={selected} onChange={setSelected} />
      </div>

      <div className="min-h-80 flex-1">
        <RoleViewer role={role} />
      </div>
      <div className="hidden items-center gap-3 lg:flex">
        <CarouselButton
          label={m.nav.previous}
          direction="prev"
          disabled={index === 0}
          onClick={() => step(-1)}
          play={play}
        />

        <div className="min-w-0 flex-1">
          <ul className="flex snap-x snap-mandatory scrollbar-none gap-3 overflow-x-auto pb-2">
            {ROLES_BY_RECENCY.map((item) => (
              <RoleCard
                key={item.id}
                role={item}
                active={item.id === selected}
                onSelect={() => setSelected(item.id)}
              />
            ))}
          </ul>
        </div>

        <CarouselButton
          label={m.nav.next}
          direction="next"
          disabled={index === ROLES_BY_RECENCY.length - 1}
          onClick={() => step(1)}
          play={play}
        />
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  direction,
  disabled,
  onClick,
  play,
}: {
  label: string;
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  play: ReturnType<typeof useSound>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && play("hover")}
      aria-label={label}
      className="group/nav flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-control bg-terminal/50 text-brand-cyan transition-colors hover:bg-terminal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow disabled:cursor-default disabled:opacity-25"
    >
      <PixelChevron
        className={`size-4 transition-colors group-hover/nav:text-brand-yellow ${
          direction === "prev" ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}
