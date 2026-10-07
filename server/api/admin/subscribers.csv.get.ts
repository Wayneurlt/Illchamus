const cell = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const rows = await prisma.subscriber.findMany({ orderBy: { createdAt: "asc" } });
  setHeader(event, "Content-Type", "text/csv; charset=utf-8");
  setHeader(event, "Content-Disposition", 'attachment; filename="newsletter-subscribers.csv"');
  return ["email,source,language,subscribed_at", ...rows.map((r) => [r.email, r.source, r.lang, r.createdAt.toISOString()].map(cell).join(","))].join("\n");
});
