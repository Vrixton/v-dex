import { BracketFrame } from "@/components/ui/bracket-frame";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PROFILE } from "@/content/profile";
import { format } from "@/i18n/format";
import type { Locale } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";
import { completedYears, yearProgress } from "@/lib/date";

const SPRITE_RATIO = "80 / 168";
const FRAMES = 7;

type TrainerAvatarProps = {
  locale: Locale;
};

export function TrainerAvatar({ locale }: TrainerAvatarProps) {
  const m = getMessages(locale).about.avatar;
  const level = completedYears(PROFILE.birthDate);
  const years = completedYears(PROFILE.careerStart);
  const progress = Math.round(yearProgress(PROFILE.careerStart) * 100);

  return (
    <div className="[container-type:size] relative min-h-[200px] w-full overflow-hidden rounded-panel border border-white/10 bg-surface md:w-80">
      <BracketFrame animated className="inset-4 text-brand-cyan" />

      <p className="absolute top-5 left-5 z-10 mt-1 ml-2 w-fit rounded-panel border-1 border-level-border bg-level-bg px-2 py-1 text-sm text-level [animation-delay:600ms] group-data-[ready=true]/screen:motion-safe:animate-hud-in">
        {format(m.level, { level })}
      </p>

      <div className="absolute inset-0 flex items-center justify-center p-3 [animation-delay:250ms] group-data-[ready=true]/screen:motion-safe:animate-sprite-in">
        <span
          role="img"
          aria-label={format(m.alt, { name: PROFILE.name })}
          className="h-full bg-[url('/trainer-sheet.webp')] bg-no-repeat motion-safe:animate-trainer-idle"
          style={{
            aspectRatio: SPRITE_RATIO,
            backgroundSize: `${FRAMES * 100}% 100%`,
            imageRendering: "pixelated",
          }}
        />
      </div>

      <ProgressBar
        caption={m.exp}
        value={progress}
        minFill={70}
        label={format(m.years, { years })}
        ariaLabel={format(m.progress, { years })}
        className="absolute right-0 bottom-5 z-10 w-[70%] [animation-delay:750ms] group-data-[ready=true]/screen:motion-safe:animate-exp-in"
      />
    </div>
  );
}
