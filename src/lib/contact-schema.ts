import type { Messages } from "@/i18n/messages";

export type ContactField = "name" | "email" | "message";

export type ContactErrorCode = keyof Messages["contact"]["form"]["errors"];

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  website?: string;
  startedAt?: number;
};

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export const LIMITS = {
  name: { min: 2, max: 60 },
  message: { min: 10, max: 2000 },
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (name.length < LIMITS.name.min) {
    errors.name = "tooShort";
  } else if (name.length > LIMITS.name.max) {
    errors.name = "tooLong";
  }

  if (!EMAIL.test(email)) {
    errors.email = "invalidEmail";
  }

  if (message.length < LIMITS.message.min) {
    errors.message = "tooShort";
  } else if (message.length > LIMITS.message.max) {
    errors.message = "tooLong";
  }

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function looksLikeSpam(input: ContactInput, now: number = Date.now()): boolean {
  if (input.website) return true;
  if (input.startedAt && now - input.startedAt < 3000) return true;
  return false;
}
