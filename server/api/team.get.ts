export default defineEventHandler(async () =>
  (await prisma.teamMember.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] })).map(teamOut)
);
