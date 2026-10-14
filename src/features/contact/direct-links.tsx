import Link from "next/link";

import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { PixelChevron } from "@/components/ui/pixel-chevron";
import { CONTACT } from "@/content/contact";
import type { Locale } from "@/i18n/locale";
import { getMessages } from "@/i18n/messages";

const ICON = { github: GithubIcon, linkedin: LinkedinIcon } as const;

export function DirectLinks({ locale }: { locale: Locale }) {
  const m = getMessages(locale).contact.links;

  return (
    <section className="flex flex-col gap-4 rounded-panel bg-surface p-4 md:p-5">
      <h2 className="text-sm text-fg md:text-base">{m.title}</h2>
      <ul className="flex flex-col gap-2">
        {CONTACT.networks.map((network) => {
          const Icon = ICON[network.icon];

          return (
            <li key={network.name}>
              <Link
                href={network.href}
                target="_blank"
                rel="noreferrer"
                className="group/link flex items-center gap-3 rounded-control bg-terminal/50 px-4 py-3 transition-colors hover:bg-terminal/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                <Icon className="size-4 shrink-0" />
                <span className="transition-colors group-hover/link:text-fg">{network.name}</span>
                <PixelChevron className="ml-auto size-3 transition-colors group-hover/link:text-brand-yellow motion-safe:group-hover/link:animate-nudge-right" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
