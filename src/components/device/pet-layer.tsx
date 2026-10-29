"use client";

import { PixelPet } from "@vrixton/pixel-pet";

import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";

import { useBoot } from "./boot-context";
import { findPet } from "./pets";

export function PetLayer() {
  const { phase, petId, resting, setResting, replayTour } = useBoot();
  const m = useMessages().device.pet;

  if (phase !== "done" || petId === null) return null;

  const pet = findPet(petId);
  const values = { name: pet.name };
  const actions = [
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
        dialogStyle={{
          borderRadius: "5px",
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
