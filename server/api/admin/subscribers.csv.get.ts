import type { Subscriber } from "../../utils/content";

const cell = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const rows = (await listItems<Subscriber>("subscribers")).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  setHeader(event, "Content-Type", "text/csv; charset=utf-8");
  setHeader(event, "Content-Disposition", 'attachment; filename="newsletter-subscribers.csv"');
  return ["email,source,language,subscribed_at", ...rows.map((r) => [r.email, r.source, r.lang || "en", r.createdAt].map(cell).join(","))].join("\n");
});
