export default defineEventHandler(async (event) => {
  const slug = safeId(getRouterParam(event, "slug") || "");
  const post = slug ? await prisma.post.findUnique({ where: { slug } }) : null;
  if (!post || !post.published) fail(404, "not_found");
  return postOut(post);
});
