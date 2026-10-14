"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useLocale, useMessages } from "@/i18n/locale-provider";
import { localePath, stripLocale } from "@/i18n/paths";

import { LocaleSwitch } from "./locale-switch";
import { MENU_ITEMS } from "./menu-items";
import { MenuTerminal } from "./menu-terminal";

export function MenuScreen() {
  const { navigate, toggleMenu, confirmingHref, phase } = useDevice();
  const play = useSound();
  const locale = useLocale();
  const m = useMessages().device.menu;
  const pathname = usePathname();

  const currentPath = stripLocale(pathname);

  function matchesRoute(href: string): boolean {
    return href === "/" ? currentPath === "/" : currentPath.startsWith(href);
  }

  const currentIndex = Math.max(
    MENU_ITEMS.findIndex((item) => matchesRoute(item.href)),
    0,
  );

  const [activeIndex, setActiveIndex] = useState<number>(currentIndex);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    if (phase !== "open") return;
    itemRefs.current[currentIndex]?.focus();
  }, [phase, currentIndex]);

  const focusItem = useCallback((index: number) => {
    const total = MENU_ITEMS.length;
    const next = (index + total) % total;
    setActiveIndex(next);
    itemRefs.current[next]?.focus();
  }, []);

  function selectItem(index: number) {
    if (index === activeIndex) return;
    play("hover");
    setActiveIndex(index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const current = activeIndex;

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
        document.getElementById("menu-toggle")?.focus();
        break;
      default:
        break;
    }
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    play("select");
    navigate(href);
  }

  const activeItem = MENU_ITEMS[activeIndex];
  const isReady = phase === "open";

  return (
    <Window
      id="device-menu"
      title={m.title}
      ledTone="white"
      actions={<LocaleSwitch />}
      className="min-h-[70dvh]"
    >
      <div className="flex flex-1 flex-col justify-between gap-6">
        <nav aria-label={m.nav} className="flex flex-1 items-center justify-center">
          <ul
            data-ready={isReady}
            onKeyDown={handleKeyDown}
            className="flex w-full flex-col items-center gap-1 opacity-0 transition-opacity delay-100 duration-300 data-[ready=true]:opacity-100 md:gap-7"
          >
            {MENU_ITEMS.map((item, index) => {
              const isCurrent = matchesRoute(item.href);
              const href = localePath(item.href, locale);

              return (
                <li key={item.id} className="flex w-full justify-center">
                  <Link
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    href={href}
                    data-active={activeIndex === index}
                    data-current={isCurrent}
                    data-confirming={confirmingHref === item.href}
                    {...(isCurrent ? { "aria-current": "page" as const } : {})}
                    onClick={(event) => handleClick(event, href)}
                    onMouseEnter={() => selectItem(index)}
                    onFocus={() => selectItem(index)}
                    className="group flex w-full max-w-md items-center justify-center rounded-control px-6 py-3 text-xl leading-tight text-fg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow data-[active=true]:bg-surface-hover data-[active=true]:text-brand-cyan data-[confirming=true]:animate-menu-confirm data-[current=true]:text-brand-cyan md:text-xl"
                  >
                    <span className="flex w-[20ch] items-center gap-4">
                      <PixelChevron className="text-brand-yellow opacity-0 group-data-[active=true]:opacity-100 motion-safe:group-data-[active=true]:animate-cursor-blink" />
                      {m.items[item.id].label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <MenuTerminal message={activeItem ? m.items[activeItem.id].terminal : m.idle} />
      </div>
    </Window>
  );
}
