"use client";

import { useToast } from "@/components/toast/toast-context";
import { SpeakerIcon } from "@/components/ui/icons";
import { useMessages } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";

import { useSoundEnabled, useSoundToggle } from "./use-sound";

export function SoundToggle({ className }: { className?: string }) {
  const isEnabled = useSoundEnabled();
  const toggle = useSoundToggle();
  const toast = useToast();
  const m = useMessages().device.sound;

  function handleClick() {
    const next = !isEnabled;
    toggle();
    toast({
      label: m.label,
      value: next ? m.on : m.off,
      tone: next ? "info" : "muted",
      icon: <SpeakerIcon waves={next} />,
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isEnabled}
      className={cn(
        "group pointer-events-auto flex cursor-pointer items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bezel-ink",
        className,
      )}
    >
      <span className="sr-only">{m.name}</span>
      <SpeakerIcon
        waves={isEnabled}
        className="size-4 text-bezel-ink opacity-70 transition-opacity group-aria-pressed:opacity-100 md:size-5"
      />

      <span
        aria-hidden="true"
        className="relative block h-7 w-10 rounded-full border-seam/70 bg-[var(--vdex-silver-500)] shadow-[inset_0_2px_3px_rgb(0_0_0/0.35)]"
      >
        <span className="absolute top-1/2 left-0 size-6 -translate-y-1/2 rounded-full bg-[var(--vdex-silver-200)] shadow-[0_1px_3px_rgb(0_0_0/0.4)] transition-[translate,background-color,box-shadow,filter] duration-200 ease-out group-hover:brightness-110 group-aria-pressed:translate-x-4 group-aria-pressed:border-white group-aria-pressed:bg-brand-cyan group-aria-pressed:text-brand-cyan group-aria-pressed:shadow-[0_0_10px_2px_currentColor]" />
      </span>
    </button>
  );
}
