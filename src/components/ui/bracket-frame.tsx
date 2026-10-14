import { cn } from "@/lib/cn";

type BracketFrameProps = {
  size?: "sm" | "md";
  animated?: boolean;
  className?: string;
};

const CORNERS = {
  sm: {
    box: "size-2",
    tl: "border-t border-l",
    tr: "border-t border-r",
    bl: "border-b border-l",
    br: "border-b border-r",
  },
  md: {
    box: "size-3",
    tl: "border-t-2 border-l-2",
    tr: "border-t-2 border-r-2",
    bl: "border-b-2 border-l-2",
    br: "border-b-2 border-r-2",
  },
} as const;

const ENTER = {
  tl: "[--bracket-from:45cqw_45cqh]",
  tr: "[--bracket-from:-45cqw_45cqh]",
  bl: "[--bracket-from:45cqw_-45cqh]",
  br: "[--bracket-from:-45cqw_-45cqh]",
} as const;

export function BracketFrame({ size = "md", animated = false, className }: BracketFrameProps) {
  const corner = CORNERS[size];
  const base = cn("absolute border-current", corner.box);
  const enter = animated ? "group-data-[ready=true]/screen:motion-safe:animate-bracket-in" : "";

  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(base, "top-0 left-0", corner.tl, enter, animated && ENTER.tl)} />
      <span className={cn(base, "top-0 right-0", corner.tr, enter, animated && ENTER.tr)} />
      <span className={cn(base, "bottom-0 left-0", corner.bl, enter, animated && ENTER.bl)} />
      <span className={cn(base, "right-0 bottom-0", corner.br, enter, animated && ENTER.br)} />
    </span>
  );
}
