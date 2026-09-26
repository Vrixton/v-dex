/**
 * Barrido de refresco del tubo.
 *
 * Son tres capas por un motivo concreto: los porcentajes de translate se
 * calculan sobre la altura del PROPIO elemento, así que una línea de 1px
 * solo recorrería 1px. El carril mide lo mismo que la ventana, se desplaza
 * él, y la línea viaja dentro. Solo se anima transform, que va en el
 * compositor y no repinta el contenido.
 *
 * Vive aparte de Window porque es decoración, no estructura: aquí se ajusta
 * su intensidad sin tocar el marco, la cabecera ni el scroll.
 */
export function CrtSweep() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden motion-reduce:hidden"
    >
      <span className="absolute inset-0 motion-safe:animate-crt-sweep">
        {/* Halo suave */}
        <span className="absolute inset-x-0 top-0 h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-sweep to-transparent opacity-10" />
        {/* Línea del haz */}
        <span className="absolute inset-x-0 top-0 h-px bg-brand-cyan/4 shadow-glow-md" />
      </span>
    </span>
  );
}
