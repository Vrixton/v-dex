"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type MouseEvent } from "react";

import { PowerOff, POWER_OFF_MS } from "@/components/device/power-off";
import { useSound } from "@/components/sound/use-sound";
import { useToast } from "@/components/toast/toast-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/locale";
import { LOCALE_NOTICE_KEY } from "@/i18n/locale-notice";
import { useLocale, useMessages } from "@/i18n/locale-provider";
import { localePath } from "@/i18n/paths";

const RESET_MS = 800;

export function LocaleSwitch() {
  const current = useLocale();
  const m = useMessages().device;
  const pathname = usePathname();
  const play = useSound();
  const toast = useToast();
  const prefersReducedMotion = useReducedMotion();
  const [poweringOff, setPoweringOff] = useState(false);
  const leaving = useRef(false);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, href: string, code: Locale) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (code === current || leaving.current) return;

    leaving.current = true;
    try {
      window.sessionStorage.setItem(LOCALE_NOTICE_KEY, code);
    } catch {}

    if (prefersReducedMotion) {
      window.location.assign(href);
      return;
    }

    play("power");
    toast({
      label: m.system.label,
      value: m.system.reset,
      tone: "muted",
      key: "locale",
    });

    window.setTimeout(() => setPoweringOff(true), RESET_MS);
    window.setTimeout(() => {
      window.location.assign(href);
    }, RESET_MS + POWER_OFF_MS);
  }

  return (
    <div className="flex items-center gap-1.5 text-[11px] md:text-xs">
      {poweringOff ? <PowerOff /> : null}

      <div role="group" aria-label={m.locale.group} className="flex items-center gap-1.5">
        {LOCALES.map((code, index) => {
          const active = code === current;
          const href = localePath(pathname, code);

          return (
            <span key={code} className="flex items-center gap-1.5">
              {index > 0 ? (
                <span aria-hidden="true" className="text-fg-muted/50">
                  ·
                </span>
              ) : null}
              <Link
                href={href}
                hrefLang={code}
                aria-label={LOCALE_NAMES[code]}
                {...(active ? { "aria-current": "true" as const } : {})}
                onMouseEnter={() => play("hover")}
                onFocus={() => play("hover")}
                onClick={(event) => handleClick(event, href, code)}
                data-active={active}
                className="cursor-pointer border-b-2 border-transparent px-0.5 pb-0.5 text-fg-muted transition-colors hover:text-brand-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow data-[active=true]:border-brand-cyan data-[active=true]:text-brand-cyan"
              >
                {code.toUpperCase()}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
