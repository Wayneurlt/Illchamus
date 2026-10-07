export default defineEventHandler(async (event) => {
  rateLimit(event, "admin-login", 10, 15 * 60_000);
  if (!(await adminPasswordConfigured())) fail(503, "admin_not_configured");
  const { password } = await readBody<{ password?: string }>(event);
  if (!(await verifyAdminPassword(String(password || "")))) fail(401, "wrong_password");
  await setUserSession(event, { user: { role: "admin" }, loggedInAt: new Date().toISOString() });
  return { ok: true };
});
