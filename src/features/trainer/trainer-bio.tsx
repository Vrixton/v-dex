import { Terminal, TerminalCursor } from "@/components/ui/terminal";
import { PROFILE } from "@/content/profile";
import { completedYears } from "@/lib/date";
import { highlight } from "@/lib/rich-text";

/**
 * Bio del trainer, como la salida de una consola.
 *
 * Reutiliza el componente Terminal en vez de recrearlo: así la cabecera, el
 * estado y el cursor son idénticos a los de las fichas de proyecto.
 *
 * Los años no están escritos en el texto: se interpolan desde la fecha de
 * inicio de carrera, así la bio nunca se queda desactualizada.
 */
export function TrainerBio() {
  const years = completedYears(PROFILE.careerStart);
  const lines = PROFILE.bio.map((line) => line.replace("{years}", String(years)));

  return (
    <Terminal program="TRAINER_BIO">
      {lines.map((line, index) => (
        <p key={line}>
          {highlight(line)}
          {index === lines.length - 1 ? <TerminalCursor /> : null}
        </p>
      ))}
    </Terminal>
  );
}
