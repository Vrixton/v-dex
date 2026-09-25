import { cn } from "@/lib/cn";

/**
 * Iconos de tecnologías en pixel art.
 *
 * Los doce viven en un único sprite SVG en línea: cero peticiones, cada
 * trazado se define una sola vez aunque se use en varios sitios, y heredan
 * el color con currentColor, así que teñirlos no cuesta ni un byte.
 *
 * Rejilla de 24x24: con 16 las letras se volvían ilegibles, que es lo que
 * hace reconocible a la mitad de estos logos.
 *
 * Monta <TechIconSprite /> una vez por página y luego usa <TechIcon />
 * tantas veces como haga falta.
 */

export type TechIconName =
  | "typescript"
  | "javascript"
  | "html5"
  | "css3"
  | "sass"
  | "angular"
  | "react"
  | "nextjs"
  | "nodejs"
  | "tailwind"
  | "cypress"
  | "graphql";

export function TechIconSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute size-0"
      shapeRendering="crispEdges"
    >
      <defs>
        <symbol id="tech-typescript" viewBox="0 0 24 24">
          <path d="M5 2h14v1h-14zM3 3h2v1h-2zM19 3h2v1h-2zM3 4h1v1h-1zM20 4h1v1h-1zM2 5h1v1h-1zM21 5h1v1h-1zM2 6h1v1h-1zM21 6h1v1h-1zM2 7h1v1h-1zM21 7h1v1h-1zM2 8h1v1h-1zM21 8h1v1h-1zM2 9h1v1h-1zM6 9h5v1h-5zM13 9h4v1h-4zM21 9h1v1h-1zM2 10h1v1h-1zM8 10h1v1h-1zM12 10h1v1h-1zM21 10h1v1h-1zM2 11h1v1h-1zM8 11h1v1h-1zM12 11h1v1h-1zM21 11h1v1h-1zM2 12h1v1h-1zM8 12h1v1h-1zM13 12h3v1h-3zM21 12h1v1h-1zM2 13h1v1h-1zM8 13h1v1h-1zM16 13h1v1h-1zM21 13h1v1h-1zM2 14h1v1h-1zM8 14h1v1h-1zM16 14h1v1h-1zM21 14h1v1h-1zM2 15h1v1h-1zM8 15h1v1h-1zM12 15h4v1h-4zM21 15h1v1h-1zM2 16h1v1h-1zM21 16h1v1h-1zM2 17h1v1h-1zM21 17h1v1h-1zM2 18h1v1h-1zM21 18h1v1h-1zM3 19h1v1h-1zM20 19h1v1h-1zM3 20h2v1h-2zM19 20h2v1h-2zM5 21h14v1h-14z" />
        </symbol>
        <symbol id="tech-javascript" viewBox="0 0 24 24">
          <path d="M5 2h14v1h-14zM3 3h2v1h-2zM19 3h2v1h-2zM3 4h1v1h-1zM20 4h1v1h-1zM2 5h1v1h-1zM21 5h1v1h-1zM2 6h1v1h-1zM21 6h1v1h-1zM2 7h1v1h-1zM21 7h1v1h-1zM2 8h1v1h-1zM21 8h1v1h-1zM2 9h1v1h-1zM8 9h3v1h-3zM13 9h4v1h-4zM21 9h1v1h-1zM2 10h1v1h-1zM9 10h1v1h-1zM12 10h1v1h-1zM21 10h1v1h-1zM2 11h1v1h-1zM9 11h1v1h-1zM12 11h1v1h-1zM21 11h1v1h-1zM2 12h1v1h-1zM9 12h1v1h-1zM13 12h3v1h-3zM21 12h1v1h-1zM2 13h1v1h-1zM6 13h1v1h-1zM9 13h1v1h-1zM16 13h1v1h-1zM21 13h1v1h-1zM2 14h1v1h-1zM6 14h1v1h-1zM9 14h1v1h-1zM16 14h1v1h-1zM21 14h1v1h-1zM2 15h1v1h-1zM7 15h2v1h-2zM12 15h4v1h-4zM21 15h1v1h-1zM2 16h1v1h-1zM21 16h1v1h-1zM2 17h1v1h-1zM21 17h1v1h-1zM2 18h1v1h-1zM21 18h1v1h-1zM3 19h1v1h-1zM20 19h1v1h-1zM3 20h2v1h-2zM19 20h2v1h-2zM5 21h14v1h-14z" />
        </symbol>
        <symbol id="tech-html5" viewBox="0 0 24 24">
          <path d="M3 2h18v1h-18zM3 3h1v1h-1zM20 3h1v1h-1zM3 4h1v1h-1zM20 4h1v1h-1zM3 5h1v1h-1zM20 5h1v1h-1zM3 6h1v1h-1zM9 6h5v1h-5zM20 6h1v1h-1zM3 7h1v1h-1zM9 7h1v1h-1zM20 7h1v1h-1zM3 8h1v1h-1zM9 8h4v1h-4zM20 8h1v1h-1zM3 9h1v1h-1zM13 9h1v1h-1zM20 9h1v1h-1zM3 10h1v1h-1zM13 10h1v1h-1zM20 10h1v1h-1zM3 11h1v1h-1zM9 11h1v1h-1zM13 11h1v1h-1zM20 11h1v1h-1zM3 12h1v1h-1zM10 12h3v1h-3zM20 12h1v1h-1zM3 13h1v1h-1zM20 13h1v1h-1zM4 14h1v1h-1zM19 14h1v1h-1zM5 15h1v1h-1zM18 15h1v1h-1zM6 16h1v1h-1zM17 16h1v1h-1zM7 17h1v1h-1zM16 17h1v1h-1zM8 18h1v1h-1zM15 18h1v1h-1zM9 19h1v1h-1zM14 19h1v1h-1zM10 20h1v1h-1zM13 20h1v1h-1zM11 21h2v1h-2z" />
        </symbol>
        <symbol id="tech-css3" viewBox="0 0 24 24">
          <path d="M3 2h18v1h-18zM3 3h1v1h-1zM20 3h1v1h-1zM3 4h1v1h-1zM20 4h1v1h-1zM3 5h1v1h-1zM20 5h1v1h-1zM3 6h1v1h-1zM9 6h4v1h-4zM20 6h1v1h-1zM3 7h1v1h-1zM13 7h1v1h-1zM20 7h1v1h-1zM3 8h1v1h-1zM13 8h1v1h-1zM20 8h1v1h-1zM3 9h1v1h-1zM10 9h3v1h-3zM20 9h1v1h-1zM3 10h1v1h-1zM13 10h1v1h-1zM20 10h1v1h-1zM3 11h1v1h-1zM13 11h1v1h-1zM20 11h1v1h-1zM3 12h1v1h-1zM9 12h4v1h-4zM20 12h1v1h-1zM3 13h1v1h-1zM20 13h1v1h-1zM4 14h1v1h-1zM19 14h1v1h-1zM5 15h1v1h-1zM18 15h1v1h-1zM6 16h1v1h-1zM17 16h1v1h-1zM7 17h1v1h-1zM16 17h1v1h-1zM8 18h1v1h-1zM15 18h1v1h-1zM9 19h1v1h-1zM14 19h1v1h-1zM10 20h1v1h-1zM13 20h1v1h-1zM11 21h2v1h-2z" />
        </symbol>
        <symbol id="tech-sass" viewBox="0 0 24 24">
          <path d="M7 2h10v1h-10zM6 3h2v1h-2zM16 3h2v1h-2zM4 4h2v1h-2zM18 4h2v1h-2zM4 5h1v1h-1zM19 5h1v1h-1zM3 6h1v1h-1zM20 6h1v1h-1zM2 7h2v1h-2zM20 7h2v1h-2zM2 8h1v1h-1zM10 8h4v1h-4zM21 8h1v1h-1zM2 9h1v1h-1zM9 9h1v1h-1zM21 9h1v1h-1zM2 10h1v1h-1zM9 10h1v1h-1zM21 10h1v1h-1zM2 11h1v1h-1zM10 11h3v1h-3zM21 11h1v1h-1zM2 12h1v1h-1zM13 12h1v1h-1zM21 12h2v1h-2zM2 13h1v1h-1zM13 13h1v1h-1zM21 13h1v1h-1zM2 14h1v1h-1zM9 14h4v1h-4zM21 14h1v1h-1zM2 15h1v1h-1zM21 15h1v1h-1zM2 16h2v1h-2zM20 16h2v1h-2zM3 17h1v1h-1zM20 17h1v1h-1zM4 18h1v1h-1zM19 18h1v1h-1zM4 19h2v1h-2zM18 19h2v1h-2zM6 20h2v1h-2zM16 20h2v1h-2zM7 21h10v1h-10zM12 22h1v1h-1z" />
        </symbol>
        <symbol id="tech-angular" viewBox="0 0 24 24">
          <path d="M3 2h18v1h-18zM3 3h1v1h-1zM20 3h1v1h-1zM3 4h1v1h-1zM20 4h1v1h-1zM3 5h1v1h-1zM20 5h1v1h-1zM3 6h1v1h-1zM10 6h3v1h-3zM20 6h1v1h-1zM3 7h1v1h-1zM9 7h1v1h-1zM13 7h1v1h-1zM20 7h1v1h-1zM3 8h1v1h-1zM9 8h1v1h-1zM13 8h1v1h-1zM20 8h1v1h-1zM3 9h1v1h-1zM9 9h5v1h-5zM20 9h1v1h-1zM3 10h1v1h-1zM9 10h1v1h-1zM13 10h1v1h-1zM20 10h1v1h-1zM3 11h1v1h-1zM9 11h1v1h-1zM13 11h1v1h-1zM20 11h1v1h-1zM3 12h1v1h-1zM9 12h1v1h-1zM13 12h1v1h-1zM20 12h1v1h-1zM3 13h1v1h-1zM20 13h1v1h-1zM4 14h1v1h-1zM19 14h1v1h-1zM5 15h1v1h-1zM18 15h1v1h-1zM6 16h1v1h-1zM17 16h1v1h-1zM7 17h1v1h-1zM16 17h1v1h-1zM8 18h1v1h-1zM15 18h1v1h-1zM9 19h1v1h-1zM14 19h1v1h-1zM10 20h1v1h-1zM13 20h1v1h-1zM11 21h2v1h-2z" />
        </symbol>
        <symbol id="tech-react" viewBox="0 0 24 24">
          <path d="M6 2h4v1h-4zM14 2h4v1h-4zM5 3h1v1h-1zM10 3h4v1h-4zM18 3h1v1h-1zM5 4h1v1h-1zM11 4h2v1h-2zM18 4h1v1h-1zM5 5h1v1h-1zM10 5h4v1h-4zM18 5h1v1h-1zM5 6h1v1h-1zM9 6h2v1h-2zM13 6h2v1h-2zM18 6h1v1h-1zM5 7h1v1h-1zM7 7h10v1h-10zM18 7h1v1h-1zM3 8h4v1h-4zM8 8h2v1h-2zM14 8h2v1h-2zM17 8h4v1h-4zM2 9h2v1h-2zM5 9h2v1h-2zM8 9h1v1h-1zM15 9h1v1h-1zM17 9h2v1h-2zM20 9h2v1h-2zM1 10h2v1h-2zM6 10h2v1h-2zM10 10h3v1h-3zM16 10h2v1h-2zM21 10h2v1h-2zM1 11h1v1h-1zM6 11h2v1h-2zM10 11h3v1h-3zM16 11h2v1h-2zM22 11h1v1h-1zM0 12h2v1h-2zM6 12h2v1h-2zM10 12h3v1h-3zM16 12h2v1h-2zM22 12h1v1h-1zM1 13h2v1h-2zM6 13h2v1h-2zM16 13h2v1h-2zM21 13h2v1h-2zM2 14h2v1h-2zM5 14h2v1h-2zM8 14h1v1h-1zM15 14h1v1h-1zM17 14h2v1h-2zM20 14h2v1h-2zM3 15h4v1h-4zM8 15h2v1h-2zM14 15h2v1h-2zM17 15h4v1h-4zM5 16h1v1h-1zM7 16h10v1h-10zM18 16h1v1h-1zM5 17h1v1h-1zM9 17h2v1h-2zM13 17h2v1h-2zM18 17h1v1h-1zM5 18h1v1h-1zM10 18h4v1h-4zM18 18h1v1h-1zM5 19h1v1h-1zM11 19h2v1h-2zM18 19h1v1h-1zM5 20h1v1h-1zM10 20h4v1h-4zM18 20h1v1h-1zM6 21h4v1h-4zM14 21h4v1h-4z" />
        </symbol>
        <symbol id="tech-nextjs" viewBox="0 0 24 24">
          <path d="M7 2h10v1h-10zM6 3h2v1h-2zM16 3h2v1h-2zM4 4h2v1h-2zM18 4h2v1h-2zM4 5h1v1h-1zM19 5h1v1h-1zM3 6h1v1h-1zM20 6h1v1h-1zM2 7h2v1h-2zM20 7h2v1h-2zM2 8h1v1h-1zM9 8h1v1h-1zM13 8h1v1h-1zM21 8h1v1h-1zM2 9h1v1h-1zM9 9h2v1h-2zM13 9h1v1h-1zM21 9h1v1h-1zM2 10h1v1h-1zM9 10h1v1h-1zM11 10h1v1h-1zM13 10h1v1h-1zM21 10h1v1h-1zM2 11h1v1h-1zM9 11h1v1h-1zM11 11h1v1h-1zM13 11h1v1h-1zM21 11h1v1h-1zM2 12h1v1h-1zM9 12h1v1h-1zM12 12h2v1h-2zM21 12h2v1h-2zM2 13h1v1h-1zM9 13h1v1h-1zM13 13h1v1h-1zM21 13h1v1h-1zM2 14h1v1h-1zM9 14h1v1h-1zM13 14h1v1h-1zM21 14h1v1h-1zM2 15h1v1h-1zM21 15h1v1h-1zM2 16h2v1h-2zM20 16h2v1h-2zM3 17h1v1h-1zM20 17h1v1h-1zM4 18h1v1h-1zM19 18h1v1h-1zM4 19h2v1h-2zM18 19h2v1h-2zM6 20h2v1h-2zM16 20h2v1h-2zM7 21h10v1h-10zM12 22h1v1h-1z" />
        </symbol>
        <symbol id="tech-nodejs" viewBox="0 0 24 24">
          <path d="M11 1h1v1h-1zM9 2h2v1h-2zM12 2h2v1h-2zM8 3h1v1h-1zM14 3h2v1h-2zM6 4h2v1h-2zM16 4h2v1h-2zM4 5h2v1h-2zM18 5h2v1h-2zM3 6h1v1h-1zM20 6h1v1h-1zM3 7h1v1h-1zM20 7h1v1h-1zM3 8h1v1h-1zM9 8h1v1h-1zM13 8h1v1h-1zM20 8h1v1h-1zM3 9h1v1h-1zM9 9h2v1h-2zM13 9h1v1h-1zM20 9h1v1h-1zM3 10h1v1h-1zM9 10h1v1h-1zM11 10h1v1h-1zM13 10h1v1h-1zM20 10h1v1h-1zM3 11h1v1h-1zM9 11h1v1h-1zM11 11h1v1h-1zM13 11h1v1h-1zM20 11h1v1h-1zM3 12h1v1h-1zM9 12h1v1h-1zM12 12h2v1h-2zM20 12h1v1h-1zM3 13h1v1h-1zM9 13h1v1h-1zM13 13h1v1h-1zM20 13h1v1h-1zM3 14h1v1h-1zM9 14h1v1h-1zM13 14h1v1h-1zM20 14h1v1h-1zM3 15h1v1h-1zM20 15h1v1h-1zM3 16h1v1h-1zM20 16h1v1h-1zM3 17h1v1h-1zM20 17h1v1h-1zM4 18h2v1h-2zM18 18h2v1h-2zM6 19h1v1h-1zM16 19h2v1h-2zM7 20h2v1h-2zM14 20h2v1h-2zM9 21h2v1h-2zM12 21h2v1h-2zM11 22h1v1h-1z" />
        </symbol>
        <symbol id="tech-tailwind" viewBox="0 0 24 24">
          <path d="M15 4h5v1h-5zM13 5h9v1h-9zM2 6h1v1h-1zM12 6h3v1h-3zM20 6h2v1h-2zM2 7h3v1h-3zM10 7h3v1h-3zM3 8h9v1h-9zM5 9h5v1h-5zM15 11h5v1h-5zM13 12h9v1h-9zM2 13h1v1h-1zM12 13h3v1h-3zM20 13h2v1h-2zM2 14h3v1h-3zM10 14h3v1h-3zM3 15h9v1h-9zM5 16h5v1h-5z" />
        </symbol>
        <symbol id="tech-cypress" viewBox="0 0 24 24">
          <path d="M7 2h10v1h-10zM6 3h2v1h-2zM16 3h2v1h-2zM4 4h2v1h-2zM18 4h2v1h-2zM4 5h1v1h-1zM19 5h1v1h-1zM3 6h1v1h-1zM11 6h1v1h-1zM20 6h1v1h-1zM2 7h2v1h-2zM9 7h6v1h-6zM20 7h2v1h-2zM2 8h1v1h-1zM8 8h1v1h-1zM15 8h1v1h-1zM21 8h1v1h-1zM2 9h1v1h-1zM7 9h1v1h-1zM21 9h1v1h-1zM2 10h1v1h-1zM7 10h1v1h-1zM21 10h1v1h-1zM2 11h1v1h-1zM7 11h1v1h-1zM21 11h1v1h-1zM2 12h1v1h-1zM6 12h2v1h-2zM21 12h2v1h-2zM2 13h1v1h-1zM7 13h1v1h-1zM21 13h1v1h-1zM2 14h1v1h-1zM7 14h1v1h-1zM21 14h1v1h-1zM2 15h1v1h-1zM8 15h1v1h-1zM15 15h1v1h-1zM21 15h1v1h-1zM2 16h2v1h-2zM9 16h6v1h-6zM20 16h2v1h-2zM3 17h1v1h-1zM20 17h1v1h-1zM4 18h1v1h-1zM19 18h1v1h-1zM4 19h2v1h-2zM18 19h2v1h-2zM6 20h2v1h-2zM16 20h2v1h-2zM7 21h10v1h-10zM12 22h1v1h-1z" />
        </symbol>
        <symbol id="tech-graphql" viewBox="0 0 24 24">
          <path d="M10 1h3v1h-3zM10 2h3v1h-3zM9 3h5v1h-5zM8 4h1v1h-1zM14 4h2v1h-2zM7 5h1v1h-1zM16 5h1v1h-1zM3 6h4v1h-4zM17 6h4v1h-4zM3 7h3v1h-3zM18 7h3v1h-3zM3 8h3v1h-3zM18 8h3v1h-3zM4 9h1v1h-1zM19 9h1v1h-1zM4 10h1v1h-1zM19 10h1v1h-1zM4 11h1v1h-1zM19 11h1v1h-1zM4 12h1v1h-1zM19 12h1v1h-1zM4 13h1v1h-1zM19 13h1v1h-1zM4 14h1v1h-1zM19 14h1v1h-1zM3 15h3v1h-3zM18 15h3v1h-3zM3 16h3v1h-3zM18 16h3v1h-3zM3 17h4v1h-4zM17 17h4v1h-4zM7 18h1v1h-1zM15 18h2v1h-2zM8 19h1v1h-1zM14 19h1v1h-1zM9 20h5v1h-5zM10 21h3v1h-3zM10 22h3v1h-3z" />
        </symbol>
      </defs>
    </svg>
  );
}

export function TechIcon({
  name,
  className,
}: {
  name: TechIconName;
  className?: string | undefined;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      shapeRendering="crispEdges"
      className={cn("size-4 fill-current", className)}
    >
      <use href={`#tech-${name}`} />
    </svg>
  );
}
