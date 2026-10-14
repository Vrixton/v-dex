import type { CompanyLogoName } from "@/components/ui/company-logo";
import type { Messages } from "@/i18n/messages";

export type RoleId = keyof Messages["experience"]["roles"];

export type Role = {
  number: number;
  id: RoleId;
  company: string;
  logo: CompanyLogoName;
  start: string;
  end?: string;
  periodLabel?: string;
  teamSize?: number;
  status: "active" | "closed";
};

export const ROLES: readonly Role[] = [
  {
    number: 4,
    id: "coderslab",
    company: "CODERSLAB",
    logo: "coderslab",
    start: "2025-05",
    end: "2026-08",
    teamSize: 5,
    status: "closed",
  },
  {
    number: 3,
    id: "arbelos",
    company: "ARBELOS INTERACTIVE",
    logo: "arbelos",
    start: "2020-09",
    end: "2024-10",
    teamSize: 4,
    status: "closed",
  },
  {
    number: 2,
    id: "farmatodo",
    company: "FARMATODO",
    logo: "farmatodo",
    start: "2022-03",
    end: "2023-07",
    teamSize: 6,
    status: "closed",
  },
  {
    number: 1,
    id: "earlyYears",
    company: "EARLY YEARS",
    logo: "early-years",
    start: "2016-05",
    end: "2020-11",
    periodLabel: "2016 — 2020",
    status: "closed",
  },
];

export const ROLES_BY_RECENCY = [...ROLES].sort((a, b) => b.number - a.number);
