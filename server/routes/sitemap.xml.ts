import type { Post, SiteEvent } from "../utils/content";

const STATIC = ["/", "/about", "/events", "/gallery", "/blog", "/donate", "/contact", "/products", "/privacy", "/terms", "/credits"];

export default defineEventHandler(async (event) => {
  const origin = siteOrigin(event);
  const posts = (await listItems<Post>("posts")).filter((p) => p.published);
  const events = (await listItems<SiteEvent>("events")).filter((e) => e.published);
  const latestEvent = events.reduce((max, e) => (e.updatedAt > max ? e.updatedAt : max), "");

  const urls = [
    ...STATIC.map((path) => ({ loc: path, lastmod: path === "/events" ? latestEvent : "" })),
    ...posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.updatedAt })),
  ];
  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${origin}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ""}</url>`)
  .join("\n")}
</urlset>`;
});
