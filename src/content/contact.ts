import type { Locale } from "@/i18n/locale";

export const CONTACT = {
  intro: "Want to get in touch",
  email: "victor.villavicencio.10@gmail.com",
  networks: [
    { name: "GitHub", href: "https://github.com/Vrixton", icon: "github" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/vrixton/", icon: "linkedin" },
  ],
} as const;

export const CV_FILE: Record<Locale, string> = {
  en: "victor-villavicencio-cv-en.pdf",
  es: "victor-villavicencio-cv-es.pdf",
};
