import { createHash } from "node:crypto";
import type { Subscriber } from "../utils/content";

export default defineEventHandler(async (event) => {
  rateLimit(event, "newsletter", 8, 10 * 60_000);
  const body = await readBody<Record<string, unknown>>(event);
  if (str(body?.website)) return { ok: true };

  const email = str(body?.email, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) fail(400, "email_invalid");
  const source = ["footer", "shop", "donate"].includes(str(body?.source, 20)) ? str(body?.source, 20) : "footer";
  const lang = str(body?.lang, 2) === "sw" ? "sw" : "en";

  const id = createHash("sha256").update(email).digest("hex").slice(0, 24);
  const existing = await getItem<Subscriber>("subscribers", id);
  if (existing) return { ok: true, already: true };

  await putItem<Subscriber>("subscribers", id, { email, source, lang, createdAt: new Date().toISOString() });
  await addToAudience(email);
  return { ok: true };
});
