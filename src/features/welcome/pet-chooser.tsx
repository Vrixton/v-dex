"use client";

import { PixelPet } from "@vrixton/pixel-pet";

import { PETS } from "@/components/device/pets";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { format } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-provider";

export function PetChooser({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const m = useMessages().device.pet;

  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {PETS.map((pet) => {
        const values = { name: pet.name };
        const isSelected = pet.id === selectedId;

        return (
          <div
            key={pet.id}
            data-selected={isSelected}
            className="flex flex-col rounded-window border border-white/10 bg-surface-hover/40 transition-colors data-[selected=true]:border-brand-cyan/60"
          >
            <div className="relative h-40 w-full">
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

            <label className="w-full cursor-pointer">
              <input
                type="radio"
                name="pet"
                value={pet.id}
                checked={isSelected}
                onChange={() => onSelect(pet.id)}
                className="peer sr-only"
              />
              <span className="flex items-center justify-center gap-3 border-t border-white/10 px-4 py-3 text-sm tracking-widest text-fg/70 uppercase peer-checked:text-brand-cyan peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-yellow">
                <PixelChevron className="text-brand-yellow opacity-0 peer-checked:opacity-100" />
                {pet.name}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
