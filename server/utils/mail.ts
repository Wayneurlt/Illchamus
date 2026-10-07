// Email delivery through Resend (https://resend.com). Without NUXT_RESEND_API_KEY
// nothing is sent, but messages and subscribers are still saved and appear in /admin.

const RESEND = "https://api.resend.com";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function mailConfigured() {
  return !!useRuntimeConfig().resendApiKey;
}

async function resend(path: string, body: unknown) {
  const { resendApiKey } = useRuntimeConfig();
  const res = await fetch(`${RESEND}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Resend ${path} failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/** Email a notification to the organisation inbox. Returns true when delivered. */
export async function notifyOrg(subject: string, fields: [label: string, value?: string | number][], replyTo?: string) {
  if (!mailConfigured()) return false;
  const { mailFrom, contactTo } = useRuntimeConfig();
  const rows = fields
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6a5853;vertical-align:top;white-space:nowrap"><b>${escapeHtml(k)}</b></td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(String(v))}</td></tr>`
    )
    .join("");
  const text = fields
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  try {
    await resend("/emails", {
      from: mailFrom,
      to: [contactTo],
      reply_to: replyTo,
      subject,
      text,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#2e1414"><h2 style="margin:0 0 12px">${escapeHtml(subject)}</h2><table>${rows}</table><p style="color:#6a5853;font-size:13px;margin-top:20px">Sent from the Illchamus Community CBO website. Reply to this email to respond.</p></div>`,
    });
    return true;
  } catch (error) {
    console.error("[mail]", error);
    return false;
  }
}

/** Add a newsletter subscriber to the Resend audience, if one is configured. */
export async function addToAudience(email: string) {
  const { resendAudienceId } = useRuntimeConfig();
  if (!mailConfigured() || !resendAudienceId) return false;
  try {
    await resend(`/audiences/${resendAudienceId}/contacts`, { email, unsubscribed: false });
    return true;
  } catch (error) {
    console.error("[mail]", error);
    return false;
  }
}
