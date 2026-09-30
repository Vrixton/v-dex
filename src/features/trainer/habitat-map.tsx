import { BracketFrame } from "@/components/ui/bracket-frame";
import { PROFILE } from "@/content/profile";
import { MapsLink } from "./maps-link";

export function HabitatMap() {
  const { city, country, timezone, mapsUrl } = PROFILE.habitat;

  return (
    <section className="flex flex-col gap-3 rounded-panel bg-surface p-4">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <span>
          HABITAT <span className="text-fg-muted">|| LOCATION</span>
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
            className="absolute -bottom-1 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-black/35 blur-[1px]"
          />
          <span
            aria-hidden="true"
            className="relative block h-10 w-8 bg-[url('/team-sheet.webp')] bg-no-repeat motion-safe:animate-marker-breathe"
            style={{ backgroundSize: "200% 100%", imageRendering: "pixelated" }}
          />
          <span className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2">
            <span className="relative flex items-center gap-2 overflow-hidden rounded-control border border-current/40 bg-screen/80 px-3 py-1.5 text-[10px] whitespace-nowrap text-brand-cyan backdrop-blur-sm md:text-xs">
              <span aria-hidden="true" className="absolute inset-0 bg-current opacity-30" />
              <BracketFrame size="sm" />
              <span className="relative flex items-center gap-2">
                <span className="text-fg">[HABITAT]:</span>
                <span>{`${city}, ${country}`}</span>
              </span>
            </span>
          </span>
        </span>
        <MapsLink href={mapsUrl} />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] md:text-xs">
        <p>
          <span className="text-brand-cyan/70">[REGION]: </span>
          <span className="text-fg">{`${city}, ${country}`}</span>
        </p>
        <p>
          <span className="text-brand-cyan/70">[TIMEZONE]: </span>
          <span className="text-fg">{timezone}</span>
        </p>
      </div>
    </section>
  );
}
