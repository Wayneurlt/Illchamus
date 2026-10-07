// Lets the admin show whether email delivery is set up and where the password comes from.
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const { resendApiKey, resendAudienceId, contactTo } = useRuntimeConfig();
  const [stored, impact, mailResult] = await Promise.all([
    storedPassword(),
    prisma.setting.findUnique({ where: { key: "impact" }, select: { updatedAt: true } }),
    lastMailResult(),
  ]);
  return {
    mail: !!resendApiKey,
    audience: !!(resendApiKey && resendAudienceId),
    contactTo,
    passwordSource: stored ? ("custom" as const) : ("server" as const),
    passwordChangedAt: stored?.changedAt || null,
    minPasswordLength: MIN_PASSWORD_LENGTH,
    impactUpdatedAt: impact?.updatedAt.toISOString() || null,
    lastMail: mailResult,
  };
});
