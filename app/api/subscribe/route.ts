import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/schemas";
import { subscribeEmail } from "@/lib/subscribe";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 }
    );
  }

  const { email, company, source } = parsed.data;

  // Honeypot: silently accept bots without storing.
  if (company && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = await subscribeEmail(email, source);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error || "Could not sign up right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, stored: result.stored });
}
