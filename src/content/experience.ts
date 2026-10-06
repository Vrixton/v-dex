import type { CompanyLogoName } from "@/components/ui/company-logo";

export type Role = {
  number: number;
  slug: string;
  company: string;
  logo: CompanyLogoName;
  role: string;
  location: string;
  start: string;
  end?: string;
  periodLabel?: string;
  teamSize?: number;
  status: "ACTIVE" | "CLOSED";
  log: readonly string[];
};

export const ROLES: readonly Role[] = [
  {
    number: 5,
    slug: "coderslab",
    company: "CODERSLAB",
    logo: "coderslab",
    role: "Frontend Developer",
    location: "Santiago, Chile · Remote",
    start: "2025-05",
    end: "2026-08",
    teamSize: 5,
    status: "CLOSED",
    log: [
      "Replaced one-off implementations with a **shared component library** the whole team works from.",
      "Stepped up to coordinate the team and run planning sessions until a project lead was hired.",
      "Reviewed pull requests and worked day to day with QA, backend and design.",
    ],
  },
  {
    number: 4,
    slug: "arbelos",
    company: "ARBELOS INTERACTIVE",
    logo: "arbelos",
    role: "Frontend Developer · Recurring contractor",
    location: "Ontario, Canada · Remote",
    start: "2023-07",
    end: "2024-10",
    teamSize: 4,
    status: "CLOSED",
    log: [
      "**Recurring collaboration since 2020**: they bring me in whenever a new project opens.",
      "Owned the frontend of a video platform and its admin dashboards.",
      "Coordinated with backend, design and DevOps across time zones to hit contract milestones.",
    ],
  },
  {
    number: 3,
    slug: "farmatodo",
    company: "FARMATODO",
    logo: "farmatodo",
    role: "Frontend Developer",
    location: "Bogotá, Colombia",
    start: "2022-03",
    end: "2023-07",
    teamSize: 6,
    status: "CLOSED",
    log: [
      "**Frontend developer**: set priorities, owned delivery dates and mentored developers.",
      "Ran the Angular and Node upgrade across the platform, clearing deprecated dependencies.",
      "Set up unit testing practices to keep releases stable on a high-traffic site.",
    ],
  },
  {
    number: 2,
    slug: "blacksip",
    company: "BLACKSIP",
    logo: "blacksip",
    role: "Frontend Developer",
    location: "Bogotá, Colombia",
    start: "2021-03",
    end: "2022-02",
    teamSize: 6,
    status: "CLOSED",
    log: [
      "Worked on the Farmatodo e-commerce platform as part of the agency's team.",
      "**The client hired me directly** once the contract ended.",
    ],
  },
  {
    number: 1,
    slug: "early-years",
    company: "HIDDEN MACHINES",
    logo: "early-years",
    role: "Frontend Developer",
    location: "Agencies and studios",
    start: "2016-08",
    end: "2020-07",
    periodLabel: "2016 — 2020",
    status: "CLOSED",
    log: [
      "Built and maintained storefronts and marketing sites for retail brands.",
      "Where the fundamentals came from: **HTML, CSS and vanilla JavaScript**.",
    ],
  },
];

export const ROLES_BY_RECENCY = [...ROLES].sort((a, b) => b.number - a.number);
