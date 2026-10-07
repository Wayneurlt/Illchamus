const SUBJECTS: Record<string, string> = {
  volunteer: "Volunteering",
  partnership: "Partnership",
  donation: "Donation",
  program: "Program information",
  general: "General enquiry",
};

export default defineEventHandler(async (event) => {
  rateLimit(event, "contact", 5, 10 * 60_000);
  const body = await readBody<Record<string, unknown>>(event);

  // Honeypot: real visitors never fill this hidden field.
  if (str(body?.website)) return { ok: true };

  const firstName = str(body?.firstName, 80);
  const lastName = str(body?.lastName, 80);
  const email = str(body?.email, 200).toLowerCase();
  const phone = str(body?.phone, 40);
  const subject = str(body?.subject, 40);
  const message = str(body?.message, 2000);

  if (!firstName || !lastName) fail(400, "name_required");
  if (!EMAIL_RE.test(email)) fail(400, "email_invalid");
  if (!SUBJECTS[subject]) fail(400, "subject_required");
  if (message.length < 10) fail(400, "message_short");
  if (body?.consent !== true) fail(400, "consent_required");

  const name = `${firstName} ${lastName}`;
  const topic = SUBJECTS[subject]!;
  // Save first so nothing is lost if email delivery fails.
  const saved = await prisma.message.create({
    data: { kind: "contact", name, email, phone: phone || null, subject: topic, message },
  });
  const emailed = await notifyOrg(
    `New message: ${topic} — ${name}`,
    [
      ["Name", name],
      ["Email", email],
      ["Phone", phone],
      ["Topic", topic],
      ["Message", message],
    ],
    email
  );
  if (emailed) await prisma.message.update({ where: { id: saved.id }, data: { emailed: true } });
  return { ok: true };
});
