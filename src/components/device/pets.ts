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

export const PETS: Pet[] = [
  { id: "cat", name: "Static", color: "#FDDBA0", variant: "cat" },
  DEFAULT_PET,
  { id: "hamster", name: "Neo", color: "#ffa42d", variant: "hamster" },
];
export function findPet(id: string): Pet {
  return PETS.find((pet) => pet.id === id) ?? DEFAULT_PET;
}
