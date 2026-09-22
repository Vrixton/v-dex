/**
 * Máquina de estados del dispositivo V-DEX.
 *
 * El ciclo siempre es el mismo: se cierra, se cambia lo que hay dentro,
 * se abre. Modelarlo como estados explícitos (y no como timeouts encadenados)
 * garantiza tres cosas:
 *
 * 1. Los clics durante la animación se ignoran solos: solo la fase "open"
 *    acepta peticiones nuevas.
 * 2. El dispositivo no se abre hasta que el contenido está listo, así que
 *    nunca se ve una vista a medio cargar.
 * 3. Todo esto se puede probar sin navegador ni DOM.
 *
 * Este archivo es lógica pura: sin React, sin efectos, sin temporizadores.
 */

/** Posición de los paneles. */
export type ShutterPhase = "open" | "closing" | "closed" | "opening";

/** Qué debe pasar mientras el dispositivo está cerrado. */
export type DeviceIntent = { type: "toggle-menu" } | { type: "navigate"; href: string };

export type DeviceState = {
  phase: ShutterPhase;
  /** Acción pendiente de aplicar en el centro del ciclo. */
  intent: DeviceIntent | null;
  isMenuOpen: boolean;
};

export type DeviceEvent =
  /** El usuario pulsó el botón central. */
  | { type: "REQUEST_MENU_TOGGLE" }
  /** El usuario eligió una opción del menú. */
  | { type: "REQUEST_NAVIGATION"; href: string }
  /** Terminó la animación de cierre. */
  | { type: "CLOSE_FINISHED" }
  /** La vista nueva ya está renderizada. */
  | { type: "CONTENT_READY" }
  /** Terminó la animación de apertura. */
  | { type: "OPEN_FINISHED" };

export const initialDeviceState: DeviceState = {
  phase: "open",
  intent: null,
  isMenuOpen: false,
};

export function deviceReducer(state: DeviceState, event: DeviceEvent): DeviceState {
  switch (event.type) {
    // Solo se aceptan peticiones con el dispositivo abierto. Cualquier
    // pulsación durante la animación se descarta sin lógica defensiva extra.
    case "REQUEST_MENU_TOGGLE":
      if (state.phase !== "open") return state;
      return { ...state, phase: "closing", intent: { type: "toggle-menu" } };

    case "REQUEST_NAVIGATION":
      if (state.phase !== "open") return state;
      return { ...state, phase: "closing", intent: { type: "navigate", href: event.href } };

    // El dispositivo está cerrado: es el momento de cambiar el contenido.
    // El menú se resuelve aquí; la navegación la dispara el provider y se
    // confirma después con CONTENT_READY.
    case "CLOSE_FINISHED": {
      if (state.phase !== "closing") return state;
      const isMenuOpen =
        state.intent?.type === "toggle-menu" ? !state.isMenuOpen : state.isMenuOpen;
      return { ...state, phase: "closed", isMenuOpen };
    }

    case "CONTENT_READY":
      if (state.phase !== "closed") return state;
      return { ...state, phase: "opening", intent: null };

    case "OPEN_FINISHED":
      if (state.phase !== "opening") return state;
      return { ...state, phase: "open" };

    default:
      return state;
  }
}

/** true mientras el dispositivo está en movimiento o esperando contenido. */
export function isBusy(phase: ShutterPhase): boolean {
  return phase !== "open";
}

/** Posición visual de los paneles para una fase dada. */
export function shutterPosition(phase: ShutterPhase): "open" | "closed" {
  return phase === "open" || phase === "opening" ? "open" : "closed";
}
