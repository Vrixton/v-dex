export const COMPANY_ORDER = [
  "coderslab",
  "arbelos",
  "farmatodo",
  "blacksip",
  "early-years",
] as const;

export type CompanyLogoName = (typeof COMPANY_ORDER)[number];

export function CompanyLogo({ name, className }: { name: CompanyLogoName; className?: string }) {
  const index = COMPANY_ORDER.indexOf(name);

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        backgroundImage: "url('/company-sheet.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${COMPANY_ORDER.length * 100}% 100%`,
        backgroundPosition: `${(index / (COMPANY_ORDER.length - 1)) * 100}% 0`,
        aspectRatio: "1",
        imageRendering: "pixelated",
      }}
    />
  );
}
