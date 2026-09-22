/**
 * Máquina de estados del dispositivo V-DEX.
 *
 * El ciclo completo es: se confirma la elección, se cierra, se cambia lo que
 * hay dentro, se abre. Modelarlo como estados explícitos (y no como timeouts
 * encadenados) garantiza tres cosas:
 *
 * 1. Los clics durante el ciclo se ignoran solos: solo la fase "open" acepta
 *    peticiones nuevas.
 * 2. El dispositivo no se abre hasta que el contenido está listo, así que
 *    nunca se ve una vista a medio cargar.
 * 3. Todo esto se puede probar sin navegador ni DOM.
 *
 * Este archivo es lógica pura: sin React, sin efectos, sin temporizadores.
 */

/** Fases del ciclo. "confirming" es el parpadeo del ítem elegido. */
export type ShutterPhase = "open" | "confirming" | "closing" | "closed" | "opening";

/** Qué debe pasar mientras el dispositivo está cerrado. */
export type DeviceIntent = { type: "toggle-menu" } | { type: "navigate"; href: string };

export type DeviceState = {
  phase: ShutterPhase;
  /** Acción pendiente de aplicar en el centro del ciclo. */
  intent: DeviceIntent | null;
  isMenuOpen: boolean;
  /** La espera por el contenido nuevo se está alargando. */
  isSlow: boolean;
};

export type DeviceEvent =
  /** El usuario pulsó el botón central. */
  | { type: "REQUEST_MENU_TOGGLE" }
  /** El usuario eligió una opción del menú. */
  | { type: "REQUEST_NAVIGATION"; href: string }
  /** La espera con el dispositivo cerrado superó el umbral. */
  | { type: "SLOW_THRESHOLD_REACHED" }
  /** Terminó el parpadeo de confirmación. */
  | { type: "CONFIRM_FINISHED" }
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
  isSlow: false,
};

export function deviceReducer(state: DeviceState, event: DeviceEvent): DeviceState {
  switch (event.type) {
    // Solo se aceptan peticiones con el dispositivo abierto. Cualquier
    // pulsación durante el ciclo se descarta sin lógica defensiva extra.
    case "REQUEST_MENU_TOGGLE":
      if (state.phase !== "open") return state;
      return {
        ...state,
        phase: "closing",
        intent: { type: "toggle-menu" },
        isSlow: false,
      };

    // Navegar pasa antes por el parpadeo del ítem elegido.
    case "REQUEST_NAVIGATION":
      if (state.phase !== "open") return state;
      return {
        ...state,
        phase: "confirming",
        intent: { type: "navigate", href: event.href },
        isSlow: false,
      };

    // Solo cuenta estando cerrado, que es cuando de verdad se espera por
    // el contenido. El resto del ciclo tiene una duración fija conocida.
    case "SLOW_THRESHOLD_REACHED":
      if (state.phase !== "closed") return state;
      return { ...state, isSlow: true };

    case "CONFIRM_FINISHED":
      if (state.phase !== "confirming") return state;
      return { ...state, phase: "closing" };

    // El dispositivo está cerrado: es el momento de cambiar el contenido.
    // El menú se resuelve aquí; la navegación la dispara el provider y se
    // confirma después con CONTENT_READY.
    case "CLOSE_FINISHED":
      if (state.phase !== "closing") return state;
      if (state.intent?.type === "navigate") {
        // Al entrar en una vista, el menú siempre queda cerrado
        return { ...state, phase: "closed", isMenuOpen: false };
      }
      return { ...state, phase: "closed", isMenuOpen: !state.isMenuOpen };

    case "CONTENT_READY":
      if (state.phase !== "closed") return state;
      return { ...state, phase: "opening", intent: null };

    case "OPEN_FINISHED":
      if (state.phase !== "opening") return state;
      return { ...state, phase: "open", isSlow: false };

    default:
      return state;
  }
}

/** true mientras el dispositivo está en movimiento o esperando contenido. */
export function isBusy(phase: ShutterPhase): boolean {
  return phase !== "open";
}

/** Posición visual de los paneles. Durante el parpadeo siguen abiertos. */
export function shutterPosition(phase: ShutterPhase): "open" | "closed" {
  return phase === "closing" || phase === "closed" ? "closed" : "open";
}

/**
 * ¿Se ve el contenido? Sigue visible durante el parpadeo y el cierre (las
 * láminas lo van tapando); solo se oculta cuando ya está tapado del todo,
 * que es cuando se cambia por el contenido nuevo.
 */
export function isContentVisible(phase: ShutterPhase): boolean {
  return phase === "open" || phase === "confirming" || phase === "closing";
}

/** El botón muestra el loader solo mientras el dispositivo está en el ciclo. */
export function isLoading(phase: ShutterPhase): boolean {
  return phase === "closing" || phase === "closed" || phase === "opening";
}

/**
 * Color del botón central. Tres estados legibles de un vistazo:
 * cian en reposo, ámbar cuando la espera se alarga y rojo con el menú
 * abierto. El ámbar solo aparece si de verdad hubo que esperar, así el
 * color significa algo en vez de ser decoración.
 */

export function buttonTone(state: DeviceState): "cyan" | "amber" | "red" {
  if (isLoading(state.phase) || state.isSlow) return "amber";
  return state.isMenuOpen ? "red" : "cyan";
}

/** Ruta del ítem que está parpadeando, si lo hay. */
export function confirmingHref(state: DeviceState): string | null {
  if (state.phase !== "confirming") return null;
  return state.intent?.type === "navigate" ? state.intent.href : null;
}
