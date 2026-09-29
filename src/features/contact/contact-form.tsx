"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { useSound } from "@/components/sound/use-sound";
import { useToast } from "@/components/toast/toast-context";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { hasErrors, validateContact, type ContactErrors } from "@/lib/contact-schema";

import type { TransmissionStatus } from "./transmission-status";
import { Badge } from "@/components/ui/badge";

const FIELDS = [
  { name: "name", label: "NAME", placeholder: "Red", type: "text" },
  { name: "email", label: "EMAIL", placeholder: "example@example.com", type: "email" },
] as const;

export function ContactForm({
  onStatusChange,
}: {
  /** Avisa a la consola de estado en qué punto va la transmisión. */
  onStatusChange?: (status: TransmissionStatus) => void;
}) {
  const play = useSound();
  const toast = useToast();
  const [status, setLocalStatus] = useState<TransmissionStatus>("idle");

  /** Un solo sitio donde cambiar el estado: así la consola nunca se queda atrás. */
  function setStatus(next: TransmissionStatus) {
    setLocalStatus(next);
    onStatusChange?.(next);
  }
  const [errors, setErrors] = useState<ContactErrors>({});

  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const input = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      startedAt: startedAt.current,
    };

    const found = validateContact(input);
    setErrors(found);

    if (hasErrors(found)) {
      play("error");
      toast({ label: "SIGNAL", value: "CHECK THE FIELDS", tone: "warning", key: "contact" });
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (response.status === 429) {
        setStatus("limited");
        play("error");
        toast({
          label: "SIGNAL",
          value: "DAILY TRANSMISSION LIMIT REACHED",
          tone: "warning",
          key: "contact",
        });
        return;
      }

      if (!response.ok) throw new Error("send failed");

      setStatus("sent");
      play("select");
      toast({ label: "SIGNAL", value: "MESSAGE TRANSMITTED", tone: "success", key: "contact" });
      event.currentTarget.reset();
      startedAt.current = Date.now();
    } catch {
      setStatus("failed");
      play("error");
      toast({ label: "SIGNAL", value: "TRANSMISSION FAILED", tone: "error", key: "contact" });
    }
  }

  function resetStatus() {
    if (status === "sent" || status === "failed") setStatus("idle");
  }

  const sending = status === "sending";

  return (
    <section className="relative flex flex-col gap-5 rounded-panel bg-surface p-5 md:p-8">
      <BracketFrame className="-inset-2 text-brand-cyan" />

      <header className="flex items-center justify-between gap-3">
        <h2 className="text-sm text-fg md:text-base">
          CABLE_LINK{" "}
          <span className="hidden text-xs text-fg-muted sm:inline md:text-sm">|| SEND_MESSAGE</span>
        </h2>
        <Badge tone="yellow">{`[RESPONSE_TIME]: <24h`}</Badge>
      </header>
      {status === "limited" ? (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-control bg-terminal p-5 text-center">
          <p className="text-sm text-fg-muted">[CHANNEL]: SATURATED</p>
          <span
            aria-hidden="true"
            className="mt-5 block h-16 w-32 bg-[url('/link-unplugged.webp')] bg-contain bg-no-repeat"
            style={{ imageRendering: "pixelated" }}
          />
          <p className="mt-3 text-xs leading-relaxed text-fg-muted md:text-sm">
            You&apos;ve reached today&apos;s transmission limit. Use the main channel or try again
            tomorrow.
          </p>
        </div>
      ) : (
        <>
          <p className="text-[10px] text-fg-muted md:text-xs">
            Want to get in touch? Leave me a message below.
          </p>
          <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-4">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute size-0 opacity-0"
            />

            {FIELDS.map((field) => (
              <label key={field.name} className="flex flex-col gap-1.5">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-xs text-brand-cyan/70 md:text-sm">[{field.label}]:</span>
                  {errors[field.name] ? (
                    <span className="text-[10px] text-fg-danger md:text-xs">
                      {errors[field.name]}
                    </span>
                  ) : null}
                </span>

                <span className="flex items-center gap-2 rounded-control border border-transparent bg-terminal px-3 py-2.5 transition-colors focus-within:border-brand-cyan">
                  <span aria-hidden="true" className="shrink-0 text-xs text-status-ok">
                    {">_"}
                  </span>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    onFocus={() => {
                      play("hover");
                      resetStatus();
                    }}
                    aria-invalid={Boolean(errors[field.name])}
                    className="w-full bg-transparent text-xs text-fg outline-none placeholder:text-fg-muted/60 md:text-sm"
                  />
                </span>
              </label>
            ))}

            <label className="flex flex-col gap-1.5">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-brand-cyan/70 md:text-sm">[MESSAGE]:</span>
                {errors.message ? (
                  <span className="text-[10px] text-fg-danger md:text-xs">{errors.message}</span>
                ) : null}
              </span>

              <span className="flex gap-2 rounded-control border border-transparent bg-terminal px-3 py-2.5 transition-colors focus-within:border-brand-cyan">
                <span aria-hidden="true" className="shrink-0 text-xs text-status-ok">
                  {">_"}
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Hey! I have a challenge for you. Interested in joining?"
                  onFocus={() => {
                    play("hover");
                    resetStatus();
                  }}
                  aria-invalid={Boolean(errors.message)}
                  className="w-full resize-none bg-transparent text-xs text-fg outline-none placeholder:text-fg-muted/60 md:text-sm"
                />
              </span>
            </label>

            <button
              type="submit"
              disabled={sending}
              onMouseEnter={() => play("hover")}
              className="group/send relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-none border-4 border-brand-cyan-dark bg-brand-cyan px-4 py-3 text-base text-brand-cyan-dark shadow-[4px_4px_0_0_var(--color-brand-cyan-dark)] transition-all hover:bg-brand-cyan/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-60 disabled:shadow-none"
            >
              <span className="relative">{sending ? "TRANSMITTING..." : "TRANSMIT"}</span>
            </button>
          </form>
        </>
      )}
    </section>
  );
}
