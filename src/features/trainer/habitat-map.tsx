import { BracketFrame } from "@/components/ui/bracket-frame";
import { PROFILE } from "@/content/profile";
import type { Locale } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";

import { MapsLink } from "./maps-link";

type HabitatMapProps = {
  locale: Locale;
};

export function HabitatMap({ locale }: HabitatMapProps) {
  const { city, country, timezone, mapsUrl } = PROFILE.habitat;
  const m = getMessages(locale).about.habitat;
  const place = `${city}, ${country}`;

  return (
    <section className="flex flex-col gap-3 rounded-panel bg-surface p-4">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <span>
          {m.title} <span className="hidden text-fg-muted sm:inline">|| {m.subtitle}</span>
        </span>
      </header>
      <div className="relative h-36 overflow-hidden rounded-panel md:h-35">
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[url('/habitat-map.webp')] bg-cover bg-center"
          style={{ imageRendering: "pixelated" }}
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-1/2 h-2 w-6 -translate-x-1/2 rounded-full bg-black/25 blur-[1px]"
          />
          <span
            aria-hidden="true"
            className="relative block h-10 w-8 bg-[url('/team-sheet.webp')] bg-no-repeat"
            style={{ backgroundSize: "200% 100%", imageRendering: "pixelated" }}
          />
          <span className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2">
            <span className="relative flex items-center gap-2 overflow-hidden rounded-control border border-current/40 bg-screen/80 px-3 py-1.5 text-[10px] whitespace-nowrap text-brand-cyan backdrop-blur-sm md:text-xs">
              <span aria-hidden="true" className="absolute inset-0 bg-current opacity-30" />
              <BracketFrame size="sm" />
              <span className="relative flex items-center gap-2">
                <span className="text-fg">{`[${m.title}]:`}</span>
                <span>{place}</span>
              </span>
            </span>
          </span>
        </span>
        <MapsLink href={mapsUrl} />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] md:text-xs">
        <p>
          <span className="text-brand-cyan/70">{`[${m.region}]: `}</span>
          <span className="text-fg">{place}</span>
        </p>
        <p>
          <span className="text-brand-cyan/70">{`[${m.timezone}]: `}</span>
          <span className="text-fg">{timezone}</span>
        </p>
      </div>
    </section>
  );
}
