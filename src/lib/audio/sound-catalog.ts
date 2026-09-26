/**
 * Diseño sonoro del V-DEX, como datos.
 *
 * Nada de archivos de audio: todo se sintetiza con Web Audio, así que el
 * coste en bundle es cero y afinar el sonido es tocar solo este archivo.
 *
 * El lenguaje es chiptune, como el de una consola portátil de los 90: onda
 * cuadrada y arpegios (notas cortas encadenadas) en lugar de barridos
 * continuos. Ese salto entre notas es justo lo que suena "a Game Boy";
 * un barrido suave suena moderno, que es lo contrario de lo que queremos.
 *
 * Tres formas de definir el tono:
 * - steps: la secuencia de notas del arpegio, repartidas en la duración.
 * - from + to: barrido continuo entre dos frecuencias.
 * - from solo: una nota fija.
 */

export type SoundSpec = {
  source: OscillatorType | "noise";
  /** Hz. Nota inicial; con steps, coincide con la primera del arpegio. */
  from: number;
  /** Hz final, si hay barrido continuo. */
  to?: number;
  /** Notas del arpegio, repartidas por igual en la duración. */
  steps?: readonly number[];
  /** Duración en segundos. */
  duration: number;
  /** Volumen relativo, de 0 a 1. */
  volume: number;
  /** Corte del filtro paso bajo, para redondear la aspereza de la cuadrada. */
  cutoff?: number;
  /** Solo ruido: resonancia del filtro. */
  resonance?: number;
  /**
   * Fracción de la duración (0-1) que mantiene el volumen antes de apagarse.
   * En un arpegio conviene que sea alto: si cae pronto, las últimas notas
   * no se oyen.
   */
  hold?: number;
};

export type SoundName = keyof typeof SOUNDS;

/** Notas, para que los arpegios se lean como música y no como números. */
const NOTE = {
  A4: 440,
  A5: 880,
  C5: 523,
  C6: 1046,
  C7: 2093,
  D5: 587,
  E4: 330,
  E5: 659,
  E6: 1318,
  E7: 2637,
  G5: 784,
  G7: 3136,
} as const;

export const SOUNDS = {
  /** Las láminas se cierran: arpegio descendente, como un menú que se cierra. */
  shutterClose: {
    source: "square",
    from: 988,
    steps: [988, 880, 784, 698, 622, 554, 494, 440],
    duration: 0.26,
    volume: 0.012,
    cutoff: 4200,
    hold: 0.85,
  },
  shutterOpen: {
    source: "square",
    from: 440,
    steps: [440, 494, 554, 622, 698, 784, 880, 988],
    duration: 0.26,
    volume: 0.012,
    cutoff: 4200,
    hold: 0.85,
  },
  /** Mover el cursor por el menú: un blip agudo y seco. */
  hover: { source: "square", from: NOTE.C6, duration: 0.035, volume: 0.03, cutoff: 3500 },
  /** Elegir una opción: dos notas ascendentes, el "confirmar" de toda la vida. */
  select: {
    source: "square",
    from: NOTE.A5,
    steps: [NOTE.A5, NOTE.E6],
    duration: 0.12,
    volume: 0.07,
    cutoff: 3500,
    hold: 0.9,
  },
  /** Pulsar el botón central: más grave que el de menú, para distinguirlos. */
  click: {
    source: "square",
    from: NOTE.C5,
    steps: [NOTE.C5, NOTE.G5],
    duration: 0.1,
    volume: 0.05,
    cutoff: 3000,
    hold: 0.9,
  },
  /** Al activar el sonido: arpegio de encendido. */
  power: {
    source: "triangle",
    from: NOTE.C5,
    steps: [NOTE.C5, NOTE.E5, NOTE.G5, NOTE.C6],
    duration: 0.3,
    volume: 0.08,
    hold: 0.9,
  },
  badge: {
    source: "sine",
    from: NOTE.C7,
    steps: [NOTE.C7, NOTE.G7],
    duration: 0.12,
    volume: 0.03,
    hold: 0.2,
  },
} as const satisfies Record<string, SoundSpec>;

/** Tope de volumen. El dispositivo acompaña; no debe competir con nada. */
export const MAX_VOLUME = 0.2;
