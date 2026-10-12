"use client";

import { useTransition } from "react";

import { useSound } from "@/components/sound/use-sound";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { setLocale } from "@/i18n/actions";
import { LOCALES, type Locale } from "@/i18n/locale";
import { useLocale } from "@/i18n/locale-provider";

/**
 * Selector de idioma.
 *
 * Vive en el menú y no en el bisel, junto al interruptor de sonido, porque
 * ningún aparato real ha tenido nunca un interruptor físico de idioma: el
 * volumen es del aparato, el idioma es del sistema.
 *
 * Usa el mismo lenguaje que las opciones del menú (chevron amarillo sobre la
 * activa) para que se lea como parte de la misma pantalla y no como un
 * control añadido.
 *
 * Mientras el servidor responde, los dos botones quedan deshabilitados: el
 * cambio es un viaje de ida y vuelta, y pulsar dos veces mandaría dos.
 */

/** Lo que se ve. El nombre completo va en el nombre accesible. */
const LABELS: Record<Locale, string> = { en: "EN", es: "ES" };

/** Cada idioma se anuncia en su propia lengua, como es costumbre. */
const NAMES: Record<Locale, string> = { en: "English", es: "Español" };

export function LocaleSwitch() {
  const current = useLocale();
  const play = useSound();
  const [pending, startTransition] = useTransition();

  function choose(next: Locale) {
    if (next === current || pending) return;
    play("select");
    startTransition(() => {
      void setLocale(next);
    });
  }

  return (
    <div className="flex items-center justify-center gap-3 text-xs md:text-sm">
      <span className="text-fg-muted">[LANG]:</span>

      <div role="group" aria-label="Language" className="flex items-center gap-2">
        {LOCALES.map((code) => {
          const active = code === current;
          return (
            <button
              key={code}
              type="button"
              aria-label={NAMES[code]}
              aria-pressed={active}
              disabled={pending}
              onMouseEnter={() => play("hover")}
              onFocus={() => play("hover")}
              onClick={() => choose(code)}
              data-active={active}
              className="group/lang flex cursor-pointer items-center gap-1.5 rounded-control px-2 py-1 text-fg-muted transition-colors hover:text-brand-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow disabled:cursor-default data-[active=true]:text-brand-cyan"
            >
              <PixelChevron className="size-2.5 text-brand-yellow opacity-0 group-data-[active=true]/lang:opacity-100 motion-safe:group-data-[active=true]/lang:animate-cursor-blink" />
              {LABELS[code]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
