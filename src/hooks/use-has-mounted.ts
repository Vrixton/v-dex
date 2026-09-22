"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false en el servidor y en el primer render; true tras hidratar.
 *
 * Se resuelve con useSyncExternalStore en vez de un useState + useEffect:
 * evita el render en cascada que provoca llamar a setState dentro de un
 * efecto, y no hay desajuste de hidratación.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
