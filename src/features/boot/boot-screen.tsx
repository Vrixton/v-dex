"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { useSound } from "@/components/sound/use-sound";
import { Screw } from "@/components/device/screw";
import { SpeakerGrill } from "@/components/device/speaker-grill";
import { StatusLed } from "@/components/ui/status-led";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Lo que tarda la carcasa en desplegarse hasta ocupar la ventana. */
const EXPAND_MS = 700;

/**
 * Portada de encendido.
 *
 * El mismo aparato, primero en pequeño y luego desplegado a pantalla
 * completa. Lo que crece es la carcasa: los tornillos, las rejillas, el LED
 * y el botón mantienen su tamaño y viajan hasta la posición que ocupan en
 * la página, así que la portada no se sustituye por el dispositivo, se
 * convierte en él.
 *
 * Por eso la carcasa se anima con ancho y alto en vez de scale: escalar
 * agranda también lo que hay dentro, y aquí eso es justo lo que no debe
 * pasar.
 *
 * La home ya está montada debajo: la portada la tapa, no la sustituye. Así
 * el contenido llega en el HTML inicial.
 *
 * El sonido va en el clic y no antes porque los navegadores bloquean el
 * audio hasta el primer gesto: sonaría en el vacío.
 */
export function BootScreen() {
  const play = useSound();
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "leaving" | "done">("idle");

  if (pathname !== "/" || prefersReducedMotion || state === "done") return null;

  function start() {
    if (state !== "idle") return;
    play("power");
    setState("leaving");
    window.setTimeout(() => setState("done"), EXPAND_MS);
  }

  const expanding = state === "leaving";

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center bg-navy-deep ${
        expanding ? "motion-safe:animate-boot-fade" : ""
      }`}
    >
      {/*
        Superficie insinuada: una luz cenital sobre el aparato y una mesa que
        se adivina en la mitad inferior. Sin dibujar nada reconocible, que
        competiría con lo único que hay que mirar.
      */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          expanding ? "opacity-0" : "opacity-100"
        }`}
      >
        <span
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 38%, color-mix(in oklab, var(--color-brand-cyan) 7%, transparent), transparent 70%)",
          }}
        />
        <span
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-brand-cyan) 5%, transparent))",
          }}
        />
      </span>
      {/*
        La carcasa: es lo único que cambia de tamaño. Al desplegarse ocupa
        toda la ventana, y con ella cada pieza llega a su sitio definitivo.
      */}
      {/* Sombra proyectada: se desvanece al desplegarse, cuando el aparato
          deja de ser un objeto sobre una superficie. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-[calc(50%+4.5rem)] left-1/2 h-8 w-64 -translate-x-1/2 rounded-[50%] bg-black/70 blur-lg transition-opacity duration-500 md:top-[calc(50%+6rem)] md:w-96 ${
          expanding ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`relative flex flex-col overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanding
            ? "h-dvh w-screen rounded-none"
            : "-mt-12 h-56 w-80 rounded-window md:h-72 md:w-[28rem]"
        }`}
      >
        {/* Mitad superior */}
        <div className="relative flex-1 border-b-(length:--seam-w) border-seam bg-(image:--gradient-bezel-top) shadow-bezel-top">
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 md:px-10">
            <div className="mr-4 flex items-center gap-3 md:mr-0 md:gap-8">
              <Screw angle={35} />
              <StatusLed tone="green" />
              <span className="text-sm tracking-[0.15em] whitespace-nowrap text-white md:text-2xl">
                V-DEX
              </span>
            </div>
            <div className="flex items-center gap-6 md:gap-24">
              <SpeakerGrill className="hidden md:flex" />
              <Screw angle={-40} />
            </div>
          </div>
        </div>

        {/* Mitad inferior */}
        <div className="relative flex-1 border-t-(length:--seam-w) border-seam bg-(image:--gradient-bezel-bottom) shadow-bezel-bottom">
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 md:px-10">
            <Screw angle={-25} />
            <SpeakerGrill className="hidden md:flex" />
            <Screw angle={50} />
          </div>
        </div>

        {/*
          El botón, anclado a la unión de las dos mitades. No crece con la
          carcasa: su tamaño es el mismo que tendrá el botón del menú.
        */}
        <button
          type="button"
          onClick={start}
          aria-label="Start"
          className="group/boot absolute top-1/2 left-1/2 size-(--menu-toggle-size) -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
        >
          {/* Pulso de luz: el resplandor sale del botón y se apaga */}
          {!expanding ? (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-brand-cyan motion-safe:animate-boot-pulse"
            />
          ) : null}

          <span className="relative block size-full rounded-full bg-seam p-[calc(var(--menu-toggle-size)*0.06)] shadow-key transition-[box-shadow,translate] duration-100 ease-out group-active/boot:translate-y-[2px] group-active/boot:shadow-key-pressed">
            <span className="block size-full rounded-full bg-white p-[calc(var(--menu-toggle-size)*0.04)]">
              <span className="relative block size-full rounded-full bg-(image:--gradient-button-cyan)">
                <span className="absolute top-[8%] left-1/2 h-[22%] w-[45%] -translate-x-1/2 rounded-full bg-white/50" />
              </span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
