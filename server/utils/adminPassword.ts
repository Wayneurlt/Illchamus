import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

// Admin password handling. A salted scrypt hash is kept in the database (Setting
// row "admin_password"); it is created by the seed from NUXT_ADMIN_PASSWORD and
// replaced when the password is changed in /admin → Settings. With no row, the
// NUXT_ADMIN_PASSWORD value is used directly. Deleting the row (or running
// `npm run admin:reset-password`) is the recovery route if it's forgotten.

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;
const KEY = "admin_password";

interface StoredPassword {
  salt: string;
  hash: string;
  changedAt: string;
}

export const MIN_PASSWORD_LENGTH = 10;

const sha = (s: string) => createHash("sha256").update(s).digest();

export async function storedPassword(): Promise<StoredPassword | null> {
  const row = await prisma.setting.findUnique({ where: { key: KEY } });
  if (!row) return null;
  try {
    return JSON.parse(row.value) as StoredPassword;
  } catch {
    return null;
  }
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
  const value = JSON.stringify(record);
  await prisma.setting.upsert({ where: { key: KEY }, create: { key: KEY, value }, update: { value } });
  return record.changedAt;
}
