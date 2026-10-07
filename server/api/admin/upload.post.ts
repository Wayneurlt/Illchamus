import { randomBytes } from "node:crypto";

const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const MAX_BYTES = 4 * 1024 * 1024;

// Image upload for posts, events and team photos. The admin page shrinks images
// in the browser first, so files arriving here are already web-sized.
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const parts = await readMultipartFormData(event);
  const file = parts?.find((p) => p.name === "file" && p.data?.length);
  if (!file) fail(400, "file_required");
  const ext = TYPES[file.type || ""];
  if (!ext) fail(415, "unsupported_type");
  if (file.data.length > MAX_BYTES) fail(413, "file_too_large");
  const name = `${Date.now().toString(36)}-${randomBytes(4).toString("hex")}.${ext}`;
  await store().setItemRaw(`uploads:${name}`, file.data);
  return { url: `/uploads/${name}` };
});
