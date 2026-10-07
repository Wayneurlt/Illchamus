import type { H3Event } from "h3";

/**
 * Throws 401 unless the request carries a valid admin session that started after
 * the last password change (so changing the password signs out other devices).
 */
export async function requireAdmin(event: H3Event) {
  const session = await requireUserSession(event);
  if ((session.user as { role?: string } | undefined)?.role !== "admin") fail(401, "unauthorized");
  const stored = await storedPassword();
  const loggedInAt = String((session as { loggedInAt?: string }).loggedInAt || "");
  if (stored && (!loggedInAt || loggedInAt < stored.changedAt)) {
    await clearUserSession(event);
    fail(401, "unauthorized");
  }
  return session;
}

/** Accepts uploaded, bundled or https image URLs only. */
export function imageUrl(value: unknown) {
  const url = str(value, 500);
  if (!url) return undefined;
  if (/^\/(uploads|images)\/[\w./-]+$/.test(url) && !url.includes("..") || /^https:\/\/[^\s"'<>]+$/.test(url)) return url;
  fail(400, "image_invalid");
}
