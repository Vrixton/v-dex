import type { LogoName } from "@/components/ui/project-logo";
import type { TechIconName } from "@/components/ui/tech-icons";

/**
 * Registros del catálogo de proyectos.
 *
 * `number` es solo la etiqueta visible y el criterio de orden: se puede
 * reordenar cuando quieras sin romper nada, porque las URLs usan `slug`,
 * que no cambia nunca.
 *
 * Aquí va lo construido; cómo se trabajaba en cada empresa vive en los
 * registros de experiencia, para que las dos vistas no se repitan.
 */

export type ProjectType = "E-COMMERCE" | "WEB APP" | "DASHBOARD" | "PORTFOLIO";

export type Project = {
  /** Etiqueta visible y orden en la rejilla. */
  number: number;
  /** Identificador de la URL. Estable para siempre. */
  slug: string;
  name: string;
  /** Logo dentro de la hoja de sprites. */
  logo: LogoName;
  company: string;
  role: string;
  period: string;
  /** Cuántas personas había en el equipo, para el indicador del contexto. */
  teamSize?: number;
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
  /** Sin enlace, el proyecto es privado o ya no está en línea. */
  link?: { url: string; label: string; note?: string } | null;
};

export const PROJECTS: readonly Project[] = [
  {
    number: 1,
    slug: "farmatodo",
    name: "FARMATODO",
    logo: "farmatodo",
    company: "Farmatodo",
    role: "Frontend Developer",
    period: "2021 — 2023",
    teamSize: 6,
    types: ["E-COMMERCE"],
    summary:
      "The digital storefront of a pharmacy chain with hundreds of stores across Colombia and Venezuela.",
    challenge:
      "Keeping the sprint moving while production kept interrupting it. Incidents arrive without warning on a high-traffic store, and every new priority threatens to bury a bug someone reported last week. Half the work was technical; the other half was making sure nothing fell through the cracks.",
    work: [
      "Integrated **PSE payments**, the bank transfer method most used in Colombia, into the checkout flow.",
      "Built the **medication information module**: dosage, warnings and whether a drug is safe during pregnancy or breastfeeding.",
      "Built a **personalised product search** on top of BazaarVoice that recommends items from each customer's preferences.",
      "Shipped the **Farmatodo Prime** landing page: subscription plans, benefits and a tag showing how much the customer would have saved.",
      "Ran the upgrade **from Angular 11 to 16**, one major version at a time, on a storefront that could not go down.",
      "Ran production deployments for the Colombian and Venezuelan storefronts, and took weekend on-call shifts.",
      "Ran internal sessions on **Git and nvm** for the team, slides included.",
    ],
    stack: ["angular", "typescript", "sass", "html5", "css3"],
    soft: ["Ownership", "Technical Communication", "Task Prioritization"],
    link: { url: "https://www.farmatodo.com.co", label: "GO_TO_FARMATODO" },
  },
  {
    number: 2,
    slug: "uhomie",
    name: "UHOMIE",
    logo: "uhomie",
    company: "CodersLab",
    role: "Frontend Developer",
    period: "2025 — 2026",
    teamSize: 5,
    types: ["WEB APP", "DASHBOARD"],
    summary:
      "A property marketplace for buying and renting homes across Chile, Colombia and Venezuela.",
    challenge:
      "The frontend ran ahead of the backend for most of the project, so large parts of the product had to be built, demoed and kept moving against APIs that did not exist yet. Keeping a six-month plan realistic while the team changed around it was as much of the job as the code.",
    work: [
      "Built the public site: home, **property search**, listing cards, popular districts and the content pages.",
      "Put the listings **on a map**, with the price shown on each pin so you can compare without opening a single one.",
      "Built the property detail page, a **cost estimator** for utilities and running expenses, and the **tour booking** flow.",
      "Built the admin panel with **four roles** — owner, agent, manager and admin — each with its own permissions, listings and workflows.",
      "Implemented authentication and role-based access across both apps.",
      "Planned the roadmap up to six months out, set priorities and assigned work.",
      "Reviewed pull requests and walked new developers through the codebase.",
    ],
    stack: ["react", "typescript", "sass"],
    soft: ["Task Prioritization", "Technical Communication", "Problem Solving"],
    link: { url: "https://uhomie.cl", label: "GO_TO_UHOMIE" },
  },
  {
    number: 3,
    slug: "v-dex",
    name: "V-DEX",
    logo: "v-dex",
    company: "Personal project",
    role: "Design && Development",
    period: "2026",
    teamSize: 1,
    types: ["PORTFOLIO"],
    summary: "This portfolio: a handheld device you are holding right now.",
    challenge:
      "Knowing when to stop. Every idea opened three more, and a portfolio that never ships is worth nothing. Most of the work was deciding what stayed out: no screenshot galleries, no filters for six records.",
    work: [
      "Built the device shell: **two bezels driven by a state machine** that close over the screen on every navigation and open again when the view is ready.",
      "Synthesised every sound **in the browser with the Web Audio API** — no audio files, no library, under a kilobyte of code.",
      "Drew all the pixel art from scratch: badges, logos, sprites and maps, as **sprite sheets** that weigh a few hundred bytes each.",
      "Wired the contact form to Resend through a route handler, with validation on both sides and **rate limiting** against abuse.",
      "Kept it **accessible**: every animation honours reduced motion, the device is operable by keyboard, and the shutters never trap focus.",
      "Built it **with AI as a working tool**, which made the real work the one that cannot be delegated: deciding what to build and what to leave out.",
    ],
    stack: ["nextjs", "react", "typescript", "tailwind"],
    soft: ["Ownership", "Attention to Detail", "UX & Accessibility Focus"],
    link: { url: "https://github.com/Vrixton/v-dex", label: "GO_TO_REPOSITORY" },
  },
  {
    number: 4,
    slug: "texastv",
    name: "TEXASTV",
    logo: "texastv",
    company: "Arbelos Interactive",
    role: "Frontend Developer",
    period: "2023 — 2024",
    teamSize: 4,
    types: ["WEB APP"],
    summary:
      "A video streaming platform with multi-profile accounts, plans and a recommendation feed.",
    challenge:
      "Getting a working demo in front of the client as early as possible. That meant deciding, release after release, what was essential and what could wait, and building the parts that had to be shown first.",
    work: [
      "Built authentication and **multi-profile accounts**: one subscription, several viewers, each with their own history.",
      "Built the catalog: categories, filters and a **recommendation feed** on the home screen.",
      "Integrated the video player with its controls and made the whole experience work on any screen.",
      "Wired up **Firebase** for data and session handling.",
      "Built the subscription plans and the account screens.",
    ],
    stack: ["react", "nextjs", "typescript", "cypress"],
    soft: ["Task Prioritization", "Problem Solving", "Adaptability"],
  },
  {
    number: 5,
    slug: "swe",
    name: "SWE",
    logo: "swe",
    company: "Arbelos Interactive",
    role: "Frontend Developer",
    period: "2024",
    teamSize: 4,
    types: ["E-COMMERCE", "DASHBOARD"],
    summary:
      "Online store and site for a Canadian wrestling promotion: merchandise, upcoming shows and news.",
    challenge:
      "Nothing here was new: by then I had built this kind of storefront several times for the same client. The job was to deliver it cleanly and on time without letting familiarity turn into carelessness.",
    work: [
      "Built the storefront: product listing with **pagination and search**, product detail pages and the **shopping cart**.",
      "Built the content side: upcoming shows and the news section.",
      "Built the admin panel that manages the catalog and everything published on the site.",
      "Wired up **Firebase** for data and user authentication.",
    ],
    stack: ["react", "typescript", "sass"],
    soft: ["Ownership", "Time Management", "Attention to Detail"],
  },
  {
    number: 6,
    slug: "novios-a-bordo",
    name: "NOVIOS A BORDO",
    logo: "novios-a-bordo",
    company: "Freelance",
    role: "Sole Frontend Developer",
    period: "2023",
    teamSize: 2,
    types: ["WEB APP", "DASHBOARD"],
    summary:
      "A Peruvian wedding registry where guests chip in for a gift: each one pays a share until it is covered.",
    challenge:
      "The client had a working product in PHP and wanted it rebuilt in Angular, starting from a purchased template. Half the work was removing what the template brought and did not belong, updating outdated dependencies and making the rest behave like a real product instead of a demo.",
    work: [
      "Rebuilt the public site from PHP to Angular: registry pages, gift shares and the couple's landing page.",
      "Built the admin panel where couples configure their wedding, payment methods, images and colours.",
      "Built the **shared gift flow**: a guest contributes part of a gift and leaves a message for the couple.",
      "Took the **design decisions** myself, adapting the template to what the product actually needed.",
    ],
    stack: ["angular", "typescript", "sass"],
    soft: ["Ownership", "Adaptability", "UX & Accessibility Focus"],
    link: { url: "https://noviosabordo.com", label: "GO_TO_NOVIOS_A_BORDO" },
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
