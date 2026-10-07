// Sends a test notification to the organisation inbox and reports the result.
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  rateLimit(event, "test-email", 5, 10 * 60_000);
  if (!mailConfigured()) return { ok: false, error: "Email isn't set up: NUXT_RESEND_API_KEY is missing on the server." };
  const ok = await notifyOrg("Test email from the Illchamus website", [
    ["Result", "If you can read this, website emails are reaching this inbox."],
    ["Sent", new Date().toLocaleString("en-GB", { timeZone: "Africa/Nairobi" }) + " (Kenya time)"],
  ]);
  return { ok, error: ok ? undefined : (await lastMailResult())?.error };
});
