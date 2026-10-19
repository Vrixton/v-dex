"use client";

import { PixelPet } from "@vrixton/pixel-pet";
import type { MouseEvent } from "react";
import type { CSSProperties } from "react";
import { PETS } from "@/components/device/pets";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";

import { useSound } from "@/components/sound/use-sound";

const PET_CELL_WIDTH = "260px";

export function PetChooser({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const m = useMessages().device.pet;
  const play = useSound();

  return (
    <div className="flex flex-wrap items-end justify-center">
      {PETS.map((pet) => {
        const values = { name: pet.name };
        const isSelected = pet.id === selectedId;

        function handleClick(event: MouseEvent<HTMLButtonElement>) {
          event.preventDefault();
          play("click");
          onSelect(pet.id);
        }

        return (
          <div key={pet.id} className="flex flex-col items-center">
            <PixelChevron
              className={
                isSelected
                  ? "rotate-90 text-brand-yellow motion-safe:animate-cursor-blink"
                  : "invisible rotate-90"
              }
            />

            <div className="relative h-25" style={{ width: PET_CELL_WIDTH }}>
              <span
                aria-hidden="true"
                data-selected={isSelected}
                style={{ "--pet-color": pet.color } as CSSProperties}
                className="absolute bottom-[-10px] left-1/2 h-6 w-24 -translate-x-1/2 rounded-[100%] border border-transparent bg-black/55 transition-[border-color,box-shadow] duration-300 data-[selected=true]:[border-color:var(--pet-color)] data-[selected=true]:shadow-[0_-5px_22px_5px_color-mix(in_oklab,var(--pet-color)_30%,transparent)]"
              />

              <PixelPet
                petName={pet.name}
                color={pet.color}
                walk={false}
                label={format(m.label, values)}
                onClick={handleClick}
                messages={{
                  happy: format(m.happy, values),
                  angry: format(m.overwhelmed, values),
                  curious: format(m.curious, values),
                }}
                dialogStyle={{
                  borderRadius: "5px",
                }}
                {...(pet.variant ? { variant: pet.variant } : {})}
                {...(pet.spriteSrc ? { spriteSrc: pet.spriteSrc } : {})}
              />
            </div>

            <span
              className="mt-5 text-fg/40 transition-colors"
              style={isSelected ? { color: pet.color } : undefined}
            >
              {pet.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
