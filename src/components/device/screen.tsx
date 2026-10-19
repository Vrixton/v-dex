"use client";

import { useRef, type ReactNode } from "react";

import { MenuScreen } from "@/features/menu/menu-screen";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { Crosshair } from "./crosshair";
import { useDevice } from "./device-context";
import { WelcomeScreen } from "@/features/welcome/welcome-screen";
import { useBoot } from "./boot-context";

export function Screen({ children }: { children: ReactNode }) {
  const { isContentVisible, isMenuOpen } = useDevice();
  const hasMounted = useHasMounted();
  const screenRef = useRef<HTMLElement>(null);
  const isReady = hasMounted && isContentVisible;
  const { phase } = useBoot();
  const isWelcome = phase === "powering" || phase === "welcome";

  return (
    <main
      ref={screenRef}
      id="screen"
      inert={!isContentVisible || phase === "powering"}
      className="min-h-dvh px-4 pt-(--screen-inset-top) pb-(--screen-inset-bottom) md:px-8"
    >
      <div
        data-ready={isReady}
        className="group/screen mx-auto max-w-6xl scale-[0.92] opacity-0 transition-[scale,opacity] duration-(--window-duration) ease-out-window data-[ready=true]:scale-100 data-[ready=true]:opacity-100 motion-reduce:scale-100 motion-reduce:transition-opacity"
      >
        {isWelcome ? <WelcomeScreen /> : isMenuOpen ? <MenuScreen /> : children}
      </div>
      <Crosshair containerRef={screenRef} />
    </main>
  );
}
