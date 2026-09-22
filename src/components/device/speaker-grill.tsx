import { cn } from "@/lib/cn";

type SpeakerGrillProps = {
  className?: string;
};

const SLOTS = 4;

export function SpeakerGrill({ className }: SpeakerGrillProps) {
  return (
    <span aria-hidden="true" className={cn("flex gap-1", className)}>
      {Array.from({ length: SLOTS }, (_, index) => (
        <span key={index} className="h-6 w-1.5 rounded-full bg-bezel-ink md:h-5" />
      ))}
    </span>
  );
}
