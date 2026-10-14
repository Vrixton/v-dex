export type ShutterPhase = "open" | "confirming" | "closing" | "closed" | "opening";

export type DeviceIntent = { type: "toggle-menu" } | { type: "navigate"; href: string };

export type DeviceState = {
  phase: ShutterPhase;
  intent: DeviceIntent | null;
  isMenuOpen: boolean;
  isSlow: boolean;
};

export type DeviceEvent =
  | { type: "REQUEST_MENU_TOGGLE" }
  | { type: "REQUEST_NAVIGATION"; href: string }
  | { type: "SLOW_THRESHOLD_REACHED" }
  | { type: "CONFIRM_FINISHED" }
  | { type: "CLOSE_FINISHED" }
  | { type: "CONTENT_READY" }
  | { type: "OPEN_FINISHED" };

export const initialDeviceState: DeviceState = {
  phase: "open",
  intent: null,
  isMenuOpen: false,
  isSlow: false,
};

export function deviceReducer(state: DeviceState, event: DeviceEvent): DeviceState {
  switch (event.type) {
    case "REQUEST_MENU_TOGGLE":
      if (state.phase !== "open") return state;
      return {
        ...state,
        phase: "closing",
        intent: { type: "toggle-menu" },
        isSlow: false,
      };

    case "REQUEST_NAVIGATION":
      if (state.phase !== "open") return state;
      return {
        ...state,
        phase: "confirming",
        intent: { type: "navigate", href: event.href },
        isSlow: false,
      };

    case "SLOW_THRESHOLD_REACHED":
      if (state.phase !== "closed") return state;
      return { ...state, isSlow: true };

    case "CONFIRM_FINISHED":
      if (state.phase !== "confirming") return state;
      return { ...state, phase: "closing" };

    case "CLOSE_FINISHED":
      if (state.phase !== "closing") return state;
      if (state.intent?.type === "navigate") {
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

export function isBusy(phase: ShutterPhase): boolean {
  return phase !== "open";
}

export function shutterPosition(phase: ShutterPhase): "open" | "closed" {
  return phase === "closing" || phase === "closed" ? "closed" : "open";
}

export function isContentVisible(phase: ShutterPhase): boolean {
  return phase === "open" || phase === "confirming" || phase === "closing";
}

export function isLoading(phase: ShutterPhase): boolean {
  return phase === "closing" || phase === "closed" || phase === "opening";
}

export function buttonTone(state: DeviceState): "cyan" | "amber" | "red" {
  if (isLoading(state.phase) || state.isSlow) return "amber";
  return state.isMenuOpen ? "red" : "cyan";
}

export function confirmingHref(state: DeviceState): string | null {
  if (state.phase !== "confirming") return null;
  return state.intent?.type === "navigate" ? state.intent.href : null;
}
