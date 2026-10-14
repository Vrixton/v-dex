/**
 * Rellena los marcadores `{clave}` de un texto del catálogo.
 *
 *   format("+{years} años", { years: 10 })  →  "+10 años"
 *
 * Un marcador sin valor se deja tal cual en vez de desaparecer: si falta un
 * dato, que se vea `{years}` en pantalla y lo arreglemos, en lugar de una
 * frase que parece correcta pero ha perdido el número.
 */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
