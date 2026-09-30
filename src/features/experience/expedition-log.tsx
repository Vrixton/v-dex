"use client";

import { useState } from "react";
import { useSound } from "@/components/sound/use-sound";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { ROLES_BY_RECENCY } from "@/content/experience";
import { RoleCard } from "./role-card";
import { RoleSelect } from "./role-select";
import { RoleViewer } from "./role-viewer";

export function ExpeditionLog() {
  const play = useSound();
  const [selected, setSelected] = useState(ROLES_BY_RECENCY[0]!.slug);

  const index = ROLES_BY_RECENCY.findIndex((item) => item.slug === selected);
  const role = ROLES_BY_RECENCY[index] ?? ROLES_BY_RECENCY[0]!;

  function step(direction: -1 | 1) {
    const next = ROLES_BY_RECENCY[index + direction];
    if (!next) return;
    play("select");
    setSelected(next.slug);
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
          direction="prev"
          disabled={index === 0}
          onClick={() => step(-1)}
          play={play}
        />

        <div className="min-w-0 flex-1">
          <ul className="flex snap-x snap-mandatory scrollbar-none gap-3 overflow-x-auto pb-2">
            {ROLES_BY_RECENCY.map((item) => (
              <RoleCard
                key={item.slug}
                role={item}
                active={item.slug === selected}
                onSelect={() => setSelected(item.slug)}
              />
            ))}
          </ul>
        </div>

        <CarouselButton
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
  direction,
  disabled,
  onClick,
  play,
}: {
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
      aria-label={direction === "prev" ? "Previous roles" : "Next roles"}
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
