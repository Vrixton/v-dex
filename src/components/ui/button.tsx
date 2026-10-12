"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useSound } from "@/components/sound/use-sound";

type Tone = "cyan" | "yellow";
type Size = "sm" | "md" | "lg";

const TONES: Record<Tone, string> = {
  cyan: "border-brand-cyan-dark bg-brand-cyan text-brand-cyan-dark shadow-[4px_4px_0_0_var(--color-brand-cyan-dark)] hover:bg-brand-cyan/80 focus-visible:outline-brand-yellow",
  yellow:
    "border-brand-yellow-dark bg-brand-yellow text-brand-yellow-dark shadow-[4px_4px_0_0_var(--color-brand-yellow-dark)] hover:bg-brand-yellow/80 focus-visible:outline-brand-cyan",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-[10px] md:text-xs",
  md: "px-4 py-2 text-xs md:text-sm",
  lg: "px-4 py-3 text-base",
};

const BASE =
  "group/btn flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-none border-4 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:cursor-default disabled:opacity-60 disabled:shadow-none";

export function Button({
  children,
  href,
  tone = "cyan",
  size = "md",
  className = "",
  sound = "click",
  download,
  target,
  rel,
  type = "button",
  disabled,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  tone?: Tone;
  size?: Size;
  className?: string;
  sound?: "click" | false;
  download?: boolean;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const play = useSound();
  const classes = `${BASE} ${TONES[tone]} ${SIZES[size]} ${className}`;

  function handleClick() {
    if (sound) play(sound);
    onClick?.();
  }

  if (href) {
    return (
      <Link
        href={href}
        download={download}
        target={target}
        rel={rel}
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        onClick={handleClick}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => play("hover")}
      onFocus={() => play("hover")}
      onClick={handleClick}
      className={classes}
    >
      {children}
    </button>
  );
}
