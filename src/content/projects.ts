import type { TechIconName } from "@/components/ui/tech-icons";

/**
 * Registros del catálogo de proyectos.
 *
 * `number` es solo la etiqueta visible y el criterio de orden: se puede
 * reordenar cuando quieras sin romper nada, porque las URLs usan `slug`,
 * que no cambia nunca.
 *
 * Los textos marcados con TODO son marcadores realistas: tienen el largo y
 * el tono de los definitivos para que la maqueta sea fiel, pero hay que
 * sustituirlos antes de publicar. El contenido va en inglés, como el resto
 * de la interfaz.
 */

export type ProjectType = "E-COMMERCE" | "WEB APP" | "DASHBOARD" | "PORTFOLIO";

export type Project = {
  /** Etiqueta visible y orden en la rejilla. */
  number: number;
  /** Identificador de la URL. Estable para siempre. */
  slug: string;
  name: string;
  company: string;
  role: string;
  period: string;
  /** Tamaño del equipo en ese proyecto. */
  team: string;
  /** Cuántas personas había en el equipo, para el indicador del contexto. */
  teamSize?: number;
  /** Producto propio, trabajo para cliente o proyecto personal. */
  kind: "PRODUCT" | "CLIENT" | "PERSONAL";
  types: readonly ProjectType[];
  summary: string;
  /**
   * Qué tenía de difícil. Es lo que un revisor técnico busca y lo que separa
   * un trabajo senior de una lista de tareas.
   */
  challenge: string;
  /** Qué construiste tú, en frases cortas. */
  work: readonly string[];
  stack: readonly TechIconName[];
  soft: readonly string[];
  link: { url: string; label: string; note?: string } | null;
};

export const PROJECTS: readonly Project[] = [
  {
    number: 1,
    slug: "farmatodo",
    name: "FARMATODO",
    company: "Farmatodo",
    role: "Frontend Developer",
    period: "Mar 2021 — Jul 2023",
    team: "6 devs",
    teamSize: 6,
    kind: "PRODUCT",
    types: ["E-COMMERCE"],
    summary: "Multi-country pharmacy e-commerce platform.",
    challenge:
      "High-traffic pharmacy checkout across countries: a broken flow means lost orders, so every change had to ship behind tests.",
    work: [
      // TODO: confirmar detalles
      "Led the **product reviews** feature end to end, integrating the **BazaarVoice API** across the catalog.",
      "Built the **medication scheduler**: recurring prescription reminders and repeat orders.",
      "Worked on **checkout**: payment methods, validations and the delivery flow.",
      "Shipped product pages and catalog widgets, plus responsive work on the main views.",
      "Covered critical flows with **unit tests** to keep releases stable on a high-traffic site.",
    ],
    stack: ["angular", "typescript", "sass", "javascript"],
    soft: ["Ownership", "Code Review", "Technical Communication"],
    link: { url: "https://www.farmatodo.com.co", label: "GO_TO_FARMATODO" },
  },
  {
    number: 2,
    slug: "uhomie",
    name: "UHOMIE",
    company: "CodersLab",
    role: "Frontend Developer",
    period: "May 2025 — Aug 2026",
    team: "TODO",
    teamSize: 5,
    kind: "PRODUCT",
    types: ["WEB APP"],
    summary: "Web app built on top of a shared component library.",
    challenge:
      "Every screen had its own one-off components, so the UI drifted; the fix had to work for the whole team, not just my tickets.",
    work: [
      // TODO: confirmar detalles
      "Built a reusable **component library** in **React** and **TypeScript**, replacing one-off implementations across the team.",
      "Wired up REST APIs for authentication and role-based access.",
      "Wrote unit tests on the flows that regressed most often.",
      "Stepped up to **coordinate the team** and run planning sessions until a project lead was hired.",
    ],
    stack: ["react", "typescript", "sass"],
    soft: ["Leadership", "Code Review", "Technical Communication"],
    link: { url: "https://uhomie.net/", label: "GO_TO_UHOMIE" },
  },
  {
    number: 3,
    slug: "v-dex",
    name: "V-DEX",
    company: "Personal project",
    role: "Design && Development",
    period: "2026",
    team: "Solo",
    teamSize: 1,
    kind: "PERSONAL",
    types: ["PORTFOLIO"],
    summary: "This portfolio: a device with its own software.",
    challenge:
      "A device full of motion that still had to feel instant: no UI images, no animation loops running when nothing moves.",
    work: [
      // TODO: confirmar detalles
      "**State machine** driving the device open and close cycle, covered with unit tests.",
      "**WebGL** CRT background with magnetic distortion, rendered on demand only.",
      "Chiptune sound design synthesized with **Web Audio**: no audio files shipped.",
      "Custom **design system** on Tailwind v4, with tokens split into primitives and semantics.",
    ],
    stack: ["nextjs", "react", "typescript", "tailwind"],
    soft: ["Ownership", "UX & Accessibility Focus", "Core Web Vitals"],
    link: { url: "https://github.com/Vrixton/v-dex", label: "GO_TO_REPOSITORY" },
  },
  {
    number: 4,
    slug: "texastv",
    name: "TEXASTV",
    company: "Arbelos Interactive",
    role: "Frontend Developer",
    period: "2023 — 2024",
    team: "TODO",
    teamSize: 4,
    kind: "CLIENT",
    types: ["WEB APP"],
    summary: "Video platform with profiles, watch history and recommendations.",
    challenge:
      "Video playback with multiple profiles and watch history, where session handling and protected routes had to hold up.",
    work: [
      // TODO: confirmar detalles
      "Built the **video player** and catalog screens, in the style of mainstream streaming apps.",
      "**Multi-profile login**, watch history and a **recommendation feed**.",
      "Integrated the CMS and authentication APIs, including session handling and protected routes.",
      "End-to-end coverage of the main flows with **Cypress**.",
    ],
    stack: ["nextjs", "react", "typescript", "cypress"],
    soft: ["Cross-Functional Collaboration", "Ownership"],
    link: null,
  },
  {
    number: 5,
    slug: "swe",
    name: "SWE",
    company: "Arbelos Interactive",
    role: "Frontend Developer",
    period: "2023 — 2024",
    team: "TODO",
    teamSize: 4,
    kind: "CLIENT",
    types: ["WEB APP", "DASHBOARD"],
    summary: "Public site and content administration dashboard.",
    challenge:
      "A public site and an admin dashboard sharing one data layer, without the two drifting apart.",
    work: [
      // TODO: confirmar detalles
      "Built the public site and the **admin dashboard**, sharing a single data layer.",
      "Content, catalog and user management from the dashboard.",
      "Integrated REST APIs with session handling and permissions.",
      "Unit tests over the dashboard business logic.",
    ],
    stack: ["angular", "typescript", "sass"],
    soft: ["Technical Communication", "Code Review"],
    link: null,
  },
  {
    number: 6,
    slug: "novios-a-bordo",
    name: "NOVIOS A BORDO",
    company: "Novios a Bordo",
    role: "Sole Frontend Developer",
    period: "TODO",
    team: "Solo frontend",
    teamSize: 1,
    kind: "CLIENT",
    types: ["DASHBOARD"],
    summary: "Internal admin dashboard for the client's day-to-day operations.",
    challenge:
      "Only frontend on the project: every architecture and interface decision was mine to make and to defend.",
    work: [
      // TODO: confirmar detalles
      "**Only frontend** on the project: owned the **architecture** and the interface decisions.",
      "Built the admin dashboard in Angular, from layout to data views.",
      "Forms with validation, and list views with filtering and sorting.",
      "Integrated the client API with **role-based access control**.",
    ],
    stack: ["angular", "typescript"],
    soft: ["Ownership", "UX & Accessibility Focus", "Stakeholder Management"],
    link: {
      url: "https://noviosabordo.com",
      label: "GO_TO_CLIENT_SITE",
      note: "Client's public site. My work was the internal dashboard, not public.",
    },
  },
];

/** Ordenados por su número, que es el criterio del catálogo. */
export const PROJECTS_BY_NUMBER = [...PROJECTS].sort((a, b) => a.number - b.number);

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** El anterior y el siguiente, para pasar fichas sin volver al índice. */
export function neighbours(slug: string): { prev: Project; next: Project } | null {
  const list = PROJECTS_BY_NUMBER;
  const index = list.findIndex((project) => project.slug === slug);
  if (index < 0) return null;

  const prev = list[(index - 1 + list.length) % list.length];
  const next = list[(index + 1) % list.length];
  if (!prev || !next) return null;

  return { prev, next };
}
