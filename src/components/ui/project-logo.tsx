/** Orden de los logos dentro de logo-sheet.webp. */
export const LOGO_ORDER = [
  "farmatodo",
  "uhomie",
  "v-dex",
  "texastv",
  "swe",
  "novios-a-bordo",
] as const;

export type LogoName = (typeof LOGO_ORDER)[number];

/**
 * Logo de un proyecto.
 *
 * Los seis viven en una sola imagen de 1,6 KB: una única descarga y elegir
 * cuál se muestra es mover el fondo, igual que con las medallas.
 *
 * Son versiones en pixel art de los originales. Convertirlos, en vez de usar
 * los logos vectoriales, mantiene la estética del aparato: aquí todo está
 * dibujado en el mismo lenguaje, y una marca ajena a todo color rompería la
 * ilusión igual que lo haría una captura de pantalla.
 */
export function ProjectLogo({ name, className }: { name: LogoName; className?: string }) {
  const index = LOGO_ORDER.indexOf(name);

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        backgroundImage: "url('/logo-sheet.webp')",
        backgroundRepeat: "no-repeat",
        // Las medidas se expresan en porcentaje para que el logo escale con
        // la caja sin recalcular píxeles en cada breakpoint.
        backgroundSize: `${LOGO_ORDER.length * 100}% 100%`,
        backgroundPosition: `${(index / (LOGO_ORDER.length - 1)) * 100}% 0`,
        aspectRatio: "1",
        imageRendering: "pixelated",
      }}
    />
  );
}
