/**
 * Skills del trainer.
 *
 * El prefijo no es decorativo: indica de qué tipo es cada una.
 *   </>  técnica
 *   <*>  cualidad personal
 *   <=>  comunicación
 */

export type SkillKind = "technical" | "personal" | "communication";

export type Skill = {
  label: string;
  kind: SkillKind;
};

export const SKILL_PREFIX: Record<SkillKind, string> = {
  technical: "</>",
  personal: "<*>",
  communication: "<=>",
};

export const SKILLS: readonly Skill[] = [
  { label: "Core Web Vitals", kind: "technical" },
  { label: "Performance Profiling", kind: "technical" },
  { label: "Code Splitting", kind: "technical" },
  { label: "Component Architecture", kind: "technical" },
  { label: "Code Review", kind: "technical" },
  { label: "AI-Assisted Development", kind: "technical" },
  { label: "SCRUM & Agile", kind: "technical" },
  { label: "UX & Accessibility Focus", kind: "personal" },
  { label: "Leadership", kind: "personal" },
  { label: "Mentoring & Onboarding", kind: "personal" },
  { label: "Ownership", kind: "personal" },
  { label: "Technical Communication", kind: "communication" },
  { label: "Cross-Functional Collaboration", kind: "communication" },
  { label: "Stakeholder Management", kind: "communication" },
  { label: "Design Handoff", kind: "communication" },
];
