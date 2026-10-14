import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { PROFILE } from "@/content/profile";
import { CvCartridge } from "@/features/contact/cv-cartridge";
import { HabitatMap } from "@/features/trainer/habitat-map";
import { SkillsPanel } from "@/features/trainer/skills-panel";
import { TrainerAvatar } from "@/features/trainer/trainer-avatar";
import { TrainerBio } from "@/features/trainer/trainer-bio";
import { getMessages } from "@/i18n/messages";
import { routeLocale, type LocaleRouteProps } from "@/i18n/route-locale";

export default async function HomePage({ params }: LocaleRouteProps) {
  const locale = await routeLocale(params);
  const messages = getMessages(locale);
  const m = messages.about;

  return (
    <Window
      title={m.window.title}
      breadcrumb={m.window.breadcrumb}
      fill
      scrollable
      actions={
        <>
          <Badge tone="yellow" className="hidden sm:flex">
            {m.window.number}
          </Badge>
          <Badge tone="green" led pulse>
            {messages.device.sync}
          </Badge>
        </>
      }
    >
      <div className="flex flex-col gap-6 md:gap-8">
        <header className="text-center">
          <p className="text-xs text-fg-muted">{`[${m.nameLabel}]:`}</p>
          <h1 className="text-2xl text-brand-cyan text-shadow-glow md:text-4xl">
            {PROFILE.name.toUpperCase()}
          </h1>
          <p className="mt-1 text-xs md:text-sm">{m.role.toUpperCase()}</p>
        </header>
        <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-6">
          <TrainerAvatar locale={locale} />
          <TrainerBio locale={locale} />
        </div>
        <div className="mb-4 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <HabitatMap locale={locale} />
          <CvCartridge locale={locale} />
        </div>
        <SkillsPanel locale={locale} />
      </div>
    </Window>
  );
}
