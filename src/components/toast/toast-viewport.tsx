"use client";

import { useEffect, useState } from "react";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { cn } from "@/lib/cn";
import {
  TOAST_POSITION,
  useToastQueue,
  type Toast,
  type ToastPosition,
  type ToastTone,
} from "./toast-context";

const EXIT_MS = 180;

const positionClass: Record<ToastPosition, string> = {
  "top-left": "top-(--screen-inset-top) left-0 items-start flex-col",
  "top-center": "top-(--screen-inset-top) inset-x-0 items-center flex-col",
  "top-right": "top-(--screen-inset-top) right-0 items-end flex-col",
  center: "inset-0 items-center justify-center flex-col",
  "bottom-left": "bottom-(--screen-inset-bottom) left-0 items-start flex-col-reverse",
  "bottom-center": "bottom-(--screen-inset-bottom) inset-x-0 items-center flex-col-reverse",
  "bottom-right": "bottom-(--screen-inset-bottom) right-0 items-end flex-col-reverse",
};

function enterFrom(position: ToastPosition): "top" | "bottom" {
  return position.startsWith("bottom") ? "bottom" : "top";
}

const toneClass: Record<ToastTone, string> = {
  info: "text-brand-cyan",
  success: "text-status-ok",
  error: "text-fg-danger",
  warning: "text-brand-yellow",
  muted: "text-fg-muted",
};

export function ToastViewport({ position = TOAST_POSITION }: { position?: ToastPosition }) {
  const { toasts, dismiss } = useToastQueue();

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed z-[9] flex gap-2 px-4 py-2 md:px-8",
        positionClass[position],
      )}
    >
      {toasts.map((toast) => (
        <ToastCard
          key={toast.id}
          toast={toast}
          from={enterFrom(position)}
          onDismiss={() => dismiss(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastCard({
  toast,
  from,
  onDismiss,
}: {
  toast: Toast;
  from: "top" | "bottom";
  onDismiss: () => void;
}) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leave = window.setTimeout(() => setIsLeaving(true), toast.duration);
    const remove = window.setTimeout(onDismiss, toast.duration + EXIT_MS);

    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(remove);
    };
  }, [toast.duration, onDismiss]);

  return (
    <div
      data-leaving={isLeaving}
      className={cn(
        "relative flex items-center gap-3 overflow-hidden rounded-control border border-current/40 bg-screen/80 px-4 py-2 backdrop-blur-sm",
        from === "top"
          ? "motion-safe:animate-toast-in data-[leaving=true]:motion-safe:animate-toast-out"
          : "motion-safe:animate-toast-in-up data-[leaving=true]:motion-safe:animate-toast-out-down",
        "data-[leaving=true]:opacity-0 motion-reduce:transition-none",
        toneClass[toast.tone],
      )}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-current opacity-30" />

      <BracketFrame size="sm" />

      <span className="relative flex items-center gap-3 motion-safe:animate-toast-content">
        {toast.icon}
        <p className="text-sm md:text-base">
          <span className="text-fg">{`[${toast.label}]:`}</span> <span>{toast.value}</span>
        </p>
      </span>
    </div>
  );
}
