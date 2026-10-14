import type { Messages } from "@/i18n/messages";

export type SkillKind = "technical" | "personal" | "communication";

export type SkillId = keyof Messages["about"]["skills"];

export type Skill = {
  id: SkillId;
  kind: SkillKind;
};

export const SKILL_PREFIX: Record<SkillKind, string> = {
  technical: "</>",
  personal: "<*>",
  communication: "<=>",
};

export const SKILLS: readonly Skill[] = [
  { id: "coreWebVitals", kind: "technical" },
  { id: "performanceProfiling", kind: "technical" },
  { id: "codeSplitting", kind: "technical" },
  { id: "componentArchitecture", kind: "technical" },
  { id: "codeReview", kind: "technical" },
  { id: "aiAssistedDevelopment", kind: "technical" },
  { id: "scrumAgile", kind: "technical" },
  { id: "uxAccessibility", kind: "personal" },
  { id: "leadership", kind: "personal" },
  { id: "mentoring", kind: "personal" },
  { id: "ownership", kind: "personal" },
  { id: "technicalCommunication", kind: "communication" },
  { id: "crossFunctional", kind: "communication" },
  { id: "stakeholderManagement", kind: "communication" },
  { id: "designHandoff", kind: "communication" },
];
