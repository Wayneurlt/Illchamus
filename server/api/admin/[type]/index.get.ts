import type { Collection } from "../../../utils/content";

const SORTERS: Record<Collection, (a: any, b: any) => number> = {
  posts: (a, b) => b.date.localeCompare(a.date),
  events: (a, b) => b.date.localeCompare(a.date),
  team: (a, b) => a.order - b.order,
  messages: (a, b) => b.createdAt.localeCompare(a.createdAt),
  subscribers: (a, b) => b.createdAt.localeCompare(a.createdAt),
};

// Everything in a collection, drafts included (admin only).
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const type = getRouterParam(event, "type") as Collection;
  if (!SORTERS[type]) fail(404, "not_found");
  if (type === "subscribers") {
    // Subscribers are keyed by a hash of the email; expose it so they can be removed.
    const keys = (await store().getKeys("subscribers")).filter((k) => k.endsWith(".json"));
    const withIds = await Promise.all(
      keys.map(async (k) => ({ id: k.replace(/^subscribers:/, "").replace(/\.json$/, ""), ...(await store().getItem<any>(k)) }))
    );
    return withIds.sort(SORTERS.subscribers);
  }
  return (await listItems<any>(type)).sort(SORTERS[type]);
});
