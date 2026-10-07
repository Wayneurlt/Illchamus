// Create or update a post, event or team member (admin only).
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const type = getRouterParam(event, "type");
  const b = await readBody<Record<string, unknown>>(event);
  const published = b?.published !== false;
  // Empty optional text is stored as NULL.
  const nul = (v: unknown, max = 500) => optional(v, max) ?? null;

  if (type === "posts") {
    const title = str(b.title, 200);
    if (!title) fail(400, "title_required");
    const date = str(b.date, 10);
    if (!DATE_RE.test(date)) fail(400, "date_invalid");
    const slug = safeId(str(b.slug, 80)) || slugify(title);
    const previous = safeId(str(b.originalSlug, 80));
    if (previous !== slug && (await prisma.post.findUnique({ where: { slug }, select: { slug: true } }))) fail(409, "slug_taken");

    const data = {
      title,
      titleSw: nul(b.titleSw, 200),
      date: toDate(date),
      tag: nul(b.tag, 40),
      excerpt: str(b.excerpt, 400),
      excerptSw: nul(b.excerptSw, 400),
      body: str(b.body, 60_000),
      bodySw: nul(b.bodySw, 60_000),
      image: imageUrl(b.image) ?? null,
      published,
    };
    // Renaming the web address moves the post to the new slug.
    const saved =
      previous && previous !== slug
        ? (await prisma.$transaction([prisma.post.deleteMany({ where: { slug: previous } }), prisma.post.create({ data: { slug, ...data } })]))[1]
        : await prisma.post.upsert({ where: { slug }, create: { slug, ...data }, update: data });
    return postOut(saved);
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

    const data = {
      title,
      titleSw: nul(b.titleSw, 200),
      date: toDate(date),
      endDate: endDate ? toDate(endDate) : null,
      startTime: startTime ?? null,
      endTime: startTime ? endTime ?? null : null,
      location: nul(b.location, 200),
      category: nul(b.category, 40),
      description: nul(b.description, 5000),
      descriptionSw: nul(b.descriptionSw, 5000),
      image: imageUrl(b.image) ?? null,
      published,
    };
    const id = safeId(str(b.id, 40));
    const saved = id
      ? await prisma.event.upsert({ where: { id }, create: { id, ...data }, update: data })
      : await prisma.event.create({ data });
    return eventOut(saved);
  }

  if (type === "team") {
    const name = str(b.name, 120);
    const role = str(b.role, 120);
    if (!name || !role) fail(400, "name_role_required");
    const data = {
      name,
      role,
      roleSw: nul(b.roleSw, 120),
      bio: nul(b.bio, 1000),
      bioSw: nul(b.bioSw, 1000),
      photo: imageUrl(b.photo) ?? null,
      order: Number.isFinite(Number(b.order)) ? Math.round(Number(b.order)) : 99,
      published,
    };
    const id = safeId(str(b.id, 40));
    const saved = id
      ? await prisma.teamMember.upsert({ where: { id }, create: { id, ...data }, update: data })
      : await prisma.teamMember.create({ data });
    return teamOut(saved);
  }

  fail(404, "not_found");
});
