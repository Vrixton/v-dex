import { SKILL_PREFIX, type SkillKind } from "@/content/skills";
import { cn } from "@/lib/cn";

type ChipProps = {
  kind: SkillKind;
  children: string;
  className?: string | undefined;
};

// El prefijo lleva el color; el texto se queda blanco para que se lea bien.
const prefixClass: Record<SkillKind, string> = {
  technical: "text-brand-cyan",
  personal: "text-fg-danger",
  communication: "text-brand-yellow",
};

const borderClass: Record<SkillKind, string> = {
  technical: "border-brand-cyan/50",
  personal: "border-fg-danger/50",
  communication: "border-brand-yellow/50",
};

/**
 * Etiqueta de skill. El prefijo indica el tipo (técnica, personal o de
 * comunicación) y se lee también en el texto oculto, para que la
 * clasificación no dependa solo del color.
 *
 * El prefijo va posicionado a la izquierda y fuera del flujo: así el texto
 * se centra respecto al chip entero y no respecto al hueco que le deja.
 */
export function Chip({ kind, children, className }: ChipProps) {
  return (
    <li
      className={cn(
        // grow reparte el espacio sobrante entre los chips de cada fila, así
        // el bloque queda alineado por los dos lados en vez de dejar huecos.
        "relative flex grow items-center justify-center rounded-control border bg-surface px-3 py-1 text-xs whitespace-nowrap md:text-sm",
        borderClass[kind],
        className,
      )}
    >
      <span aria-hidden="true" className={cn("absolute left-3", prefixClass[kind])}>
        {SKILL_PREFIX[kind]}
      </span>
      <span className="sr-only">{`${kind}: `}</span>
      <span className="px-7 text-fg">{children}</span>
    </li>
  );
}
