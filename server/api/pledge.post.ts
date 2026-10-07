// Donation pledges: saves the donor's details and alerts the team, who follow up
// with payment instructions (M-Pesa, bank transfer or PayPal).
export default defineEventHandler(async (event) => {
  rateLimit(event, "pledge", 5, 10 * 60_000);
  const body = await readBody<Record<string, unknown>>(event);
  if (str(body?.website)) return { ok: true };

  const name = str(body?.name, 120);
  const email = str(body?.email, 200).toLowerCase();
  const phone = str(body?.phone, 40);
  const amount = Math.round(Number(body?.amount));
  const frequency = body?.frequency === "monthly" ? "Monthly" : "One-time";

  if (!name) fail(400, "name_required");
  if (!EMAIL_RE.test(email)) fail(400, "email_invalid");
  if (!Number.isFinite(amount) || amount < 1 || amount > 100_000_000) fail(400, "amount_invalid");

  const saved = await prisma.message.create({
    data: { kind: "pledge", name, email, phone: phone || null, amount, frequency },
  });

  const emailed = await notifyOrg(
    `New donation pledge: KES ${amount.toLocaleString("en-US")} (${frequency}) — ${name}`,
    [
      ["Name", name],
      ["Email", email],
      ["Phone (M-Pesa)", phone],
      ["Amount", `KES ${amount.toLocaleString("en-US")}`],
      ["Frequency", frequency],
    ],
    email
  );
  if (emailed) await prisma.message.update({ where: { id: saved.id }, data: { emailed: true } });
  return { ok: true };
});
