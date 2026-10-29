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

import type { RestAt } from "@vrixton/pixel-pet";

import {
  petCookie,
  readPetId,
  readRestingAt,
  resolvePhase,
  restCookie,
  type BootPhase,
  type BootProgress,
} from "./boot-rules";

export const POWER_ON_MS = 940;

type BootContextValue = {
  phase: BootPhase;
  petId: string | null;
  resting: RestAt | null;
  powerOn: () => void;
  completeBoot: (petId: string) => void;
  completeTour: () => void;
  replayTour: () => void;
  setResting: (at: RestAt | null) => void;
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

function getRestingSnapshot(): RestAt | null {
  return readRestingAt(document.cookie);
}

function getRestingServerSnapshot(): RestAt | null {
  return null;
}

export function BootProvider({ children }: { children: ReactNode }) {
  const isFirstVisit = useSyncExternalStore(subscribe, getBootSnapshot, getBootServerSnapshot);
  const storedPetId = useSyncExternalStore(subscribe, getPetSnapshot, getPetServerSnapshot);
  const [progress, setProgress] = useState<BootProgress>("idle");
  const [chosenPetId, setChosenPetId] = useState<string | null>(null);
  const storedResting = useSyncExternalStore(
    subscribe,
    getRestingSnapshot,
    getRestingServerSnapshot,
  );
  const [chosenResting, setChosenResting] = useState<RestAt | null | undefined>(undefined);
  const phase = resolvePhase(progress, isFirstVisit);
  const petId = chosenPetId ?? storedPetId;
  const resting = chosenResting === undefined ? storedResting : chosenResting;

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

  const replayTour = useCallback(() => setProgress("tour"), []);

  const setResting = useCallback((at: RestAt | null) => {
    document.cookie = restCookie(at);
    setChosenResting(at);
  }, []);

  const value = useMemo(
    () => ({ phase, petId, resting, powerOn, completeBoot, completeTour, replayTour, setResting }),
    [phase, petId, resting, powerOn, completeBoot, completeTour, replayTour, setResting],
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
