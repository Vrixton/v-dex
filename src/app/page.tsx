import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { PROFILE } from "@/content/profile";
import { SkillsPanel } from "@/features/trainer/skills-panel";
import { TrainerAvatar } from "@/features/trainer/trainer-avatar";
import { TrainerBio } from "@/features/trainer/trainer-bio";

export default function HomePage() {
  return (
    <Window
      title="TRAINER_INFO"
      breadcrumb="REPOSITORY"
      fill
      scrollable
      actions={
        <>
          <Badge tone="yellow" className="hidden sm:flex">
            NRO. #001
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

        <SkillsPanel />
      </div>
    </Window>
  );
}
