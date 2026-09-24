import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { PROFILE } from "@/content/profile";
import { GymBadges } from "@/features/trainer/gym-badges";
import { SkillList } from "@/features/trainer/skill-list";
import { TrainerAvatar } from "@/features/trainer/trainer-avatar";
import { TrainerBio } from "@/features/trainer/trainer-bio";

export default function HomePage() {
  return (
    <Window
      title="TRAINER_INFO"
      breadcrumb="REPOSITORY"
      actions={
        <>
          <Badge tone="yellow" className="hidden sm:flex">
            NRO. #???
          </Badge>
          <Badge tone="green" led pulse>
            SYNC: READY
          </Badge>
        </>
      }
    >
      <div className="flex flex-col gap-6 md:gap-8">
        <header className="text-center">
          <p className="text-xs md:text-sm">[TRAINER_NAME]</p>
          <h1 className="text-2xl text-brand-cyan text-shadow-glow md:text-4xl">
            {PROFILE.name.toUpperCase()}
          </h1>
          <p className="mt-1 text-xs text-fg-muted md:text-sm">{PROFILE.role.toUpperCase()}</p>
        </header>

        {/* Avatar y bio en paralelo desde tablet; apilados en móvil */}
        <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-6">
          <TrainerAvatar />
          <TrainerBio />
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-6">
          <GymBadges />
          <SkillList />
        </div>
      </div>
    </Window>
  );
}
