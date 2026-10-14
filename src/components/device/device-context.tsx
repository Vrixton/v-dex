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

export const SHUTTER_MS = 260;
export const CONFIRM_MS = 420;
export const DWELL_MS = 160;
export const SLOW_MS = 500;

type DeviceContextValue = {
  phase: ShutterPhase;
  isMenuOpen: boolean;
  isBusy: boolean;
  isContentVisible: boolean;
  isLoading: boolean;
  tone: "cyan" | "amber" | "red";
  shutterPosition: "open" | "closed";
  confirmingHref: string | null;
  toggleMenu: () => void;
  navigate: (href: string) => void;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(deviceReducer, initialDeviceState);
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pushedHref = useRef<string | null>(null);

  const duration = prefersReducedMotion ? 0 : SHUTTER_MS;
  const confirmDelay = prefersReducedMotion ? 0 : CONFIRM_MS;
  const dwell = prefersReducedMotion ? 0 : DWELL_MS;
  useEffect(() => {
    document.documentElement.style.setProperty("--shutter-duration", `${duration}ms`);
  }, [duration]);

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

  useEffect(() => {
    if (state.phase !== "closed") return;
    const intent = state.intent;
    if (intent?.type !== "navigate" || pushedHref.current === intent.href) return;

    pushedHref.current = intent.href;
    startTransition(() => router.push(intent.href));
  }, [state.phase, state.intent, router]);

  useEffect(() => {
    if (state.phase !== "closed" || isPending) return;
    const timer = window.setTimeout(() => dispatch({ type: "CONTENT_READY" }), dwell);
    return () => window.clearTimeout(timer);
  }, [state.phase, isPending, dwell]);

  useEffect(() => {
    if (state.phase === "open") pushedHref.current = null;
  }, [state.phase]);

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
