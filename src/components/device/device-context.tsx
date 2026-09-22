"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useTransition,
  type ReactNode,
} from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

import {
  buttonTone,
  confirmingHref,
  deviceReducer,
  initialDeviceState,
  isBusy,
  isContentVisible,
  isLoading,
  shutterPosition,
  type ShutterPhase,
} from "./device-machine";

/** Duración de cada mitad del ciclo (cerrar y abrir). Única fuente de verdad. */
export const SHUTTER_MS = 260;
/** Dos parpadeos de 210 ms sobre el ítem elegido. */
export const CONFIRM_MS = 420;
/** Pausa mínima con el dispositivo cerrado, para que el loader se perciba. */
export const DWELL_MS = 160;
/**
 * Espera máxima "normal" con el dispositivo cerrado. Si el contenido tarda
 * más que esto, el botón pasa a ámbar. Con una navegación precargada nunca
 * se alcanza: solo aparece cuando de verdad hay que esperar.
 */
export const SLOW_MS = 500;

type DeviceContextValue = {
  phase: ShutterPhase;
  isMenuOpen: boolean;
  isBusy: boolean;
  /** El contenido sigue a la vista (no lo tapan aún las láminas). */
  isContentVisible: boolean;
  /** El botón central debe mostrar el loader. */
  isLoading: boolean;
  /** Color del botón central: cian, ámbar (esperando) o rojo (menú abierto). */
  tone: "cyan" | "amber" | "red";
  shutterPosition: "open" | "closed";
  /** Ruta del ítem que está parpadeando, si lo hay. */
  confirmingHref: string | null;
  toggleMenu: () => void;
  navigate: (href: string) => void;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(deviceReducer, initialDeviceState);
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  // isPending sigue activo hasta que la vista nueva está renderizada:
  // es nuestra señal de "contenido listo".
  const [isPending, startTransition] = useTransition();
  const pushedHref = useRef<string | null>(null);

  const duration = prefersReducedMotion ? 0 : SHUTTER_MS;
  const confirmDelay = prefersReducedMotion ? 0 : CONFIRM_MS;
  const dwell = prefersReducedMotion ? 0 : DWELL_MS;

  // El CSS lee la duración desde aquí, así el tiempo de la animación y el de
  // la máquina no pueden desincronizarse.
  useEffect(() => {
    document.documentElement.style.setProperty("--shutter-duration", `${duration}ms`);
  }, [duration]);

  // Fases con duración fija: parpadeo, cierre y apertura.
  useEffect(() => {
    const step =
      state.phase === "confirming"
        ? { event: "CONFIRM_FINISHED" as const, delay: confirmDelay }
        : state.phase === "closing"
          ? { event: "CLOSE_FINISHED" as const, delay: duration }
          : state.phase === "opening"
            ? { event: "OPEN_FINISHED" as const, delay: duration }
            : null;

    if (!step) return;

    const timer = window.setTimeout(() => dispatch({ type: step.event }), step.delay);
    return () => window.clearTimeout(timer);
  }, [state.phase, duration, confirmDelay]);

  // Con el dispositivo cerrado se lanza la navegación, una sola vez.
  useEffect(() => {
    if (state.phase !== "closed") return;
    const intent = state.intent;
    if (intent?.type !== "navigate" || pushedHref.current === intent.href) return;

    pushedHref.current = intent.href;
    startTransition(() => router.push(intent.href));
  }, [state.phase, state.intent, router]);

  // Y solo se abre cuando esa navegación terminó. Si la red va lenta, el
  // dispositivo se queda cerrado con el loader girando.
  useEffect(() => {
    if (state.phase !== "closed" || isPending) return;
    const timer = window.setTimeout(() => dispatch({ type: "CONTENT_READY" }), dwell);
    return () => window.clearTimeout(timer);
  }, [state.phase, isPending, dwell]);

  useEffect(() => {
    if (state.phase === "open") pushedHref.current = null;
  }, [state.phase]);

  // Si el contenido llega antes, el efecto se limpia y el aviso no ocurre.
  useEffect(() => {
    if (state.phase !== "closed") return;
    const timer = window.setTimeout(() => dispatch({ type: "SLOW_THRESHOLD_REACHED" }), SLOW_MS);
    return () => window.clearTimeout(timer);
  }, [state.phase]);

  const toggleMenu = useCallback(() => dispatch({ type: "REQUEST_MENU_TOGGLE" }), []);
  const navigate = useCallback(
    (href: string) => dispatch({ type: "REQUEST_NAVIGATION", href }),
    [],
  );

  const value = useMemo(
    () => ({
      phase: state.phase,
      isMenuOpen: state.isMenuOpen,
      isBusy: isBusy(state.phase),
      isContentVisible: isContentVisible(state.phase),
      isLoading: isLoading(state.phase),
      tone: buttonTone(state),
      shutterPosition: shutterPosition(state.phase),
      confirmingHref: confirmingHref(state),
      toggleMenu,
      navigate,
    }),
    [state, toggleMenu, navigate],
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
