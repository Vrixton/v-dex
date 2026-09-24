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
