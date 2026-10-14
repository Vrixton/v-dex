import type { TechIconName } from "@/components/ui/tech-icons";

export type MedalLevel = "gold" | "silver" | "bronze" | "locked";

export type Technology = {
  name: string;
  level: MedalLevel;
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
  { icon: "nextjs", name: "Next.js", level: "gold" },
  { icon: "nodejs", name: "Node.js", level: "silver" },
  { icon: "tailwind", name: "Tailwind CSS", level: "silver" },
  { icon: "cypress", name: "Cypress", level: "silver" },
  { icon: "graphql", name: "GraphQL", level: "silver" },
];

export const CONQUERED = TECHNOLOGIES.filter((tech) => tech.level === "gold").length;
