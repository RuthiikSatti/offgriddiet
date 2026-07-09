/**
 * Waitlist subscribe helper — provider-ready with a graceful no-key fallback.
 *
 * Priority order (first configured provider wins):
 *   1. MailerLite   — set MAILERLITE_API_KEY (+ optional MAILERLITE_GROUP_ID)
 *   2. Buttondown   — set BUTTONDOWN_API_KEY
 *   3. Resend       — set RESEND_API_KEY + RESEND_AUDIENCE_ID (Audiences)
 *
 * If NONE are set, we run in "no-key mode": the email is logged to the server
 * console and we return { ok: true, stored: false }. The signup UX still works,
 * but the address is NOT persisted anywhere until you connect a provider.
 * Recommended: MailerLite (generous free tier) so you own a real email list to
 * message when the app launches.
 */

export type SubscribeResult = {
  ok: boolean;
  stored: boolean;
  duplicate?: boolean;
  error?: string;
};

export async function subscribeEmail(
  email: string,
  source?: string
): Promise<SubscribeResult> {
  const mailerlite = process.env.MAILERLITE_API_KEY;
  const buttondown = process.env.BUTTONDOWN_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const resendAudience = process.env.RESEND_AUDIENCE_ID;

  try {
    if (mailerlite) return await viaMailerLite(email, mailerlite);
    if (buttondown) return await viaButtondown(email, buttondown);
    if (resendKey && resendAudience)
      return await viaResend(email, resendKey, resendAudience);
  } catch (err) {
    console.error("[subscribe] provider error:", err);
    return { ok: false, stored: false, error: "Could not save right now." };
  }

  // No provider configured
  console.warn(
    `[subscribe] NO PROVIDER SET — email not persisted. email="${email}" source="${source ?? ""}"`
  );
  return { ok: true, stored: false };
}

async function viaMailerLite(
  email: string,
  key: string
): Promise<SubscribeResult> {
  const groups = process.env.MAILERLITE_GROUP_ID
    ? [process.env.MAILERLITE_GROUP_ID]
    : undefined;
  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ email, ...(groups ? { groups } : {}) }),
  });
  // MailerLite returns 200/201 for created, 200 for existing.
  if (res.ok) return { ok: true, stored: true };
  if (res.status === 422) return { ok: true, stored: true, duplicate: true };
  const text = await res.text();
  console.error("[subscribe] MailerLite:", res.status, text);
  return { ok: false, stored: false, error: "Could not save right now." };
}

async function viaButtondown(
  email: string,
  key: string
): Promise<SubscribeResult> {
  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${key}`,
    },
    body: JSON.stringify({ email_address: email }),
  });
  if (res.ok) return { ok: true, stored: true };
  if (res.status === 400) return { ok: true, stored: true, duplicate: true };
  const text = await res.text();
  console.error("[subscribe] Buttondown:", res.status, text);
  return { ok: false, stored: false, error: "Could not save right now." };
}

async function viaResend(
  email: string,
  key: string,
  audienceId: string
): Promise<SubscribeResult> {
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const { error } = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });
  if (!error) return { ok: true, stored: true };
  console.error("[subscribe] Resend:", error);
  return { ok: false, stored: false, error: "Could not save right now." };
}
