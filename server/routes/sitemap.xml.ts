const STATIC = ["/", "/about", "/events", "/gallery", "/blog", "/donate", "/contact", "/products", "/privacy", "/terms", "/credits"];

export default defineEventHandler(async (event) => {
  const origin = siteOrigin(event);
  const [posts, latestEvent] = await Promise.all([
    prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true }, orderBy: { date: "desc" } }),
    prisma.event.findFirst({ where: { published: true }, orderBy: { updatedAt: "desc" }, select: { updatedAt: true } }),
  ]);

  const urls = [
    ...STATIC.map((path) => ({ loc: path, lastmod: path === "/events" && latestEvent ? latestEvent.updatedAt.toISOString() : "" })),
    ...posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.updatedAt.toISOString() })),
  ];
  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${origin}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ""}</url>`)
  .join("\n")}
</urlset>`;
});
