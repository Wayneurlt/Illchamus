import type { SiteEvent } from "../utils/content";

// Published events in date order. ?upcoming=1 keeps events that have not ended yet; ?limit=N.
export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const today = new Date().toISOString().slice(0, 10);
  let events = (await listItems<SiteEvent>("events"))
    .filter((e) => e.published)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.startTime || "").localeCompare(b.startTime || ""));
  if (q.upcoming) events = events.filter((e) => (e.endDate || e.date) >= today);
  return events.slice(0, Math.min(Number(q.limit) || 500, 500));
});
