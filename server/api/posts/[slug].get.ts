import type { Post } from "../../utils/content";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") || "";
  const post = await getItem<Post>("posts", slug);
  if (!post || !post.published) fail(404, "not_found");
  return post;
});
