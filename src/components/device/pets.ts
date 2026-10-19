import type { PetVariant } from "@vrixton/pixel-pet";

export type Pet = {
  id: string;
  name: string;
  color: string;
  variant?: PetVariant | undefined;
  spriteSrc?: string | undefined;
};

export const PETS: Pet[] = [
  { id: "robot", name: "V-BOT", color: "#197788", spriteSrc: "/pets/robot-sprite.png" },
  { id: "cat", name: "Static", color: "#FDDBA0", variant: "cat" },
  { id: "hamster", name: "Lion", color: "#d4bd0e", variant: "hamster" },
];

export const DEFAULT_PET_ID = "robot";
