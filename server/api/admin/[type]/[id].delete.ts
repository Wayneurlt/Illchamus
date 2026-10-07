import type { Collection } from "../../../utils/content";

const DELETABLE: Collection[] = ["posts", "events", "team", "messages", "subscribers"];

export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const type = getRouterParam(event, "type") as Collection;
  const id = getRouterParam(event, "id") || "";
  if (!DELETABLE.includes(type) || !id) fail(404, "not_found");
  await removeItem(type, id);
  return { ok: true };
});
