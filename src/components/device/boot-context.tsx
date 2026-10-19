"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const POWER_ON_MS = 940;

export type BootPhase = "closed" | "powering" | "welcome" | "done";

type BootProgress = "idle" | "powering" | "welcome" | "done";

type BootContextValue = {
  phase: BootPhase;
  isBooting: boolean;
  powerOn: () => void;
  completeBoot: (petId: string) => void;
};

const BootContext = createContext<BootContextValue | null>(null);

function subscribe(): () => void {
  return () => {};
}

function getSnapshot(): boolean {
  return document.documentElement.dataset.boot === "pending";
}

function getServerSnapshot(): boolean {
  return false;
}

function resolvePhase(progress: BootProgress, isFirstVisit: boolean): BootPhase {
  if (progress !== "idle") return progress;
  return isFirstVisit ? "closed" : "done";
}

export function BootProvider({ children }: { children: ReactNode }) {
  const isFirstVisit = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [progress, setProgress] = useState<BootProgress>("idle");

  const phase = resolvePhase(progress, isFirstVisit);

  useEffect(() => {
    if (phase !== "powering") return;
    const timer = window.setTimeout(() => setProgress("welcome"), POWER_ON_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const powerOn = useCallback(() => setProgress("powering"), []);

  const completeBoot = useCallback((petId: string) => {
    document.cookie = `vdex-pet=${petId}; path=/; max-age=31536000; samesite=lax`;
    delete document.documentElement.dataset.boot;
    setProgress("done");
  }, []);

  const value = useMemo(
    () => ({ phase, isBooting: phase !== "done", powerOn, completeBoot }),
    [phase, powerOn, completeBoot],
  );

  return <BootContext value={value}>{children}</BootContext>;
}

export function useBoot(): BootContextValue {
  const context = useContext(BootContext);
  if (!context) {
    throw new Error("useBoot must be used inside <BootProvider>");
  }
  return context;
}
