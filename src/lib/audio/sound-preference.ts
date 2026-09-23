const STORAGE_KEY = "vdex:sound";

let cached: boolean | null = null;
const listeners = new Set<() => void>();

function read(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    // Modo privado o almacenamiento bloqueado: el sonido sigue funcionando,
    // simplemente no se recuerda entre visitas.
    return false;
  }
}

export function subscribeToSoundPreference(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSoundPreference(): boolean {
  cached ??= read();
  return cached;
}

/** En el servidor el sonido siempre está apagado: no hay nada que reproducir. */
export function getServerSoundPreference(): boolean {
  return false;
}

export function setSoundPreference(enabled: boolean): void {
  cached = enabled;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // Sin persistencia, pero la sesión actual funciona igual
  }
  for (const listener of listeners) listener();
}
