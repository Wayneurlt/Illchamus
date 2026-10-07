export type AdminType = "posts" | "events" | "team" | "messages" | "subscribers";

export interface AdminNavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number | string;
  badgeTone?: "alert" | "muted";
}

const ERRORS: Record<string, string> = {
  title_required: "Please add a title.",
  date_invalid: "Please choose a valid date.",
  end_date_invalid: "The end date must be on or after the start date.",
  time_invalid: "Please use times like 09:30.",
  slug_taken: "Another post already uses this web address. Change the title or the address.",
  name_role_required: "Please add a name and a role.",
  image_invalid: "That image link isn't valid.",
  unsupported_type: "Please upload a JPG, PNG or WebP image.",
  file_too_large: "That image is too large.",
  unauthorized: "Your session has ended. Please sign in again.",
  wrong_password: "The current password isn't right.",
  password_too_short: "The new password must be at least 10 characters.",
  password_too_long: "The new password is too long.",
  password_unchanged: "The new password must be different from the current one.",
  rate_limited: "Too many attempts. Please wait 15 minutes and try again.",
};

/** Readable message for an admin API error. */
export const adminError = (e: any) => {
  const code = e?.data?.data?.code;
  if (code && ERRORS[code]) return ERRORS[code]!;
  if (e?.statusCode === 401 || e?.status === 401) return ERRORS.unauthorized!;
  return e?.data?.statusMessage || "Something went wrong. Please try again.";
};

export function useAdminApi() {
  const list = <T>(type: AdminType) => $fetch<T[]>(`/api/admin/${type}`);
  const save = <T>(type: "posts" | "events" | "team", item: Record<string, unknown>) =>
    $fetch<T>(`/api/admin/${type}`, { method: "PUT", body: item });
  const remove = (type: AdminType, id: string) => $fetch(`/api/admin/${type}/${encodeURIComponent(id)}`, { method: "DELETE" });
  return { list, save, remove };
}

/**
 * Shrinks a photo in the browser (longest side ≤ maxSide, WebP or JPEG) so uploads
 * stay small even when straight from a phone camera, then uploads it.
 */
export async function uploadImage(file: File, maxSide = 1600): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();

  const toBlob = (type: string, quality: number) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  let blob = await toBlob("image/webp", 0.82);
  if (!blob || blob.type !== "image/webp") blob = await toBlob("image/jpeg", 0.85); // older Safari
  if (!blob) throw new Error("Could not read that image.");

  const body = new FormData();
  body.append("file", blob, blob.type === "image/webp" ? "photo.webp" : "photo.jpg");
  const { url } = await $fetch<{ url: string }>("/api/admin/upload", { method: "POST", body });
  return url;
}
