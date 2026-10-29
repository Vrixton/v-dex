import type { CSSProperties } from "react";

export function CartridgeGlyph() {
  return (
    <span
      aria-hidden="true"
      style={{ imageRendering: "pixelated" } as CSSProperties}
      className="inline-block size-8 bg-[url('/cv-cartridge.webp')] bg-contain bg-center bg-no-repeat align-middle"
    />
  );
}
