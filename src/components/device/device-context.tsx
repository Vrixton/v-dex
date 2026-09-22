"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

import {
  deviceReducer,
  initialDeviceState,
  isBusy,
  shutterPosition,
  type ShutterPhase,
} from "./device-machine";

/** Duración de cada mitad del ciclo (cerrar y abrir). Única fuente de verdad. */
export const SHUTTER_MS = 260;
/** Pausa mínima con el dispositivo cerrado, para que el loader se perciba. */
export const DWELL_MS = 160;

type DeviceContextValue = {
  phase: ShutterPhase;
  isMenuOpen: boolean;
  isBusy: boolean;
  shutterPosition: "open" | "closed";
  toggleMenu: () => void;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(deviceReducer, initialDeviceState);
  const prefersReducedMotion = useReducedMotion();

  const duration = prefersReducedMotion ? 0 : SHUTTER_MS;
  const dwell = prefersReducedMotion ? 0 : DWELL_MS;

  // El CSS lee la duración desde aquí, así el tiempo de la animación y el de
  // la máquina no pueden desincronizarse.
  useEffect(() => {
    document.documentElement.style.setProperty("--shutter-duration", `${duration}ms`);
  }, [duration]);

  // Avance del ciclo. Cada fase sabe cuándo termina.
  useEffect(() => {
    if (state.phase === "open") return;

    const delay =
      state.phase === "closed" ? dwell : state.phase === "closing" ? duration : duration;

    const event =
      state.phase === "closing"
        ? ("CLOSE_FINISHED" as const)
        : state.phase === "closed"
          ? ("CONTENT_READY" as const)
          : ("OPEN_FINISHED" as const);

    const timer = window.setTimeout(() => dispatch({ type: event }), delay);
    return () => window.clearTimeout(timer);
  }, [state.phase, duration, dwell]);

  const toggleMenu = useCallback(() => dispatch({ type: "REQUEST_MENU_TOGGLE" }), []);

  const value = useMemo(
    () => ({
      phase: state.phase,
      isMenuOpen: state.isMenuOpen,
      isBusy: isBusy(state.phase),
      shutterPosition: shutterPosition(state.phase),
      toggleMenu,
    }),
    [state.phase, state.isMenuOpen, toggleMenu],
  );

  return <DeviceContext value={value}>{children}</DeviceContext>;
}

export function useDevice(): DeviceContextValue {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice debe usarse dentro de <DeviceProvider>");
  }
  return context;
}
