import type { PetVariant } from "@vrixton/pixel-pet";

export type Pet = {
  id: string;
  name: string;
  color: string;
  variant?: PetVariant | undefined;
  spriteSrc?: string | undefined;
  tourHappy: string;
  tourPoint: string;
  tourTalking: string;
};

export const DEFAULT_PET: Pet = {
  id: "robot",
  name: "V-BOT",
  color: "#00f0ff",
  spriteSrc: "/pets/robot/robot-sprite.png",
  tourHappy: "/pets/robot/robot-happy.png",
  tourPoint: "/pets/robot/robot-point.png",
  tourTalking: "/pets/robot/robot-talk.png",
};
const CAT_PET: Pet = {
  id: "cat",
  name: "Volt",
  color: "#FDDBA0",
  spriteSrc: "/pets/cat/cat-sprite.png",
  tourHappy: "/pets/cat/cat-happy.png",
  tourPoint: "/pets/cat/cat-point.png",
  tourTalking: "/pets/cat/cat-talk.png",
};

const ALIEN_PET: Pet = {
  id: "alien",
  name: "Vlorp",
  color: "#d0ff00",
  spriteSrc: "/pets/alien/alien-sprite.png",
  tourHappy: "/pets/alien/alien-happy.png",
  tourPoint: "/pets/alien/alien-point.png",
  tourTalking: "/pets/alien/alien-talk.png",
};

export const PETS: Pet[] = [CAT_PET, DEFAULT_PET, ALIEN_PET];

export function findPet(id: string): Pet {
  return PETS.find((pet) => pet.id === id) ?? DEFAULT_PET;
}
