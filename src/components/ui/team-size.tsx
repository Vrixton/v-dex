import { TeamSprites } from "@/components/ui/team-sprites";

export function TeamSize({ size }: { size: number | undefined }) {
  if (!size) return null;
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex items-baseline gap-1">
        <span className="text-base text-brand-yellow md:text-lg">
          {String(size).padStart(2, "0")}
        </span>
        <span className="text-[10px] text-fg-muted">{size === 1 ? "DEV" : "DEVS"}</span>
      </span>
      <TeamSprites size={size} />
    </span>
  );
}
