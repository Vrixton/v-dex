export const LOGO_ORDER = [
  "farmatodo",
  "uhomie",
  "v-dex",
  "texastv",
  "swe",
  "novios-a-bordo",
] as const;

export type LogoName = (typeof LOGO_ORDER)[number];

export function ProjectLogo({ name, className }: { name: LogoName; className?: string }) {
  const index = LOGO_ORDER.indexOf(name);

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        backgroundImage: "url('/logo-sheet.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${LOGO_ORDER.length * 100}% 100%`,
        backgroundPosition: `${(index / (LOGO_ORDER.length - 1)) * 100}% 0`,
        aspectRatio: "1",
        imageRendering: "pixelated",
      }}
    />
  );
}
