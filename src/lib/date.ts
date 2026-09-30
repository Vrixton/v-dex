/**
 * Nivel y experiencia calculados.
 *
 * Escribir "30" y "+8 years" a mano garantiza que algún día estén mal: de
 * hecho la bio decía 8 años cuando ya eran 10. Derivarlo de dos fechas
 * significa que la ficha nunca se queda vieja.
 *
 * Funciones puras y con la fecha inyectable, para poder testearlas.
 */

/** Años completos transcurridos desde una fecha ISO. */
export function completedYears(isoDate: string, now: Date = new Date()): number {
  const start = new Date(`${isoDate}T00:00:00Z`);
  let years = now.getUTCFullYear() - start.getUTCFullYear();

  const beforeAnniversary =
    now.getUTCMonth() < start.getUTCMonth() ||
    (now.getUTCMonth() === start.getUTCMonth() && now.getUTCDate() < start.getUTCDate());

  if (beforeAnniversary) years -= 1;
  return Math.max(0, years);
}

/**
 * Progreso hacia el próximo aniversario, de 0 a 1.
 * Es lo que llena la barra de experiencia, así que avanza sola cada día.
 */
export function yearProgress(isoDate: string, now: Date = new Date()): number {
  const start = new Date(`${isoDate}T00:00:00Z`);
  const years = completedYears(isoDate, now);

  const last = Date.UTC(start.getUTCFullYear() + years, start.getUTCMonth(), start.getUTCDate());
  const next = Date.UTC(
    start.getUTCFullYear() + years + 1,
    start.getUTCMonth(),
    start.getUTCDate(),
  );

  const progress = (now.getTime() - last) / (next - last);
  return Math.min(1, Math.max(0, progress));
}

/** Nombres de mes en inglés, que es el idioma de la interfaz. */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** "2021-03" → "Mar 2021". Sin fin, el periodo sigue abierto. */
export function formatPeriod(start: string, end?: string): string {
  const from = formatMonth(start);
  return end ? `${from} — ${formatMonth(end)}` : `${from} — present`;
}

function formatMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS[(month ?? 1) - 1]} ${year}`;
}

/**
 * Duración entre dos fechas, en años y meses.
 *
 * Sin fecha de fin cuenta hasta hoy, así un puesto en curso no se queda
 * congelado. Es el dato que el visitante suma mentalmente al leer el
 * periodo: darlo hecho ahorra ese cálculo.
 */
export function duration(start: string, end?: string): string {
  const [startYear, startMonth] = start.split("-").map(Number);
  const now = new Date();
  const [endYear, endMonth] = end
    ? end.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];

  const months = (endYear! - startYear!) * 12 + (endMonth! - startMonth!) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;

  if (years === 0) return `${rest}m`;
  if (rest === 0) return `${years}y`;
  return `${years}y ${rest}m`;
}
