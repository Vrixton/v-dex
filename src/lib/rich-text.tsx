import type { ReactNode } from "react";

/**
 * Resalta los tramos marcados con **asteriscos** dentro de un texto.
 *
 * El marcado va en el propio contenido y no en una lista aparte de palabras:
 * así se ve qué se resalta al leer la frase, y no hay que mantener dos sitios
 * sincronizados. Es el mismo convenio que Markdown, que cualquiera reconoce.
 */
export function highlight(text: string, className = "text-brand-cyan"): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((chunk, index) =>
    // Los tramos impares son los que iban entre asteriscos
    index % 2 === 1 ? (
      <span key={`${chunk}-${index}`} className={className}>
        {chunk}
      </span>
    ) : (
      chunk
    ),
  );
}

/** Versión en texto plano, para atributos y metadatos. */
export function stripHighlight(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}
