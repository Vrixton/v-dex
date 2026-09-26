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
    `**Frontend developer** with {years}+ years building production web apps in **Angular** and **React**. I led the frontend team at a national pharmacy retailer, setting priorities and mentoring developers. I like the unglamorous part of the job: profiling with Lighthouse, trimming bundle size and fixing **Core Web Vitals** regressions until a page feels instant. This site is built the same way: no images for the UI, no animation loops running when nothing moves.`,
  ],
} as const;
