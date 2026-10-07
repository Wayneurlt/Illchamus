const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name") || "";
  const match = /^[a-z0-9]+-[a-f0-9]{8}\.(jpg|png|webp)$/.exec(name);
  if (!match) throw createError({ statusCode: 404 });
  const data = await useStorage("site").getItemRaw<Buffer>(`uploads:${name}`);
  if (!data) throw createError({ statusCode: 404 });
  setHeader(event, "Content-Type", TYPES[match[1]!]!);
  // Upload names are unique, so the file at a given URL never changes.
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
  return data;
});
