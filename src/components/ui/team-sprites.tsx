/** Tamaño nativo de cada figura en team-sheet.webp. */
const FRAME_W = 16;
const FRAME_H = 20;
/** Escala entera: con pixel art, media escala deforma los píxeles. */
const SCALE = 1.4;

/**
 * El equipo del proyecto, en figuras: la primera eres tú y el resto son
 * compañeros.
 *
 * Dos dibujos en una hoja de 200 bytes, y la figura que toca se elige
 * moviendo el fondo. Es decorativo: el número va en texto al lado, que es
 * lo que anuncia un lector de pantalla.
 */
export function TeamSprites({ size }: { size: number }) {
  // Más de ocho figuras se convierten en una mancha: ahí manda el número
  const shown = Math.min(size, 8);

  return (
    <span aria-hidden="true" className="flex items-end gap-0.5">
      {Array.from({ length: shown }, (_, index) => (
        <span
          key={index}
          className="block bg-[url('/team-sheet.webp')] bg-no-repeat"
          style={{
            width: FRAME_W * SCALE,
            height: FRAME_H * SCALE,
            backgroundSize: `${FRAME_W * 2 * SCALE}px ${FRAME_H * SCALE}px`,
            // La primera figura es la tuya; el resto, el compañero genérico
            backgroundPosition: index === 0 ? "0 0" : `${-FRAME_W * SCALE}px 0`,
            imageRendering: "pixelated",
          }}
        />
      ))}
    </span>
  );
}
