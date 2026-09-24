/**
 * Medallas de gimnasio: el stack.
 *
 * El metal indica el dominio, no la antigüedad:
 *   gold   buen manejo
 *   silver intermedio
 *   bronze bajo
 *
 * Ajusta el nivel de cada una a tu criterio; es el único sitio donde vive
 * ese dato. El contador de "conquistadas" cuenta las de oro.
 */

export type MedalLevel = "gold" | "silver" | "bronze" | "locked";

export type Technology = {
  name: string;
  level: MedalLevel;
};

export const TECHNOLOGIES: readonly Technology[] = [
  { name: "TypeScript", level: "gold" },
  { name: "JavaScript", level: "gold" },
  { name: "Angular", level: "gold" },
  { name: "React", level: "gold" },
  { name: "HTML5", level: "gold" },
  { name: "CSS3", level: "gold" },
  { name: "SCSS / Sass", level: "gold" },
  { name: "Next.js", level: "silver" },
  { name: "Node.js", level: "silver" },
  { name: "AngularJS", level: "silver" },
  { name: "Angular Material", level: "silver" },
  { name: "Tailwind CSS", level: "silver" },
  { name: "Bootstrap", level: "silver" },
  { name: "Liquid", level: "bronze" },
];

export const CONQUERED = TECHNOLOGIES.filter((tech) => tech.level === "gold").length;
