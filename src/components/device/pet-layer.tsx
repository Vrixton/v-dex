"use client";

import { PixelPet } from "@vrixton/pixel-pet";

import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";

import { useBoot } from "./boot-context";
import { findPet } from "./pets";

export function PetLayer() {
  const { phase, petId } = useBoot();
  const m = useMessages().device.pet;

  if (phase !== "done" || petId === null) return null;

  const pet = findPet(petId);
  const values = { name: pet.name };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-(--bezel-bottom-h) z-[6] h-44">
      <PixelPet
        petName={pet.name}
        color={pet.color}
        label={format(m.label, values)}
        messages={{
          happy: format(m.happy, values),
          angry: format(m.overwhelmed, values),
          curious: format(m.curious, values),
        }}
        {...(pet.variant ? { variant: pet.variant } : {})}
        {...(pet.spriteSrc ? { spriteSrc: pet.spriteSrc } : {})}
      />
    </div>
  );
}
