import { DEFAULT_PET } from "./pets";

export type BootPhase = "closed" | "powering" | "welcome" | "done";

export type BootProgress = "idle" | "powering" | "welcome" | "done";

export const BOOT_COOKIE = "vdex-pet";

const PET_COOKIE_PATTERN = new RegExp(`(?:^|;\\s*)${BOOT_COOKIE}=([^;]*)`);

export function resolvePhase(progress: BootProgress, isFirstVisit: boolean): BootPhase {
  if (progress !== "idle") return progress;
  return isFirstVisit ? "closed" : "done";
}

export function readPetId(cookie: string): string {
  const match = PET_COOKIE_PATTERN.exec(cookie);
  return match?.[1] ? decodeURIComponent(match[1]) : DEFAULT_PET.id;
}

export function petCookie(petId: string): string {
  return `${BOOT_COOKIE}=${encodeURIComponent(petId)}; path=/; max-age=31536000; samesite=lax`;
}
