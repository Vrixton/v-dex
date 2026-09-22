"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** En el servidor asumimos que sí hay movimiento; el cliente corrige al hidratar. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * true si el usuario pidió reducir el movimiento en su sistema.
 * useSyncExternalStore evita desajustes de hidratación y reacciona si el
 * usuario cambia la preferencia con la página abierta.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
