import type { Post, SiteEvent, TeamMember } from "../../../utils/content";

// Create or update a post, event or team member (admin only).
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const type = getRouterParam(event, "type");
  const b = await readBody<Record<string, unknown>>(event);
  const now = new Date().toISOString();
  const published = b?.published !== false;

  if (type === "posts") {
    const title = str(b.title, 200);
    if (!title) fail(400, "title_required");
    const date = str(b.date, 10);
    if (!DATE_RE.test(date)) fail(400, "date_invalid");
    const slug = safeId(str(b.slug, 80)) || slugify(title);
    const previous = safeId(str(b.originalSlug, 80));
    if (!previous || previous !== slug) {
      if (await getItem("posts", slug)) fail(409, "slug_taken");
    }
    const post: Post = {
      slug,
      title,
      titleSw: optional(b.titleSw, 200),
      date,
      tag: optional(b.tag, 40),
      excerpt: str(b.excerpt, 400),
      excerptSw: optional(b.excerptSw, 400),
      body: str(b.body, 60_000),
      bodySw: optional(b.bodySw, 60_000),
      image: imageUrl(b.image),
      published,
      updatedAt: now,
    };
    await putItem("posts", slug, post);
    if (previous && previous !== slug) await removeItem("posts", previous);
    return post;
  }

  if (type === "events") {
    const title = str(b.title, 200);
    if (!title) fail(400, "title_required");
    const date = str(b.date, 10);
    if (!DATE_RE.test(date)) fail(400, "date_invalid");
    const endDate = optional(b.endDate, 10);
    if (endDate && (!DATE_RE.test(endDate) || endDate < date)) fail(400, "end_date_invalid");
    const startTime = optional(b.startTime, 5);
    const endTime = optional(b.endTime, 5);
    if ((startTime && !TIME_RE.test(startTime)) || (endTime && !TIME_RE.test(endTime))) fail(400, "time_invalid");
    const id = safeId(str(b.id, 40)) || newId();
    const item: SiteEvent = {
      id,
      title,
      titleSw: optional(b.titleSw, 200),
      date,
      endDate,
      startTime,
      endTime,
      location: optional(b.location, 200),
      category: optional(b.category, 40),
      description: optional(b.description, 5000),
      descriptionSw: optional(b.descriptionSw, 5000),
      image: imageUrl(b.image),
      published,
      updatedAt: now,
    };
    return putItem("events", id, item);
  }

  if (type === "team") {
    const name = str(b.name, 120);
    const role = str(b.role, 120);
    if (!name || !role) fail(400, "name_role_required");
    const id = safeId(str(b.id, 40)) || newId();
    const member: TeamMember = {
      id,
      name,
      role,
      roleSw: optional(b.roleSw, 120),
      bio: optional(b.bio, 1000),
      bioSw: optional(b.bioSw, 1000),
      photo: imageUrl(b.photo),
      order: Number.isFinite(Number(b.order)) ? Number(b.order) : 99,
      published,
      updatedAt: now,
    };
    return putItem("team", id, member);
  }

  fail(404, "not_found");
});
