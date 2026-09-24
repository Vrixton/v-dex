"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { useDevice } from "@/components/device/device-context";
import { useSound } from "@/components/sound/use-sound";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { Window } from "@/components/window/window";

import { MENU_IDLE_MESSAGE, MENU_ITEMS } from "./menu-items";
import { MenuTerminal } from "./menu-terminal";

/**
 * Menú del dispositivo.
 *
 * Los ítems son enlaces reales (con href), así que Cmd/Ctrl+clic abre pestaña
 * nueva y el navegador puede precargar las rutas. El clic normal se intercepta
 * para lanzar el ciclo de confirmación, cierre y apertura.
 *
 * Teclado: Tab funciona por defecto y además hay flechas ↑↓, Home/End y
 * Escape, como en el menú de una consola.
 */
export function MenuScreen() {
  const { navigate, toggleMenu, confirmingHref, phase } = useDevice();
  const play = useSound();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  // El foco entra cuando el dispositivo termina de abrirse: antes el
  // contenido está inert y no admite foco.
  useEffect(() => {
    if (phase !== "open") return;
    itemRefs.current[0]?.focus();
  }, [phase]);

  const focusItem = useCallback((index: number) => {
    const total = MENU_ITEMS.length;
    const next = (index + total) % total;
    setActiveIndex(next);
    itemRefs.current[next]?.focus();
  }, []);

  // Un solo sonido por cambio real de opción: el hover se dispara mucho.
  function selectItem(index: number) {
    if (index === activeIndex) return;
    play("hover");
    setActiveIndex(index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const current = activeIndex ?? 0;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(current + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(current - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(0);
        break;
      case "End":
        event.preventDefault();
        focusItem(MENU_ITEMS.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        toggleMenu();
        // El foco vuelve al botón que abrió el menú
        document.getElementById("menu-toggle")?.focus();
        break;
      default:
        break;
    }
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    // Cmd/Ctrl/Shift+clic: que el navegador haga lo suyo
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    play("select");
    navigate(href);
  }

  const activeItem = activeIndex === null ? null : MENU_ITEMS[activeIndex];
  const isReady = phase === "open";

  return (
    <Window id="device-menu" title="MENU" ledTone="white" className="min-h-[70dvh]">
      {/* La terminal queda anclada abajo; la lista se centra en el espacio
          que sobra, así el aire de arriba y el de abajo se reparten solos. */}
      <div className="flex flex-1 flex-col justify-between gap-6">
        <nav aria-label="Device menu" className="flex flex-1 items-center justify-center">
          <ul
            data-ready={isReady}
            onKeyDown={handleKeyDown}
            className="flex w-full flex-col items-center gap-1 opacity-0 transition-opacity delay-100 duration-300 data-[ready=true]:opacity-100 md:gap-7"
          >
            {MENU_ITEMS.map((item, index) => (
              <li key={item.href} className="flex w-full justify-center">
                <Link
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  href={item.href}
                  data-active={activeIndex === index}
                  data-confirming={confirmingHref === item.href}
                  onClick={(event) => handleClick(event, item.href)}
                  onMouseEnter={() => selectItem(index)}
                  onFocus={() => selectItem(index)}
                  className="group flex w-full max-w-md items-center justify-center rounded-control px-6 py-3 text-xl leading-tight text-fg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow data-[active=true]:bg-surface-hover data-[active=true]:text-brand-cyan data-[confirming=true]:animate-menu-confirm md:text-xl"
                >
                  <span className="flex w-[20ch] items-center gap-4">
                    <PixelChevron className="text-brand-yellow opacity-0 group-data-[active=true]:opacity-100 motion-safe:group-data-[active=true]:animate-cursor-blink" />
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MenuTerminal message={activeItem?.terminal ?? MENU_IDLE_MESSAGE} />
      </div>
    </Window>
  );
}
