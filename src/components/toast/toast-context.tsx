"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ToastTone = "info" | "success" | "error" | "warning" | "muted";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Dónde aparecen los avisos. Cámbialo aquí y se aplica a todos.
 *
 * Cuando la mascota ocupe el borde inferior, "top-center" vuelve a ser la
 * mejor opción: es la única zona de la pantalla que nadie más usa.
 */
export const TOAST_POSITION: ToastPosition = "bottom-left";

export type ToastInput = {
  /** Texto entre corchetes, en mayúsculas: SOUND, EMAIL, MESSAGE_STATUS… */
  label: string;
  /** Estado o resultado: ON, COPIED, SENT, ERROR… */
  value: string;
  tone?: ToastTone;
  icon?: ReactNode;
  /** Milisegundos en pantalla. */
  duration?: number;
  /**
   * Avisos con la misma clave se reemplazan en vez de apilarse. Por defecto
   * es la etiqueta, así que pulsar cinco veces el interruptor deja un solo
   * aviso, no cinco.
   */
  key?: string;
};

export type Toast = Required<Omit<ToastInput, "icon">> & {
  id: number;
  icon: ReactNode | null;
};

/** Tiempo en pantalla: suficiente para leerlo, corto para no estorbar. */
export const TOAST_DURATION = 1800;
/** Más de tres a la vez es ruido; los viejos se descartan. */
const MAX_VISIBLE = 3;

type ToastContextValue = {
  toasts: Toast[];
  toast: (input: ToastInput) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((input: ToastInput) => {
    const entry: Toast = {
      id: (nextId += 1),
      label: input.label,
      value: input.value,
      tone: input.tone ?? "info",
      icon: input.icon ?? null,
      duration: input.duration ?? TOAST_DURATION,
      key: input.key ?? input.label,
    };

    setToasts((current) =>
      [...current.filter((item) => item.key !== entry.key), entry].slice(-MAX_VISIBLE),
    );
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(() => ({ toasts, toast, dismiss }), [toasts, toast, dismiss]);

  return <ToastContext value={value}>{children}</ToastContext>;
}

export function useToast(): (input: ToastInput) => void {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de <ToastProvider>");
  }
  return context.toast;
}

export function useToastQueue(): { toasts: Toast[]; dismiss: (id: number) => void } {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastQueue debe usarse dentro de <ToastProvider>");
  }
  return { toasts: context.toasts, dismiss: context.dismiss };
}
