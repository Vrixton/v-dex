/**
 * Validación del formulario de contacto.
 *
 * Vive aparte porque la usan los dos lados: el navegador, para avisar antes
 * de enviar, y el servidor, que es donde de verdad importa. Nunca hay que
 * fiarse de la validación del cliente: cualquiera puede saltársela llamando
 * a la API directamente.
 *
 * Sin librería de esquemas: son tres campos y las reglas caben en veinte
 * líneas, así que añadir una dependencia no compensa.
 */

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  /** Campo trampa: los humanos no lo ven, los bots lo rellenan. */
  website?: string;
  /** Marca de tiempo de carga del formulario, para descartar envíos instantáneos. */
  startedAt?: number;
};

export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

export const LIMITS = {
  name: { min: 2, max: 60 },
  message: { min: 10, max: 2000 },
} as const;

/** Suficiente para descartar erratas obvias sin rechazar direcciones válidas. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (name.length < LIMITS.name.min) {
    errors.name = "TOO SHORT";
  } else if (name.length > LIMITS.name.max) {
    errors.name = "TOO LONG";
  }

  if (!EMAIL.test(email)) {
    errors.email = "INVALID ADDRESS";
  }

  if (message.length < LIMITS.message.min) {
    errors.message = "TOO SHORT";
  } else if (message.length > LIMITS.message.max) {
    errors.message = "TOO LONG";
  }

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Señales de envío automático: el campo trampa relleno o un envío demasiado
 * rápido para haber sido escrito por una persona.
 */
export function looksLikeSpam(input: ContactInput, now: number = Date.now()): boolean {
  if (input.website) return true;
  if (input.startedAt && now - input.startedAt < 3000) return true;
  return false;
}
