"use client";

import { PixelPet, type PixelPetHandle } from "@vrixton/pixel-pet";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import { PETS, type Pet } from "@/components/device/pets";
import { useSound } from "@/components/sound/use-sound";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";

// The library parks the pet 100px from its container's left edge, so a 260px stage centers it.
const PET_STAGE_WIDTH = "260px";

export function PetChooser({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex w-full items-end justify-center gap-2 sm:gap-8">
      {PETS.map((pet) => (
        <PetCard key={pet.id} pet={pet} isSelected={pet.id === selectedId} onSelect={onSelect} />
      ))}
    </div>
  );
}

function PetCard({
  pet,
  isSelected,
  onSelect,
}: {
  pet: Pet;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const m = useMessages().device.pet;
  const play = useSound();
  const petRef = useRef<PixelPetHandle>(null);

  const values = { name: pet.name };
  const greeting = format(m.greeting, values);

  useEffect(() => {
    if (!isSelected) {
      petRef.current?.hush();
      return;
    }
    petRef.current?.say(greeting, { duration: Infinity });
  }, [isSelected, greeting]);

  function handleClick() {
    play("click");
    onSelect(pet.id);
    petRef.current?.say(greeting, { duration: Infinity });
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center sm:max-w-52">
      <PixelChevron
        className={
          isSelected
            ? "rotate-90 text-brand-yellow motion-safe:animate-cursor-blink"
            : "invisible rotate-90"
        }
      />

      <div className="relative h-35 w-full">
        <span
          aria-hidden="true"
          data-selected={isSelected}
          style={{ "--pet-color": pet.color } as CSSProperties}
          className="pointer-events-none absolute bottom-[-10px] left-1/2 h-6 w-20 -translate-x-1/2 rounded-[100%] border border-transparent bg-black/55 transition-[border-color,box-shadow] duration-300 data-[selected=true]:[border-color:var(--pet-color)] data-[selected=true]:shadow-[0_-5px_22px_5px_color-mix(in_oklab,var(--pet-color)_30%,transparent)] sm:w-24"
        />

        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2"
          style={{ width: PET_STAGE_WIDTH }}
        >
          <PixelPet
            ref={petRef}
            petName={pet.name}
            color={pet.color}
            mode="showcase"
            label={format(m.label, values)}
            onClick={handleClick}
            messages={{ greeting }}
            dialogStyle={{ borderRadius: "5px" }}
            {...(pet.variant ? { variant: pet.variant } : {})}
            {...(pet.spriteSrc ? { spriteSrc: pet.spriteSrc } : {})}
          />
        </div>
      </div>
    </div>
  );
}
