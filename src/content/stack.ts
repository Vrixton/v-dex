import type { TechIconName } from "@/components/ui/tech-icons";

/**
 * Medallas de gimnasio: el stack.
 *
 * El metal indica el dominio, no la antigüedad:
 *   gold   buen manejo
 *   silver intermedio
 *   bronze bajo
 *
 * La lista es corta a propósito. Enumerar todo lo que uno ha tocado alguna
 * vez resta credibilidad: mejor doce que se sostienen en una entrevista que
 * veinte donde la mitad se probó una semana. Lo demás (AngularJS, Bootstrap,
 * Liquid, herramientas) vive en el CV, donde se puede matizar el contexto.
 */

export type MedalLevel = "gold" | "silver" | "bronze" | "locked";

export type Technology = {
  name: string;
  level: MedalLevel;
  /** Icono del sprite de tecnologías. */
  icon: TechIconName;
};

export const TECHNOLOGIES: readonly Technology[] = [
  { icon: "typescript", name: "TypeScript", level: "gold" },
  { icon: "javascript", name: "JavaScript", level: "gold" },
  { icon: "html5", name: "HTML5", level: "gold" },
  { icon: "css3", name: "CSS3", level: "gold" },
  { icon: "sass", name: "SCSS / Sass", level: "gold" },
  { icon: "angular", name: "Angular", level: "gold" },
  { icon: "react", name: "React", level: "gold" },
  { icon: "nextjs", name: "Next.js", level: "silver" },
  { icon: "nodejs", name: "Node.js", level: "silver" },
  { icon: "tailwind", name: "Tailwind CSS", level: "silver" },
  { icon: "cypress", name: "Cypress", level: "silver" },
  { icon: "graphql", name: "GraphQL", level: "silver" },
];

export const CONQUERED = TECHNOLOGIES.filter((tech) => tech.level === "gold").length;
