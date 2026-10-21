import type { PetVariant } from "@vrixton/pixel-pet";

export type Pet = {
  id: string;
  name: string;
  color: string;
  variant?: PetVariant | undefined;
  spriteSrc?: string | undefined;
};

export const DEFAULT_PET: Pet = {
  id: "robot",
  name: "V-BOT",
  color: "#00f0ff",
  spriteSrc: "/pets/robot-sprite.png",
};
const CAT_PET: Pet = {
  id: "cat",
  name: "Volt",
  color: "#FDDBA0",
  spriteSrc: "/pets/cat-sprite.png",
};

const ALIEN_PET: Pet = {
  id: "alien",
  name: "Vlorp",
  color: "#d0ff00",
  spriteSrc: "/pets/alien-sprite.png",
};

export const PETS: Pet[] = [CAT_PET, DEFAULT_PET, ALIEN_PET];

export function findPet(id: string): Pet {
  return PETS.find((pet) => pet.id === id) ?? DEFAULT_PET;
}
