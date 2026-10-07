export default defineEventHandler(async (event) => {
  rateLimit(event, "newsletter", 8, 10 * 60_000);
  const body = await readBody<Record<string, unknown>>(event);
  if (str(body?.website)) return { ok: true };

  const email = str(body?.email, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) fail(400, "email_invalid");
  const source = ["footer", "shop", "donate"].includes(str(body?.source, 20)) ? str(body?.source, 20) : "footer";
  const lang = str(body?.lang, 2) === "sw" ? "sw" : "en";

  const existing = await prisma.subscriber.findUnique({ where: { email } });
  if (existing) return { ok: true, already: true };

  try {
    await prisma.subscriber.create({ data: { email, source, lang } });
  } catch (error: any) {
    // Two sign-ups for the same email at the same moment: treat as already subscribed.
    if (error?.code === "P2002") return { ok: true, already: true };
    throw error;
  }
  await addToAudience(email);
  return { ok: true };
});
