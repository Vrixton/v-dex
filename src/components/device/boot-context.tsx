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

import {
  petCookie,
  readPetId,
  resolvePhase,
  type BootPhase,
  type BootProgress,
} from "./boot-rules";

export const POWER_ON_MS = 940;

type BootContextValue = {
  phase: BootPhase;
  petId: string | null;
  powerOn: () => void;
  completeBoot: (petId: string) => void;
  completeTour: () => void;
};

const BootContext = createContext<BootContextValue | null>(null);

function subscribe(): () => void {
  return () => {};
}

function getBootSnapshot(): boolean {
  return document.documentElement.dataset.boot === "pending";
}

function getBootServerSnapshot(): boolean {
  return false;
}

function getPetSnapshot(): string | null {
  return readPetId(document.cookie);
}

function getPetServerSnapshot(): string | null {
  return null;
}

export function BootProvider({ children }: { children: ReactNode }) {
  const isFirstVisit = useSyncExternalStore(subscribe, getBootSnapshot, getBootServerSnapshot);
  const storedPetId = useSyncExternalStore(subscribe, getPetSnapshot, getPetServerSnapshot);
  const [progress, setProgress] = useState<BootProgress>("idle");
  const [chosenPetId, setChosenPetId] = useState<string | null>(null);

  const phase = resolvePhase(progress, isFirstVisit);
  const petId = chosenPetId ?? storedPetId;

  useEffect(() => {
    if (phase !== "powering") return;
    const timer = window.setTimeout(() => setProgress("welcome"), POWER_ON_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const powerOn = useCallback(() => {
    delete document.documentElement.dataset.boot;
    setProgress("powering");
  }, []);

  const completeBoot = useCallback((id: string) => {
    document.cookie = petCookie(id);
    setChosenPetId(id);
    setProgress("tour");
  }, []);

  const completeTour = useCallback(() => setProgress("done"), []);

  const value = useMemo(
    () => ({ phase, petId, powerOn, completeBoot, completeTour }),
    [phase, petId, powerOn, completeBoot, completeTour],
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
