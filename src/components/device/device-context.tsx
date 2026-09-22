"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type DeviceContextValue = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

/**
 * Estado global del dispositivo V-DEX.
 *
 * De momento solo guarda si el menú está abierto. En el siguiente paso su
 * interior se reemplaza por la máquina de estados del cierre y la apertura,
 * pero la API pública (useDevice) se mantiene, así ningún consumidor cambia.
 */
export function DeviceProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((open) => !open);
  }, []);

  const value = useMemo(() => ({ isMenuOpen, toggleMenu }), [isMenuOpen, toggleMenu]);

  return <DeviceContext value={value}>{children}</DeviceContext>;
}

export function useDevice(): DeviceContextValue {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice debe usarse dentro de <DeviceProvider>");
  }
  return context;
}
