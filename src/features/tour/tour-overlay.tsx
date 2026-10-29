"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useBoot } from "@/components/device/boot-context";
import { findPet, type Pet } from "@/components/device/pets";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";
import { highlight } from "@/i18n/highlight";

const STEP_KEYS = ["menu", "cv", "contact"] as const;

type StepKey = (typeof STEP_KEYS)[number];

function tourArt(pet: Pet, stepKey: StepKey | null): string {
  if (stepKey === null) return pet.tourHappy;
  if (stepKey === "menu") return pet.tourPoint;
  return pet.tourTalking;
}

const STEP_MS = 60000;

export function TourOverlay() {
  const { phase, petId, completeTour } = useBoot();
  const m = useMessages().device.tour;
  const [index, setIndex] = useState(0);
  const [, setTick] = useState(0);
  const deadlineRef = useRef(Date.now() + STEP_MS);
  const rootRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const isOpen = phase === "tour" && petId !== null;
  const stepKey = index === 0 ? null : (STEP_KEYS[index - 1] ?? null);

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

      const root = rootRef.current;
      if (!root) return;

      const items = root.querySelectorAll<HTMLElement>("button:not([disabled])");
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

  useEffect(() => {
    if (!isOpen) return;
    const id = window.setInterval(() => {
      if (Date.now() >= deadlineRef.current) {
        handleNext();
        return;
      }
      setTick((value) => value + 1);
    }, 250);
    return () => window.clearInterval(id);
  });

  if (!isOpen || petId === null) return null;

  const pet = findPet(petId);
  const text = stepKey ? m.steps[stepKey] : format(m.intro, { name: pet.name });
  const isLast = index === STEP_KEYS.length;
  const placement = stepKey === "menu" ? "mx-auto mt-6 mb-auto" : "m-auto";
  const remaining = Math.max(0, deadlineRef.current - Date.now());
  const seconds = Math.ceil(remaining / 1000);

  function goTo(target: number) {
    deadlineRef.current = Date.now() + STEP_MS;
    setIndex(target);
  }

  function finish() {
    completeTour();
    goTo(0);
    document.getElementById("menu-toggle")?.focus();
  }

  function handleNext() {
    if (isLast) {
      finish();
      return;
    }
    goTo(index + 1);
  }

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-text"
      className="fixed inset-x-0 top-(--bezel-top-h) bottom-(--bezel-bottom-h) z-7 overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-black)_70%,transparent)]"
      />

      <div className="absolute inset-0 flex overflow-y-auto p-4">
        <div
          className={`relative w-full max-w-lg rounded-window border border-brand-cyan/20 bg-window p-4 inset-shadow-window sm:p-6 ${placement}`}
        >
          <Image
            src={tourArt(pet, stepKey)}
            alt=""
            width={96}
            height={96}
            unoptimized
            className="pointer-events-none absolute -bottom-15 -left-10 size-38 [image-rendering:pixelated] sm:-bottom-23 sm:-left-9 sm:size-48"
          />

          <div className="flex items-baseline justify-between text-sm">
            <p style={{ color: pet.color }}>
              {format(m.speaker, { name: pet.name.toUpperCase() })}
            </p>
            {stepKey ? (
              <p className="text-brand-yellow">
                {index}/{STEP_KEYS.length}
              </p>
            ) : null}
          </div>

          <p id="tour-text" className="mt-4 text-base leading-relaxed text-fg">
            {highlight(text, pet.color)}
          </p>

          <div className="mt-6 flex justify-end gap-3 pl-28 sm:pl-52">
            {index > 0 ? (
              <Button size="md" onClick={() => goTo(index - 1)} className="uppercase">
                {m.back}
              </Button>
            ) : null}
            <Button
              ref={nextRef}
              size="md"
              tone={isLast ? "yellow" : "cyan"}
              onClick={handleNext}
              className="uppercase"
            >
              {isLast ? m.finish : m.next}
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-4 flex w-[22rem] max-w-[80%] flex-col items-end gap-2">
        {isLast ? null : (
          <Button tone="yellow" size="md" className="mr-4 mb-4 uppercase" onClick={finish}>
            {m.skip}
          </Button>
        )}
        <ProgressBar
          caption={isLast ? m.finish : m.next}
          value={remaining}
          max={STEP_MS}
          minFill={20}
          label={`${seconds}s`}
          className="w-full"
        />
      </div>
    </div>
  );
}
