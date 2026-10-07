export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name") || "";
  if (!/^[a-z0-9]+-[a-f0-9]{8}\.(jpg|png|webp)$/.test(name)) throw createError({ statusCode: 404 });
  const file = await prisma.upload.findUnique({ where: { name } });
  if (!file) throw createError({ statusCode: 404 });
  setHeader(event, "Content-Type", file.mime);
  setHeader(event, "Content-Length", file.size);
  // Upload names are unique, so the file at a given URL never changes.
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
  return Buffer.from(file.data);
});
