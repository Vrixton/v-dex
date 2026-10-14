"use client";

import { Button } from "@/components/ui/button";
import { CV_FILE } from "@/content/contact";
import { useLocale, useMessages } from "@/i18n/locale-provider";

export function CvDownloadButton() {
  const locale = useLocale();
  const m = useMessages().about.cv;

  return (
    <Button href={`/${CV_FILE[locale]}`} download tone="yellow" size="lg">
      <span
        aria-hidden="true"
        className="relative transition-transform group-active/btn:-translate-y-1"
      >
        ⏏
      </span>
      <span className="relative">{m.download}</span>
    </Button>
  );
}
