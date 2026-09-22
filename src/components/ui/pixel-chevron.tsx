import { cn } from "@/lib/cn";

/**
 * Cursor ">" en estilo pixel art. Va en SVG y no en imagen para heredar el
 * color con currentColor y verse nítido a cualquier tamaño.
 * shapeRendering="crispEdges" evita que el navegador suavice los bordes.
 */
export function PixelChevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 10"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
      fill="currentColor"
      className={cn("size-3 md:size-4", className)}
    >
      <path d="M1 0h2v2H1zM3 2h2v2H3zM5 4h2v2H5zM3 6h2v2H3zM1 8h2v2H1z" />
    </svg>
  );
}
