// Published events in date order. ?upcoming=1 keeps events that have not ended yet; ?limit=N.
export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const today = toDate(new Date(Date.now() + 3 * 3600_000).toISOString().slice(0, 10)); // Kenya date
  const rows = await prisma.event.findMany({
    where: {
      published: true,
      ...(q.upcoming ? { OR: [{ endDate: { gte: today } }, { endDate: null, date: { gte: today } }] } : {}),
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    take: Math.min(Number(q.limit) || 500, 500),
  });
  return rows.map(eventOut);
});
