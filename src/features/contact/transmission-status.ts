/**
 * Estado de la transmisión, compartido por la consola y el formulario.
 *
 * Vive en un archivo aparte para que los dos componentes lo importen sin
 * depender uno del otro: el tipo es de ambos, no de ninguno.
 */
export type TransmissionStatus = "idle" | "sending" | "sent" | "failed" | "limited";

/** Lo que escribe la consola en cada estado. */
export const TRANSMISSION_MESSAGES: Record<TransmissionStatus, string> = {
  idle: "Awaiting your message...",
  sending: "Transmitting...",
  sent: "Message received. I'll get back to you soon.",
  failed: "Transmission failed. Try the main channel.",
  limited: "Channel saturated. Try again tomorrow.",
};
