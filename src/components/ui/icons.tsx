import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Altavoz. Con ondas indica sonido activo; sin ellas, silencio. */
export function SpeakerIcon({ waves = true, className }: IconProps & { waves?: boolean }) {
  return (
    <svg {...base} className={cn("size-4", className)}>
      <path d="M11 5 6 9H3v6h3l5 4z" />
      {waves ? <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /> : null}
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn("size-4", className)}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="m2.5 6.5 9.5 7 9.5-7" />
    </svg>
  );
}

export function AtIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn("size-4", className)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  );
}
