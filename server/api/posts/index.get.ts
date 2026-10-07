import type { Post } from "../../utils/content";

// Published posts, newest first. Optional ?limit=N. Bodies are omitted from the list.
export default defineEventHandler(async (event) => {
  const limit = Math.min(Number(getQuery(event).limit) || 100, 100);
  const posts = (await listItems<Post>("posts"))
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date) || b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit)
    .map(({ body, bodySw, ...rest }) => rest);
  return posts;
});
