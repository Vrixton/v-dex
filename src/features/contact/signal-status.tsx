import { Terminal, TerminalCursor } from "@/components/ui/terminal";

/**
 * Estado del enlace de comunicaciones.
 *
 * Reutiliza el componente Terminal, así que la cabecera, la extensión .EXE
 * y el cursor son los mismos que en la bio y en las fichas de proyecto.
 */
export function SignalStatus() {
  return (
    <Terminal program="COMMUNICATION_LINK" status="ONLINE">
      <p>
        Awaiting your message...
        <TerminalCursor />
      </p>
    </Terminal>
  );
}
