"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

import { useBoot } from "@/components/device/boot-context";
import { findPet } from "@/components/device/pets";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";

const STEP_KEYS = ["menu", "cv", "contact"] as const;

const SPOTLIGHT_PAD = 6;

type Rect = { top: number; left: number; width: number; height: number };

function useSpotlight(
  selector: string | null,
  frameRef: RefObject<HTMLElement | null>,
): Rect | null {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (selector === null) return;
    const query = selector;

    function measure() {
      const target = document.querySelector(query);
      const frame = frameRef.current;
      if (!target || !frame) {
        setRect(null);
        return;
      }
      const box = target.getBoundingClientRect();
      const origin = frame.getBoundingClientRect();
      setRect({
        top: box.top - origin.top,
        left: box.left - origin.left,
        width: box.width,
        height: box.height,
      });
    }

    const frameId = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", measure);
    };
  }, [selector, frameRef]);

  return selector === null ? null : rect;
}

export function TourOverlay() {
  const { phase, petId, completeTour } = useBoot();
  const m = useMessages().device.tour;
  const [index, setIndex] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const isOpen = phase === "tour" && petId !== null;
  const stepKey = index === 0 ? null : STEP_KEYS[index - 1];
  const rect = useSpotlight(isOpen && stepKey === "menu" ? "#menu-toggle" : null, frameRef);

  useEffect(() => {
    if (!isOpen) return;
    nextRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        finish();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const items = dialog.querySelectorAll<HTMLElement>("button:not([disabled])");
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (!isOpen || petId === null) return null;

  const pet = findPet(petId);
  const text = stepKey ? m.steps[stepKey] : format(m.intro, { name: pet.name });
  const isLast = index === STEP_KEYS.length;

  function finish() {
    completeTour();
    document.getElementById("menu-toggle")?.focus();
  }

  function handleNext() {
    if (isLast) {
      finish();
      return;
    }
    setIndex((current) => current + 1);
  }

  return (
    <div
      ref={frameRef}
      className="fixed inset-x-0 top-(--bezel-top-h) bottom-(--bezel-bottom-h) z-40 overflow-hidden"
    >
      {rect ? (
        <span
          aria-hidden="true"
          style={{
            top: rect.top - SPOTLIGHT_PAD,
            left: rect.left - SPOTLIGHT_PAD,
            width: rect.width + SPOTLIGHT_PAD * 2,
            height: rect.height + SPOTLIGHT_PAD * 2,
          }}
          className="pointer-events-none absolute rounded-full shadow-[0_0_0_9999px_color-mix(in_oklab,var(--color-screen-off)_88%,transparent)] ring-2 ring-brand-yellow motion-safe:animate-pulse"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-screen-off)_88%,transparent)]"
        />
      )}

      <div className="absolute inset-0 flex overflow-y-auto p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          className="m-auto w-full max-w-xl border border-brand-cyan/60 bg-window p-4 shadow-[0_0_40px_rgba(0,0,0,0.65)] sm:p-6"
        >
          <div className="flex items-baseline justify-between text-sm">
            <p className="text-brand-yellow">[{pet.name.toUpperCase()}_SAY]:</p>
            {stepKey ? (
              <p className="text-brand-cyan">
                {index}/{STEP_KEYS.length}
              </p>
            ) : null}
          </div>

          <p className="mt-4 text-base leading-relaxed text-fg">{text}</p>

          <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-end">
            <Image
              src={stepKey ? pet.tourTalking : pet.tourHappy}
              alt=""
              width={64}
              height={64}
              unoptimized
              className="size-24 shrink-0 self-center [image-rendering:pixelated] sm:size-32 sm:self-auto"
            />

            <div className="flex flex-1 flex-col items-end gap-4">
              {stepKey ? (
                <ProgressBar value={index} max={STEP_KEYS.length} className="w-full" />
              ) : null}

              <div className="flex w-full justify-end gap-3">
                <Button tone="yellow" size="md" onClick={finish}>
                  {m.skip}
                </Button>
                <Button ref={nextRef} size="md" onClick={handleNext}>
                  {m.next}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
