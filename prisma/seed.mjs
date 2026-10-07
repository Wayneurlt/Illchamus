// Seeds starter content: the original news posts, the four leadership roles and the
// admin password (hashed, from NUXT_ADMIN_PASSWORD). Safe to run again: existing
// rows are never overwritten, so edits made in /admin are kept.
//   npx prisma db seed
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./password.mjs";

const prisma = new PrismaClient();
const posts = JSON.parse(readFileSync(new URL("./seed-posts.json", import.meta.url), "utf8"));

const team = [
  { id: "seed-1", name: "Name coming soon", role: "Chairperson", roleSw: "Mwenyekiti", order: 1 },
  { id: "seed-2", name: "Name coming soon", role: "Secretary", roleSw: "Katibu", order: 2 },
  { id: "seed-3", name: "Name coming soon", role: "Treasurer", roleSw: "Mweka Hazina", order: 3 },
  { id: "seed-4", name: "Name coming soon", role: "Programs Coordinator", roleSw: "Mratibu wa Programu", order: 4 },
];

async function main() {
  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, date: new Date(`${p.date}T00:00:00.000Z`) },
    });
  }
  for (const member of team) {
    await prisma.teamMember.upsert({ where: { id: member.id }, update: {}, create: member });
  }

  const password = process.env.NUXT_ADMIN_PASSWORD;
  const existing = await prisma.setting.findUnique({ where: { key: "admin_password" } });
  if (password && !existing) {
    await prisma.setting.create({ data: { key: "admin_password", value: JSON.stringify(await hashPassword(password)) } });
    console.log("Admin password set from NUXT_ADMIN_PASSWORD.");
  }

  const counts = await Promise.all([prisma.post.count(), prisma.teamMember.count(), prisma.event.count(), prisma.message.count(), prisma.subscriber.count()]);
  console.log(`Seeded. posts=${counts[0]} team=${counts[1]} events=${counts[2]} messages=${counts[3]} subscribers=${counts[4]}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
