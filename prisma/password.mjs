// Password hashing shared by the seed and reset scripts. Must match
// server/utils/adminPassword.ts (scrypt, 16-byte salt, 64-byte key).
import { randomBytes, scrypt } from "node:crypto";

export function hashPassword(password) {
  const salt = randomBytes(16);
  return new Promise((resolve, reject) =>
    scrypt(password, salt, 64, (error, key) =>
      error ? reject(error) : resolve({ salt: salt.toString("hex"), hash: key.toString("hex"), changedAt: new Date().toISOString() })
    )
  );
}
