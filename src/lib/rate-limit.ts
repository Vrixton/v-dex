/**
 * Límite de envíos por IP.
 *
 * El contador vive en memoria: en Vercel las funciones son efímeras, así
 * que el recuento puede reiniciarse entre invocaciones. Frena el abuso
 * casual, que es el caso real de un portafolio; para algo infalible haría
 * falta almacenamiento externo, y no compensa aquí.
 */

const WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_PER_WINDOW = 2;

const hits = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string, now: number = Date.now()): boolean {
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_PER_WINDOW) return false;

  entry.count += 1;
  return true;
}
