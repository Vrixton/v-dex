import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window/window";
import { ContactForm } from "@/features/contact/contact-form";
import { CvCartridge } from "@/features/contact/cv-cartridge";
import { DirectLinks } from "@/features/contact/direct-links";
import { MainChannel } from "@/features/contact/main-channel";
import { SignalStatus } from "@/features/contact/signal-status";

export default function ContactPage() {
  return (
    <Window
      title="CONTACT_ME"
      breadcrumb="COMM_CHANNEL"
      ledTone="white"
      fill
      scrollable
      actions={
        <Badge tone="green" led pulse>
          CONNECTION: READY
        </Badge>
      }
    >
      {/*
        Dos columnas: canales a la izquierda, cable link a la derecha. Para
        quitar el formulario basta con borrar su línea y dejar la rejilla en
        una sola columna centrada; el resto de la vista no se entera.
      */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5">
          <SignalStatus />
          <MainChannel />

          <div className="grid gap-5 sm:grid-cols-2">
            <CvCartridge />
            <DirectLinks />
          </div>
        </div>

        <ContactForm />
      </div>
    </Window>
  );
}
