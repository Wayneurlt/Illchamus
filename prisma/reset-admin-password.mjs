// Sets the admin password to the value of NUXT_ADMIN_PASSWORD (from .env), replacing
// whatever was set in /admin. Use this if the password is forgotten:
//   npm run admin:reset-password
// Changing the password signs out every device that was logged in.
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./password.mjs";

const password = process.env.NUXT_ADMIN_PASSWORD;
if (!password || password.length < 10) {
  console.error("Set NUXT_ADMIN_PASSWORD (at least 10 characters) in .env first.");
  process.exit(1);
}

const prisma = new PrismaClient();
const value = JSON.stringify(await hashPassword(password));
await prisma.setting.upsert({ where: { key: "admin_password" }, create: { key: "admin_password", value }, update: { value } });
await prisma.$disconnect();
console.log("Admin password reset to NUXT_ADMIN_PASSWORD.");
