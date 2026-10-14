import type { LogoName } from "@/components/ui/project-logo";
import type { TechIconName } from "@/components/ui/tech-icons";
import type { Messages } from "@/i18n/messages";

export type ProjectId = keyof Messages["projects"]["items"];

export type ProjectType = keyof Messages["projects"]["types"];

export type Project = {
  number: number;
  slug: ProjectId;
  name: string;
  logo: LogoName;
  period: string;
  teamSize?: number;
  types: readonly ProjectType[];
  stack: readonly TechIconName[];

  link?: { url: string; target: string } | null;
};

export const PROJECTS: readonly Project[] = [
  {
    number: 1,
    slug: "farmatodo",
    name: "FARMATODO",
    logo: "farmatodo",
    period: "2021 — 2023",
    teamSize: 6,
    types: ["ecommerce"],
    stack: ["angular", "typescript", "sass", "html5", "css3"],
    link: { url: "https://www.farmatodo.com.co", target: "FARMATODO" },
  },
  {
    number: 2,
    slug: "uhomie",
    name: "UHOMIE",
    logo: "uhomie",
    period: "2025 — 2026",
    teamSize: 5,
    types: ["webApp", "dashboard"],
    stack: ["react", "typescript", "sass"],
    link: { url: "https://uhomie.cl", target: "UHOMIE" },
  },
  {
    number: 3,
    slug: "v-dex",
    name: "V-DEX",
    logo: "v-dex",
    period: "2026",
    teamSize: 1,
    types: ["portfolio"],
    stack: ["nextjs", "react", "typescript", "tailwind"],
    link: { url: "https://github.com/Vrixton/v-dex", target: "GITHUB" },
  },
  {
    number: 4,
    slug: "texastv",
    name: "TEXASTV",
    logo: "texastv",
    period: "2023 — 2024",
    teamSize: 4,
    types: ["webApp"],
    stack: ["react", "nextjs", "typescript", "cypress"],
  },
  {
    number: 5,
    slug: "swe",
    name: "SWE",
    logo: "swe",
    period: "2024",
    teamSize: 4,
    types: ["ecommerce", "dashboard"],
    stack: ["react", "typescript", "sass"],
  },
  {
    number: 6,
    slug: "novios-a-bordo",
    name: "NOVIOS A BORDO",
    logo: "novios-a-bordo",
    period: "2023",
    teamSize: 2,
    types: ["webApp", "dashboard"],
    stack: ["angular", "typescript", "sass"],
    link: { url: "https://noviosabordo.com", target: "NOVIOS_A_BORDO" },
  },
];

export const PROJECTS_BY_NUMBER = [...PROJECTS].sort((a, b) => a.number - b.number);

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function neighbours(slug: string): { prev: Project; next: Project } | null {
  const list = PROJECTS_BY_NUMBER;
  const index = list.findIndex((project) => project.slug === slug);
  if (index < 0) return null;

  const prev = list[(index - 1 + list.length) % list.length];
  const next = list[(index + 1) % list.length];
  if (!prev || !next) return null;

  return { prev, next };
}
