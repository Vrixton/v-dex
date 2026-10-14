import type { Locale } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/cn";
import { readCvSize } from "@/lib/cv-meta";

import { CvDownloadButton } from "./cv-download-button";

type CvCartridgeProps = {
  locale: Locale;
  className?: string;
};

export function CvCartridge({ locale, className }: CvCartridgeProps) {
  const size = readCvSize(locale);
  const m = getMessages(locale).about.cv;

  return (
    <section className={cn("flex flex-col gap-4 rounded-panel bg-surface p-4 md:p-5", className)}>
      <h2 className="text-sm text-fg md:text-base">
        {m.title} <span className="hidden text-fg-muted sm:inline">|| {m.subtitle}</span>
      </h2>

      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="block h-18 w-18 shrink-0 bg-[url('/cv-cartridge.webp')] bg-contain bg-center bg-no-repeat md:h-20 md:w-20"
          style={{ imageRendering: "pixelated" }}
        />

        <dl className="flex min-w-0 flex-col gap-0.5 text-[10px] md:text-xs">
          <div className="flex gap-2">
            <dt className="text-fg-muted">{`[${m.file}]:`}</dt>
            <dd className="text-fg">{m.subtitle}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-fg-muted">{`[${m.type}]:`}</dt>
            <dd className="text-fg">PDF</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-fg-muted">{`[${m.size}]:`}</dt>
            <dd className="text-fg">{size}</dd>
          </div>
        </dl>
      </div>
      <CvDownloadButton />
    </section>
  );
}
