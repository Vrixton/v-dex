import { readCvSize } from "@/lib/cv-meta";
import { cn } from "@/lib/cn";
import { CvDownloadButton } from "./cv-download-button";

export function CvCartridge({ className }: { className?: string }) {
  const size = readCvSize();

  return (
    <section className={cn("flex flex-col gap-4 rounded-panel bg-surface p-4 md:p-5", className)}>
      <h2 className="text-sm text-fg md:text-base">TRAINER_CARD</h2>
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="block h-16 w-10 shrink-0 bg-[url('/cv-cartridge.webp')] bg-contain bg-center bg-no-repeat md:h-20 md:w-18"
          style={{ imageRendering: "pixelated" }}
        />

        <dl className="flex min-w-0 flex-col gap-0.5 text-[10px] md:text-xs">
          <div className="flex gap-2">
            <dt className="text-fg-muted">[SLOT_FILE]:</dt>
            <dd className="text-fg">CV</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-fg-muted">[TYPE_FILE]:</dt>
            <dd className="text-fg">PDF</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-fg-muted">[SLOT_SIZE]:</dt>
            <dd className="text-fg">{size}</dd>
          </div>
        </dl>
      </div>
      <CvDownloadButton />
    </section>
  );
}
