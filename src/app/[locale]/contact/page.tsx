import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { CommLinkPanels } from "@/features/contact/comm-link-panels";
import { CvCartridge } from "@/features/contact/cv-cartridge";
import { DirectLinks } from "@/features/contact/direct-links";
import { MainChannel } from "@/features/contact/main-channel";
import { getMessages } from "@/i18n/messages";
import { routeLocale, type LocaleRouteProps } from "@/i18n/route-locale";

export default async function ContactPage({ params }: LocaleRouteProps) {
  const locale = await routeLocale(params);
  const m = getMessages(locale).contact;

  return (
    <Window
      title={m.window.title}
      breadcrumb={m.window.breadcrumb}
      ledTone="white"
      fill
      scrollable
      actions={
        <Badge tone="green" led>
          {m.window.connection}
        </Badge>
      }
    >
      <CommLinkPanels
        mainChannel={<MainChannel />}
        cartridge={<CvCartridge locale={locale} />}
        links={<DirectLinks locale={locale} />}
      />
    </Window>
  );
}
