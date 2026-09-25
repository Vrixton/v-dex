import { cn } from "@/lib/cn";

type BracketFrameProps = {
  /** Tamaño de las esquinas. */
  size?: "sm" | "md";
  /** Las esquinas entran desde el centro, como un escáner enfocando. */
  animated?: boolean;
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

/*
 * Punto de partida de cada esquina: el centro del contenedor.
 *
 * Las medidas van en cqw/cqh (unidades del contenedor) y no en píxeles,
 * así la animación arranca desde el centro sea cual sea el tamaño de la
 * tarjeta. Requiere que el contenedor declare container-type: size.
 */
const ENTER = {
  tl: "[--bracket-from:45cqw_45cqh]",
  tr: "[--bracket-from:-45cqw_45cqh]",
  bl: "[--bracket-from:45cqw_-45cqh]",
  br: "[--bracket-from:-45cqw_-45cqh]",
} as const;

/**
 * Esquinas en corchete, el marco HUD que se repite por todo el dispositivo.
 *
 * Hereda el color con currentColor, así que se tiñe desde el contenedor.
 * Es decorativa: se coloca sobre un elemento con position: relative.
 */
export function BracketFrame({ size = "md", animated = false, className }: BracketFrameProps) {
  const corner = CORNERS[size];
  const base = cn("absolute border-current", corner.box);
  const enter = animated ? "group-data-[ready=true]/screen:motion-safe:animate-bracket-in" : "";

  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(base, "top-0 left-0", corner.tl, enter, animated && ENTER.tl)} />
      <span className={cn(base, "top-0 right-0", corner.tr, enter, animated && ENTER.tr)} />
      <span className={cn(base, "bottom-0 left-0", corner.bl, enter, animated && ENTER.bl)} />
      <span className={cn(base, "right-0 bottom-0", corner.br, enter, animated && ENTER.br)} />
    </span>
  );
}
