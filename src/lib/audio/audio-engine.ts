import { SOUNDS, type SoundName, type SoundSpec } from "./sound-catalog";

/** Segundos de ruido pregenerado. Se reutiliza en cada reproducción. */
const NOISE_SECONDS = 1;
/** Ataque corto: arrancar desde cero de golpe produce un chasquido audible. */
const ATTACK = 0.008;
/** Las rampas exponenciales no admiten llegar a cero. */
const SILENCE = 0.0001;

/**
 * Motor de audio del dispositivo.
 *
 * Un único AudioContext, creado en el primer gesto del usuario: los
 * navegadores bloquean el audio hasta que alguien interactúa, y en nuestro
 * caso ese gesto es el interruptor de sonido.
 *
 * Cada reproducción monta una cadena desechable (fuente → filtro → ganancia)
 * y el navegador libera los nodos al terminar, así que no hay nada que
 * limpiar. El búfer de ruido sí se guarda, porque generarlo cuesta.
 */
class AudioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  /** Crea o reanuda el contexto. Debe llamarse desde un evento del usuario. */
  async start(): Promise<void> {
    if (typeof window === "undefined") return;

    this.context ??= new AudioContext();
    this.master ??= this.createMaster(this.context);

    if (this.context.state === "suspended") {
      await this.context.resume();
    }
  }

  /** true si el contexto existe y puede sonar ya. */
  isRunning(): boolean {
    return this.context?.state === "running";
  }

  play(name: SoundName): void {
    const context = this.context;
    const master = this.master;
    if (!context || !master || context.state !== "running") return;

    const spec = SOUNDS[name];
    const now = context.currentTime;
    const end = now + spec.duration;

    const { source, output } = this.createSource(context, spec, now, end);
    const gain = this.createEnvelope(context, spec, now, end);

    output.connect(gain);
    gain.connect(master);

    source.start(now);
    source.stop(end + 0.02);
  }

  private createMaster(context: AudioContext): GainNode {
    const master = context.createGain();
    master.gain.value = 1;
    master.connect(context.destination);
    return master;
  }

  /** Devuelve la fuente (para arrancarla) y el último nodo de la cadena. */
  private createSource(
    context: AudioContext,
    spec: SoundSpec,
    now: number,
    end: number,
  ): { source: AudioScheduledSourceNode; output: AudioNode } {
    if (spec.source === "noise") {
      const source = context.createBufferSource();
      source.buffer = this.getNoiseBuffer(context);
      source.loop = true;

      // En el ruido, el barrido lo hace el filtro: es lo que da la sensación
      // de mecanismo que se cierra o se abre, en vez de una nota.
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.value = spec.resonance ?? 1;
      filter.frequency.setValueAtTime(spec.from, now);
      if (spec.to !== undefined) {
        filter.frequency.exponentialRampToValueAtTime(spec.to, end);
      }

      source.connect(filter);
      return { source, output: filter };
    }

    const oscillator = context.createOscillator();
    oscillator.type = spec.source;

    if (spec.steps) {
      // Arpegio: cada nota entra de golpe, sin interpolar. Ese salto seco
      // entre notas es lo que da el carácter de consola portátil.
      const noteDuration = spec.duration / spec.steps.length;
      spec.steps.forEach((note, index) => {
        oscillator.frequency.setValueAtTime(note, now + index * noteDuration);
      });
    } else {
      oscillator.frequency.setValueAtTime(spec.from, now);
      if (spec.to !== undefined) {
        // Rampa exponencial: el oído percibe el tono en escala logarítmica,
        // así que un barrido lineal sonaría desigual.
        oscillator.frequency.exponentialRampToValueAtTime(spec.to, end);
      }
    }

    if (spec.cutoff === undefined) {
      return { source: oscillator, output: oscillator };
    }

    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = spec.cutoff;
    oscillator.connect(filter);
    return { source: oscillator, output: filter };
  }

  private createEnvelope(
    context: AudioContext,
    spec: SoundSpec,
    now: number,
    end: number,
  ): GainNode {
    const gain = context.createGain();
    gain.gain.setValueAtTime(SILENCE, now);
    gain.gain.linearRampToValueAtTime(spec.volume, now + ATTACK);

    // Sostiene el nivel y solo entonces cae: así el sonido dura lo que dura
    // el movimiento, en lugar de extinguirse en el primer tercio.
    const holdUntil = now + spec.duration * (spec.hold ?? 0);
    if (holdUntil > now + ATTACK) {
      gain.gain.setValueAtTime(spec.volume, holdUntil);
    }

    gain.gain.exponentialRampToValueAtTime(SILENCE, end);
    return gain;
  }

  private getNoiseBuffer(context: AudioContext): AudioBuffer {
    if (this.noiseBuffer) return this.noiseBuffer;

    const length = context.sampleRate * NOISE_SECONDS;
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      channel[i] = Math.random() * 2 - 1;
    }

    this.noiseBuffer = buffer;
    return buffer;
  }
}

export const audioEngine = new AudioEngine();
