"use client";

import { useEffect, useRef } from "react";
import { PixelPet, type PixelPetHandle } from "@vrixton/pixel-pet";
import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";
import { useBoot } from "./boot-context";
import { findPet } from "./pets";

const TOUR_BUBBLE_MS = 900_000;

export function PetLayer() {
  const { phase, petId, resting, setResting, replayTour } = useBoot();
  const m = useMessages().device.pet;
  const petRef = useRef<PixelPetHandle>(null);
  const isTour = phase === "tour";

  useEffect(() => {
    if (!isTour) return;
    petRef.current?.say(m.waiting, { duration: TOUR_BUBBLE_MS });
    return () => {
      petRef.current?.hush();
    };
  }, [isTour, m.waiting]);

  // if (phase !== "done" || petId === null) return null;
  if (petId === null || (phase !== "done" && !isTour)) return null;

  const pet = findPet(petId);
  const values = { name: pet.name };
  const actions = [
    {
      id: "greet",
      label: format(m.greet, values),
      onSelect: () => petRef.current?.say(format(m.greeting, values), { emotion: "happy" }),
    },
    {
      id: "rest",
      label: resting ? format(m.wake, values) : format(m.rest, values),
      onSelect: () => setResting(resting ? null : "right"),
    },
    {
      id: "tour",
      label: format(m.replayTour, values),
      onSelect: replayTour,
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-(--bezel-bottom-h) z-[6] h-44">
      <PixelPet
        petName={pet.name}
        color={pet.color}
        label={format(m.label, values)}
        ref={petRef}
        walk={!isTour}
        dialogStyle={{
          borderRadius: "var(--radius-control)",
        }}
        messages={{
          happy: format(m.happy, values),
          angry: format(m.overwhelmed, values),
          curious: format(m.curious, values),
        }}
        actions={actions}
        menuLabels={{ menu: format(m.menu, values), close: format(m.menuClose, values) }}
        resting={resting}
        onRestingChange={setResting}
        {...(pet.variant ? { variant: pet.variant } : {})}
        {...(pet.spriteSrc ? { spriteSrc: pet.spriteSrc } : {})}
      />
    </div>
  );
}
