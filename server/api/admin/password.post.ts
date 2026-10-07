// Change the admin password. Signs out every other device by moving the
// "sessions valid from" time forward, then re-issues this device's session.
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  rateLimit(event, "admin-password", 5, 15 * 60_000);
  const { current, next } = await readBody<{ current?: string; next?: string }>(event);
  if (!(await verifyAdminPassword(String(current || "")))) fail(401, "wrong_password");
  const password = String(next || "");
  if (password.length < MIN_PASSWORD_LENGTH) fail(400, "password_too_short");
  if (password.length > 200) fail(400, "password_too_long");
  if (password === current) fail(400, "password_unchanged");

  const changedAt = await setAdminPassword(password);
  await setUserSession(event, { user: { role: "admin" }, loggedInAt: new Date(Date.parse(changedAt) + 1).toISOString() });
  return { ok: true, changedAt };
});
