"use client";

import { Button } from "@/components/ui/button";
import { CV_FILE } from "@/content/contact";

export function CvDownloadButton() {
  return (
    <Button href={`/${CV_FILE}`} download tone="yellow" size="lg">
      <span
        aria-hidden="true"
        className="relative transition-transform group-active/btn:-translate-y-1"
      >
        ⏏
      </span>
      <span className="relative">EJECT / DOWNLOAD</span>
    </Button>
  );
}
