// Published posts, newest first. Optional ?limit=N. Bodies are omitted from the list.
export default defineEventHandler(async (event) => {
  const limit = Math.min(Number(getQuery(event).limit) || 100, 100);
  const rows = await prisma.post.findMany({
    where: { published: true },
    orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
    take: limit,
    omit: { body: true, bodySw: true },
  });
  return rows.map((row) => {
    const { body, bodySw, ...rest } = postOut({ ...row, body: "", bodySw: null });
    return rest;
  });
});
