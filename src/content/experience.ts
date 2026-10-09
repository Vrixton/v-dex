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
    number: 4,
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
      "Replaced one-off implementations with a **shared component library** the whole team worked from.",
      "Stepped up to **coordinate the team**: ran plannings, set priorities and assigned work when the project had no lead.",
      "Reviewed pull requests and walked new developers through the codebase.",
      "Worked in **Scrum**: daily standups, sprint planning and grooming on a two-week cycle.",
      "Worked day to day with QA, backend and design.",
    ],
  },
  {
    number: 3,
    slug: "arbelos",
    company: "ARBELOS INTERACTIVE",
    logo: "arbelos",
    role: "Frontend Developer · Recurring contractor",
    location: "Ontario, Canada · Remote",
    start: "2020-09",
    end: "2024-10",
    teamSize: 4,
    status: "CLOSED",
    log: [
      "**Recurring collaboration over four years**: they brought me in whenever a new project opened.",
      "Worked **in written English** day to day: tickets, documentation and standups with a distributed team.",
      "Picked work from a shared board and ran daily standups focused on blockers and missing specs.",
      "**Learned to work inside someone else's codebase**: following the design system and the conventions already in place instead of my own.",
      "Covered my work with unit tests before handing it over.",
    ],
  },
  {
    number: 2,
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
      "Joined the platform through an agency and was **hired directly by the client** a year later.",
      "Turned requests from product, backend and the owner into **tickets the team could actually plan**, with priorities we set ourselves.",
      "Worked **with the designer on what was feasible**: the designs came out of what we knew we could build and maintain.",
      "Rotated through **sprint planning and estimation** with the rest of the frontend team.",
      "Took **on-call weeks**: fixing production incidents and deploying the fix myself.",
      "Ran internal sessions on **Git and nvm**, slides included, to get the team on the same workflow.",
    ],
  },
  {
    number: 1,
    slug: "early-years",
    company: "EARLY YEARS",
    logo: "early-years",
    role: "Frontend Developer",
    location: "Agencies and studios · Remote and on-site",
    start: "2016-05",
    end: "2020-11",
    periodLabel: "2016 — 2020",
    status: "CLOSED",
    log: [
      "Four years across **Tsserapp, S9 Consulting and Tita Media**, moving between agencies and studios.",
      "**Tsserapp** is where the foundations came from: HTML, CSS and vanilla JavaScript across a lot of projects, before any framework made them easy.",
      "**S9 Consulting**: dashboards and internal tools, and where I started **mentoring juniors and reviewing code** — the part of the job I have liked most ever since.",
      "**Tita Media**: storefronts on **VTEX** for Colombian brands like Mario Hernández and Fiotti.",
    ],
  },
];

export const ROLES_BY_RECENCY = [...ROLES].sort((a, b) => b.number - a.number);
