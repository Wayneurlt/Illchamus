export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const type = getRouterParam(event, "type");
  const id = getRouterParam(event, "id") || "";
  if (!id) fail(404, "not_found");
  // deleteMany: deleting something already gone is not an error.
  switch (type) {
    case "posts":
      await prisma.post.deleteMany({ where: { slug: id } });
      break;
    case "events":
      await prisma.event.deleteMany({ where: { id } });
      break;
    case "team":
      await prisma.teamMember.deleteMany({ where: { id } });
      break;
    case "messages":
      await prisma.message.deleteMany({ where: { id } });
      break;
    case "subscribers":
      await prisma.subscriber.deleteMany({ where: { id } });
      break;
    default:
      fail(404, "not_found");
  }
  return { ok: true };
});
