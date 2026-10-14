import { NextResponse } from "next/server";

import { hasErrors, looksLikeSpam, validateContact } from "@/lib/contact-schema";
import { contactEmailHtml, contactEmailText } from "@/lib/email/contact-template";
import { checkRateLimit } from "@/lib/rate-limit";

const TO = "victor.villavicencio.10@gmail.com";
const FROM = "V-DEX <onboarding@resend.dev>";

export async function POST(request: Request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const flagged = looksLikeSpam(input);
  if (flagged) {
    console.warn("[contact] flagged as suspicious:", {
      ref: input.website,
      elapsed: Date.now() - (input.startedAt ?? 0),
    });
  }

  const errors = validateContact(input);
  if (hasErrors(errors)) {
    return NextResponse.json({ error: "VALIDATION_FAILED", errors }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
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
        subject: `[V-DEX]${flagged ? "[FLAGGED]" : ""}: New message from ${name}`,
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
