import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

// Admin password handling. Until the password is changed in /admin → Settings,
// NUXT_ADMIN_PASSWORD is used. After a change, a salted scrypt hash is stored in
// the data folder (meta/admin-password.json) and takes over. Deleting that file
// restores the environment password, which is the recovery route if it's forgotten.

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;
const KEY = "meta:admin-password.json";

interface StoredPassword {
  salt: string;
  hash: string;
  changedAt: string;
}

export const MIN_PASSWORD_LENGTH = 10;

const sha = (s: string) => createHash("sha256").update(s).digest();

export async function storedPassword() {
  return useStorage("site").getItem<StoredPassword>(KEY);
}

/** True when the password matches the stored one (or, if none is stored, the environment one). */
export async function verifyAdminPassword(password: string) {
  if (typeof password !== "string" || !password) return false;
  const stored = await storedPassword();
  if (stored) {
    const hash = await scrypt(password, Buffer.from(stored.salt, "hex"), 64);
    return timingSafeEqual(hash, Buffer.from(stored.hash, "hex"));
  }
  const { adminPassword } = useRuntimeConfig();
  return !!adminPassword && timingSafeEqual(sha(password), sha(adminPassword));
}

export async function adminPasswordConfigured() {
  return !!(await storedPassword()) || !!useRuntimeConfig().adminPassword;
}

export async function setAdminPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  const record: StoredPassword = { salt: salt.toString("hex"), hash: hash.toString("hex"), changedAt: new Date().toISOString() };
  await useStorage("site").setItem(KEY, record);
  return record.changedAt;
}
