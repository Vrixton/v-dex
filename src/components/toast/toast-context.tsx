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

export const TOAST_POSITION: ToastPosition = "bottom-left";

export type ToastInput = {
  label: string;
  value: string;
  tone?: ToastTone;
  icon?: ReactNode;
  duration?: number;
  key?: string;
};

export type Toast = Required<Omit<ToastInput, "icon">> & {
  id: number;
  icon: ReactNode | null;
};

export const TOAST_DURATION = 1800;
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
    throw new Error("useToast must be used within <ToastProvider>");
  }
  return context.toast;
}

export function useToastQueue(): { toasts: Toast[]; dismiss: (id: number) => void } {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastQueue must be used within <ToastProvider>");
  }
  return { toasts: context.toasts, dismiss: context.dismiss };
}
