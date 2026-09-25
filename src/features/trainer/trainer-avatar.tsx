import { BracketFrame } from "@/components/ui/bracket-frame";
import { PROFILE } from "@/content/profile";
import { completedYears, yearProgress } from "@/lib/date";

/** Proporción de un fotograma del sprite (80x168 px nativos). */
const SPRITE_RATIO = "80 / 168";
/** Fotogramas de la hoja: el ancho del fondo es este porcentaje. */
const FRAMES = 7;

/**
 * Ficha del trainer: sprite, nivel y barra de experiencia.
 *
 * No fija alto: la fila del grid iguala su altura a la de la bio, así las
 * dos tarjetas terminan a la misma altura sea cual sea el texto.
 *
 * El sprite se anima moviendo el fondo con steps(7): sin JavaScript, sin
 * peticiones extra y con la animación en el compositor. El nivel y los años
 * salen de las fechas del perfil, así que suben solos con el tiempo.
 *
 * Entrada escalonada, como un escáner enfocando: primero las esquinas se
 * abren desde el centro, después aparece el sprite y al final los datos.
 * Los retardos están escritos en el orden en que ocurren.
 */
export function TrainerAvatar() {
  const level = completedYears(PROFILE.birthDate);
  const years = completedYears(PROFILE.careerStart);
  const progress = Math.round(yearProgress(PROFILE.careerStart) * 100);

  return (
    <div className="[container-type:size] relative min-h-[200px] w-full overflow-hidden rounded-panel border border-white/10 bg-surface md:w-80">
      {/* Marco HUD por dentro, separado del borde de la tarjeta */}
      <BracketFrame animated className="inset-4 text-brand-cyan" />

      {/* Nivel y barra van superpuestos, no en el flujo: así el sprite
          dispone de todo el alto de la tarjeta y se ve a buen tamaño. */}
      <p className="absolute top-5 left-5 z-10 w-fit rounded-panel border-2 border-level-border bg-level-bg px-3 py-1 text-sm text-level [animation-delay:600ms] group-data-[ready=true]/screen:motion-safe:animate-hud-in">
        {`LVL.${level}`}
      </p>

      {/* El sprite ocupa la tarjeta entera; el nivel y la barra solo se
          superponen encima, sin quitarle espacio. */}
      <div className="absolute inset-0 flex items-center justify-center p-3 [animation-delay:250ms] group-data-[ready=true]/screen:motion-safe:animate-sprite-in">
        <span
          role="img"
          aria-label={`Pixel art avatar of ${PROFILE.name}`}
          className="h-full bg-[url('/trainer-sheet.webp')] bg-no-repeat motion-safe:animate-trainer-idle"
          style={{
            aspectRatio: SPRITE_RATIO,
            backgroundSize: `${FRAMES * 100}% 100%`,
            imageRendering: "pixelated",
          }}
        />
      </div>

      {/*
        Barra de experiencia, en tres capas como en el diseño:
        1. La banda de fondo, con un degradado de transparente a amarillo.
        2. El carril amarillo: representa el 100% de la experiencia.
        3. El relleno blanco degradado: lo que llevas del año en curso.

        No ocupa todo el ancho y se sale por la derecha: es un HUD pegado a
        la esquina, no una fila más de la tarjeta.
      */}
      <div className="absolute right-0 bottom-5 z-10 flex w-[70%] items-center gap-2 rounded-l-full bg-gradient-to-r from-transparent to-[color-mix(in_oklab,var(--vdex-yellow-400)_40%,transparent)] py-1.5 pr-3 pl-2 [animation-delay:750ms] group-data-[ready=true]/screen:motion-safe:animate-exp-in">
        <span className="text-sm text-fg">EXP.</span>
        <div
          className="relative h-4 flex-1 overflow-hidden rounded-full bg-brand-yellow"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${years} years of experience, progress toward the next one`}
        >
          <div
            className="flex h-full items-center rounded-full bg-gradient-to-r from-white/80 to-white/20 px-2"
            style={{ width: `${Math.max(progress, 70)}%` }}
          >
            <span className="text-[10px] whitespace-nowrap text-screen md:text-xs">
              {`+${years} years`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
