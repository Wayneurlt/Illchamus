// Everything in a collection, drafts included (admin only).
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  switch (getRouterParam(event, "type")) {
    case "posts":
      return (await prisma.post.findMany({ orderBy: [{ date: "desc" }, { updatedAt: "desc" }] })).map(postOut);
    case "events":
      return (await prisma.event.findMany({ orderBy: [{ date: "desc" }, { startTime: "asc" }] })).map(eventOut);
    case "team":
      return (await prisma.teamMember.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] })).map(teamOut);
    case "messages":
      return (await prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 1000 })).map(messageOut);
    case "subscribers":
      return (await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } })).map(subscriberOut);
    default:
      fail(404, "not_found");
  }
});
