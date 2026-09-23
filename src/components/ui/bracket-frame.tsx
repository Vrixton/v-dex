import { cn } from "@/lib/cn";

type BracketFrameProps = {
  /** Tamaño de las esquinas. */
  size?: "sm" | "md";
  className?: string;
};

// Cada esquina dibuja solo dos lados. Las clases van completas y no
// construidas con plantillas, porque Tailwind escanea el código como texto
// y no vería una clase formada en tiempo de ejecución.
const CORNERS = {
  sm: {
    box: "size-2",
    tl: "border-t border-l",
    tr: "border-t border-r",
    bl: "border-b border-l",
    br: "border-b border-r",
  },
  md: {
    box: "size-3",
    tl: "border-t-2 border-l-2",
    tr: "border-t-2 border-r-2",
    bl: "border-b-2 border-l-2",
    br: "border-b-2 border-r-2",
  },
} as const;

/**
 * Esquinas en corchete, el marco HUD que se repite por todo el dispositivo.
 *
 * Hereda el color con currentColor, así que se tiñe desde el contenedor.
 * Es decorativa: se coloca sobre un elemento con position: relative.
 */
export function BracketFrame({ size = "md", className }: BracketFrameProps) {
  const corner = CORNERS[size];
  const base = cn("absolute border-current", corner.box);

  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(base, "top-0 left-0", corner.tl)} />
      <span className={cn(base, "top-0 right-0", corner.tr)} />
      <span className={cn(base, "bottom-0 left-0", corner.bl)} />
      <span className={cn(base, "right-0 bottom-0", corner.br)} />
    </span>
  );
}
