import type { CSSProperties } from "react";

const MENU_PATH = "M5 7h14M5 12h14M5 17h14";
export function MenuButtonGlyph() {
  return (
    <span
      aria-hidden="true"
      style={{ "--menu-toggle-size": "1.75rem" } as CSSProperties}
      className="inline-block size-(--menu-toggle-size) align-middle"
    >
      <span className="block size-full rounded-full bg-seam p-[calc(var(--menu-toggle-size)*0.06)] shadow-key">
        <span className="block size-full rounded-full bg-white p-[calc(var(--menu-toggle-size)*0.04)]">
          <span className="relative grid size-full place-items-center overflow-hidden rounded-full bg-(image:--gradient-button-cyan) text-white">
            <span className="absolute top-[8%] left-1/2 h-[22%] w-[45%] -translate-x-1/2 rounded-[50%] bg-white/50" />
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              className="relative mt-[6%] size-[50%]"
            >
              <path d={MENU_PATH} className="stroke-screen/20" strokeWidth={5} />
              <path d={MENU_PATH} />
            </svg>
          </span>
        </span>
      </span>
    </span>
  );
}
