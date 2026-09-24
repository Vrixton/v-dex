import { PROFILE } from "@/content/profile";
import { completedYears } from "@/lib/date";

/** Separación entre líneas al imprimirse. */
const LINE_MS = 140;
/** Retardo inicial, para que entre después del marco de la ficha. */
const START_MS = 250;

/**
 * Bio del trainer, presentada como la salida de una consola.
 *
 * Las líneas se imprimen una detrás de otra, como un programa escupiendo
 * resultado. Cada línea entra entera con un fundido corto en vez de
 * teclearse carácter a carácter: probado, lo segundo obliga a partir el
 * texto a un ancho fijo, descuadra la maqueta y alarga la lectura varios
 * segundos para un detalle que se ve una vez.
 *
 * Es puro CSS y el texto está completo en el HTML desde el primer render,
 * así que buscadores y lectores de pantalla lo ven entero.
 */
export function TrainerBio() {
  const years = completedYears(PROFILE.careerStart);
  const lines = PROFILE.bio.map((line) => line.replace("{years}", String(years)));

  return (
    <article className="flex flex-col gap-3 rounded-panel bg-terminal p-4 md:p-6">
      <header className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm text-status-ok">
          <span aria-hidden="true">{">_ "}</span>
          TRAINER_BIO.EXE
        </h3>
        <p className="text-xs text-fg-muted">STATUS: ACTIVE</p>
      </header>

      <div className="flex flex-col gap-2 text-sm leading-relaxed text-fg">
        {lines.map((line, index) => (
          <p key={line} style={{ animationDelay: `${START_MS + index * LINE_MS}ms` }}>
            {index === 0 ? <span className="text-brand-cyan">Frontend developer </span> : null}
            {index === 0 ? line.replace("Frontend developer ", "") : line}
          </p>
        ))}
      </div>

      {/* El prompt aparece cuando termina de imprimirse todo */}
      <p
        className="flex items-center gap-2 text-sm text-status-ok"
        style={{ animationDelay: `${START_MS + lines.length * LINE_MS}ms` }}
        aria-hidden="true"
      >
        <span>{">_"}</span>
        <span className="inline-block h-[1em] w-[0.5em] bg-status-ok motion-safe:animate-cursor-blink" />
      </p>
    </article>
  );
}
