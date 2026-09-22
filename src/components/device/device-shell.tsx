import type { ReactNode } from "react";

import { BezelBottom } from "./bezel-bottom";
import { BezelTop } from "./bezel-top";

/**
 * Carcasa persistente del V-DEX. Vive en el layout raíz, así que nunca se
 * desmonta al navegar: solo cambia lo que hay dentro de <main>.
 *
 * Los biseles son fijos y el documento hace scroll normal por debajo. Es más
 * robusto en móvil que un scroll interno (barra de URL que se oculta,
 * rebote de iOS, pull-to-refresh).
 */
export function DeviceShell({ children }: { children: ReactNode }) {
  return (
    <>
      <BezelTop />
      <main
        id="screen"
        className="min-h-dvh px-4 pt-(--screen-inset-top) pb-(--screen-inset-bottom) md:px-8"
      >
        {children}
      </main>
      <BezelBottom />
    </>
  );
}
