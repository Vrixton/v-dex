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
  { label: "Task Prioritization", kind: "technical" },
  { label: "Leadership", kind: "personal" },
  { label: "Problem Solving", kind: "communication" },
  { label: "Technical Communication", kind: "communication" },
  { label: "Cross-Functional Collaboration", kind: "communication" },
  { label: "Code Review", kind: "technical" },
  { label: "SCRUM", kind: "technical" },
  { label: "UX & Accessibility Focus", kind: "personal" },
  { label: "Adaptability", kind: "personal" },
  { label: "Ownership", kind: "technical" },
  { label: "Attention to Detail", kind: "personal" },
  { label: "Active Communication", kind: "communication" },
  { label: "Time Management", kind: "technical" },
  { label: "Continuous Improvement", kind: "technical" },
  { label: "Stakeholder Management", kind: "communication" },
];
