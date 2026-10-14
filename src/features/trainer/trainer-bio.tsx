import { Terminal, TerminalCursor } from "@/components/ui/terminal";
import { PROFILE } from "@/content/profile";
import { format } from "@/i18n/format";
import type { Locale } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";
import { completedYears } from "@/lib/date";
import { highlight } from "@/lib/rich-text";

type TrainerBioProps = {
  locale: Locale;
};

export function TrainerBio({ locale }: TrainerBioProps) {
  const m = getMessages(locale).about;
  const years = completedYears(PROFILE.careerStart);
  const lines = m.bio.map((line) => format(line, { years }));

  return (
    <Terminal program={m.bioProgram} locale={locale}>
      {lines.map((line, index) => (
        <p key={line}>
          {highlight(line)}
          {index === lines.length - 1 ? <TerminalCursor /> : null}
        </p>
      ))}
    </Terminal>
  );
}
