import { DEFAULT_PET } from "./pets";
import type { RestAt } from "@vrixton/pixel-pet";

export type BootPhase = "closed" | "powering" | "welcome" | "tour" | "done";

export type BootProgress = "idle" | "powering" | "welcome" | "tour" | "done";

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

export const REST_COOKIE = "vdex-pet-rest";

const REST_COOKIE_PATTERN = new RegExp(`(?:^|;\\s*)${REST_COOKIE}=([^;]*)`);

const REST_POSITIONS: readonly RestAt[] = ["left", "center", "right"];

export function readRestingAt(cookie: string): RestAt | null {
  const match = REST_COOKIE_PATTERN.exec(cookie);
  const value = match?.[1] ? decodeURIComponent(match[1]) : "";
  return REST_POSITIONS.find((position) => position === value) ?? null;
}

export function restCookie(at: RestAt | null): string {
  if (at === null) return `${REST_COOKIE}=; path=/; max-age=0; samesite=lax`;
  return `${REST_COOKIE}=${at}; path=/; max-age=31536000; samesite=lax`;
}
