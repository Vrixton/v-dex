import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { CommLinkPanels } from "@/features/contact/comm-link-panels";
import { CvCartridge } from "@/features/contact/cv-cartridge";
import { DirectLinks } from "@/features/contact/direct-links";
import { MainChannel } from "@/features/contact/main-channel";

export default function ContactPage() {
  return (
    <Window
      title="CONTACT_ME"
      breadcrumb="COMM_LINK"
      ledTone="white"
      fill
      scrollable
      actions={
        <Badge tone="green" led pulse>
          CONNECTION: READY
        </Badge>
      }
    >
      <CommLinkPanels
        mainChannel={<MainChannel />}
        cartridge={<CvCartridge />}
        links={<DirectLinks />}
      />
    </Window>
  );
}
