import { NextResponse } from "next/server";

import { hasErrors, looksLikeSpam, validateContact } from "@/lib/contact-schema";
import { contactEmailHtml, contactEmailText } from "@/lib/email/contact-template";
import { checkRateLimit } from "@/lib/rate-limit";

/** A dónde llegan los mensajes del formulario. */
const TO = "victor.villavicencio.10@gmail.com";
/** Remitente de pruebas de Resend: funciona sin dominio propio verificado. */
const FROM = "V-DEX <onboarding@resend.dev>";

/**
 * Envío del formulario de contacto.
 *
 * Se valida aquí aunque el navegador ya lo haya hecho: la validación del
 * cliente es comodidad, no seguridad, y esta ruta es pública.
 *
 * Llama a Resend con fetch en vez de su SDK: es una sola petición HTTP y
 * así el proyecto no arrastra una dependencia por cuatro líneas.
 */
export async function POST(request: Request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  // A un bot se le responde que todo fue bien: si sabe que ha fallado,
  // vuelve a intentarlo cambiando de táctica.
  if (looksLikeSpam(input)) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(input);
  if (hasErrors(errors)) {
    return NextResponse.json({ error: "VALIDATION_FAILED", errors }, { status: 400 });
  }

  // Un portafolio no necesita más de tres mensajes al día desde la misma IP.
  // Va después de validar para que un formulario mal relleno no gaste cupo.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Falta configuración: es un fallo del servidor, no del visitante.
    // Se comprueba después de validar para que un formulario mal relleno
    // reciba siempre el mismo error, haya clave o no.
    return NextResponse.json({ error: "SERVICE_UNAVAILABLE" }, { status: 503 });
  }

  const name = String(input.name).trim();
  const email = String(input.email).trim();
  const message = String(input.message).trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        // El prefijo permite filtrar estos mensajes en el gestor de correo
        subject: `[V-DEX]: New message from ${name}`,
        // reply_to para poder responder directamente a quien escribe
        reply_to: email,
        text: contactEmailText({ name, email, message }),
        html: contactEmailHtml({ name, email, message }),
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "SEND_FAILED" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "SEND_FAILED" }, { status: 502 });
  }
}
