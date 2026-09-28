"use client";

import { useState, type FormEvent } from "react";

import { useSound } from "@/components/sound/use-sound";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { SignalIcon } from "@/components/ui/icons";

const FIELDS = [
  { name: "name", label: "NAME", placeholder: "Red", type: "text" },
  { name: "email", label: "EMAIL", placeholder: "example@example.com", type: "email" },
] as const;

/**
 * Formulario de contacto: el cable link del dispositivo.
 *
 * De momento solo la interfaz; el envío llega en el siguiente paso. Los
 * campos son nativos (input y textarea) a propósito: así funcionan el
 * autocompletado del navegador, la validación del propio HTML y los
 * lectores de pantalla, que es lo que se pierde al inventar controles.
 *
 * Vive aparte de la vista para poder quitarlo sin desarmar nada: basta con
 * borrar su línea en la página y dejar la rejilla en una columna.
 */
export function ContactForm() {
  const play = useSound();
  const [sending, setSending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    play("select");
    setSending(true);
    // TODO: envío real en el siguiente paso
    setTimeout(() => setSending(false), 600);
  }

  return (
    <section className="relative flex flex-col gap-5 rounded-panel bg-surface p-5 md:p-8">
      <BracketFrame className="-inset-2 text-brand-cyan" />
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-sm text-fg md:text-base">
          CABLE_LINK <span className="text-fg-muted">|| SEND_MESSAGE</span>
        </h2>
        <SignalIcon className="size-5 text-status-ok" />
      </header>
      <p className="text-[10px] text-fg-muted md:text-xs">
        Want to get in touch? Leave me a message below.
      </p>
      <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
        {FIELDS.map((field) => (
          <label key={field.name} className="flex flex-col gap-1.5">
            <span className="text-xs text-brand-cyan/70 md:text-sm">[{field.label}]:</span>
            <span className="flex items-center gap-2 rounded-control border border-transparent bg-terminal px-3 py-2.5 transition-colors focus-within:border-brand-cyan">
              <span aria-hidden="true" className="shrink-0 text-xs text-status-ok">
                {">_"}
              </span>
              <input
                name={field.name}
                type={field.type}
                required
                placeholder={field.placeholder}
                onFocus={() => play("hover")}
                className="w-full bg-transparent text-xs text-fg outline-none placeholder:text-fg-muted/60 md:text-sm"
              />
            </span>
          </label>
        ))}

        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-brand-cyan/70 md:text-sm">[MESSAGE]:</span>
          <span className="flex gap-2 rounded-control border border-transparent bg-terminal px-3 py-2.5 transition-colors focus-within:border-brand-cyan">
            <span aria-hidden="true" className="shrink-0 text-xs text-status-ok">
              {">_"}
            </span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Hey! I have a challenge for you. Interested in joining?"
              onFocus={() => play("hover")}
              className="w-full resize-none bg-transparent text-xs text-fg outline-none placeholder:text-fg-muted/60 md:text-sm"
            />
          </span>
        </label>

        <button
          type="submit"
          disabled={sending}
          onMouseEnter={() => play("hover")}
          onClick={() => play("click")}
          className="group/send relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-none border-4 border-brand-cyan-dark bg-brand-cyan px-4 py-3 text-base text-brand-cyan-dark shadow-[4px_4px_0_0_var(--color-brand-cyan-dark)] transition-all hover:bg-brand-cyan/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-60 disabled:shadow-none"
        >
          <span className="relative">{sending ? "TRANSMITTING..." : "TRANSMIT"}</span>
        </button>
      </form>
    </section>
  );
}
