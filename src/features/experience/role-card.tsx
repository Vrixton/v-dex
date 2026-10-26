"use client";

import { useEffect, useRef } from "react";

import { useSound } from "@/components/sound/use-sound";
import { CompanyLogo } from "@/components/ui/company-logo";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import type { Role } from "@/content/experience";
import { useMessages } from "@/i18n/locale-provider";
import { formatPeriod } from "@/lib/date";
import { BracketFrame } from "@/components/ui/bracket-frame";

export function RoleCard({
  role,
  active,
  onSelect,
}: {
  role: Role;
  active: boolean;
  onSelect: () => void;
}) {
  const play = useSound();
  const m = useMessages().experience;
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!active) return;
    ref.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  return (
    <li ref={ref} className="flex-[0_0_calc((100%-1.5rem)/3)] snap-center">
      <button
        type="button"
        aria-current={active}
        onClick={() => {
          play("click");
          onSelect();
        }}
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        className="group/card relative block h-full w-full cursor-pointer text-left focus-visible:outline-none"
      >
        <BracketFrame
          className={`text-brand-cyan transition-all duration-200 ${
            active ? "inset-0 opacity-100" : "inset-3 opacity-0"
          }`}
        />
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-panel transition-colors ${
            active ? "bg-brand-cyan/10" : "bg-surface-soft group-hover/card:bg-brand-cyan/10"
          }`}
        >
          <div className="relative z-10 flex items-center gap-3 p-3">
            <CompanyLogo name={role.logo} className="size-12 shrink-0 md:size-14" />
            <span className="flex min-w-0 flex-col">
              <span
                className={`truncate text-base transition-colors md:text-lg ${
                  active ? "text-brand-cyan" : "text-fg"
                }`}
              >
                {role.company}
              </span>
              <span
                className={`text-[10px] text-fg-muted transition-opacity duration-200 md:text-xs ${
                  active ? "opacity-0" : "opacity-100"
                }`}
              >
                {role.periodLabel ?? formatPeriod(role.start, role.end)}
              </span>
            </span>
          </div>
          <p
            className={`absolute inset-x-0 bottom-0 flex items-center justify-end gap-2 rounded-t-panel bg-surface-strong/80 p-2 text-xs text-fg transition-all duration-200 md:text-sm ${
              active ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            {m.scanning}
            <PixelChevron className="size-3 text-brand-yellow motion-safe:animate-nudge-right" />
          </p>
        </div>
      </button>
    </li>
  );
}
