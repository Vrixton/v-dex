"use client";

import { useDevice } from "./device-context";
import { useSound } from "@/components/sound/use-sound";
import { useMessages } from "@/i18n/locale-provider";

export function MenuToggle() {
  const { isMenuOpen, isBusy, isLoading, tone, toggleMenu } = useDevice();
  const play = useSound();
  const label = useMessages().device.toggle;

  return (
    <button
      id="menu-toggle"
      type="button"
      aria-label={label}
      aria-expanded={isMenuOpen}
      aria-busy={isBusy}
      {...(isMenuOpen ? { "aria-controls": "device-menu" } : {})}
      data-state={isMenuOpen ? "open" : "closed"}
      data-tone={tone}
      onClick={toggleMenu}
      onMouseEnter={() => play("hover")}
      className="group absolute bottom-0 left-1/2 size-(--menu-toggle-size) -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
    >
      <span className="block size-full rounded-full bg-seam p-[calc(var(--menu-toggle-size)*0.06)] shadow-key transition-[box-shadow,translate] duration-100 ease-out group-active:translate-y-[2px] group-active:shadow-key-pressed">
        <span className="block size-full rounded-full bg-white p-[calc(var(--menu-toggle-size)*0.04)]">
          <span className="relative grid size-full place-items-center overflow-hidden rounded-full bg-(image:--gradient-button-cyan) text-white group-hover:brightness-115 motion-safe:transition-[filter] motion-safe:duration-800">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-(image:--gradient-button-red) opacity-0 transition-opacity duration-300 ease-in-out group-data-[tone=red]:opacity-100 motion-reduce:transition-none"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-(image:--gradient-button-amber) opacity-0 transition-opacity duration-300 ease-in-out group-data-[tone=amber]:opacity-100 motion-reduce:transition-none"
            />
            <span className="absolute top-[8%] left-1/2 h-[22%] w-[45%] -translate-x-1/2 rounded-full bg-white/50" />
            {isLoading ? <LoaderIcon /> : isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </span>
        </span>
      </span>
    </button>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
} as const;

function MenuIcon() {
  return (
    <svg {...iconProps} className="relative mt-[6%] size-[50%]">
      <path d="M5 7h14M5 12h14M5 17h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg {...iconProps} className="relative mt-[6%] size-[45%]">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg
      {...iconProps}
      className="relative mt-[6%] size-[50%] motion-safe:animate-spin motion-reduce:[animation-duration:2.4s]"
    >
      <circle cx="12" cy="12" r="8" opacity="0.35" />
      <path d="M12 4a8 8 0 0 1 8 8" />
    </svg>
  );
}
