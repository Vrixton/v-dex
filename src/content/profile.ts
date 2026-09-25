/**
 * Datos del trainer.
 *
 * Todo el texto vive aquí y no dentro de los componentes: el día que haya
 * una segunda versión en español, esto pasa a PROFILE.en / PROFILE.es y las
 * vistas no cambian.
 */

export const PROFILE = {
  name: "Victor Villavicencio",
  role: "Sr. Front End Developer && Tech Lead && Pokémon Trainer",
  /** El nivel es la edad, y se calcula a partir de aquí. */
  birthDate: "1996-02-25",
  /** Primer trabajo como programador: Tsserapp, agosto de 2016. */
  careerStart: "2016-08-01",
  bio: [
    `Frontend developer with {years}+ years building production web applications in Angular and React. 
    Strong in TypeScript, modern CSS (Flexbox, Grid, SCSS), component architecture, and REST and GraphQL integration.
    Led the frontend team at a national pharmacy retailer, setting priorities and mentoring developers.
    Comfortable taking a feature from design handoff through testing, code review, and release.
    Particular strength in web performance: profiling with Lighthouse, trimming bundle size, and fixing Core Web Vitals regressions.`,
  ],
} as const;
