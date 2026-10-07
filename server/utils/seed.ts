import { seedPosts } from "./seed-posts";
import type { Post, TeamMember } from "./content";

// Leadership roles to start from. Names and photos are added in /admin → Team.
const seedTeam: Omit<TeamMember, "id" | "updatedAt">[] = [
  { name: "Name coming soon", role: "Chairperson", roleSw: "Mwenyekiti", order: 1, published: true },
  { name: "Name coming soon", role: "Secretary", roleSw: "Katibu", order: 2, published: true },
  { name: "Name coming soon", role: "Treasurer", roleSw: "Mweka Hazina", order: 3, published: true },
  { name: "Name coming soon", role: "Programs Coordinator", roleSw: "Mratibu wa Programu", order: 4, published: true },
];

/** Writes starter content once per collection; never overwrites later edits. */
export async function seedContent() {
  const s = store();
  const now = new Date().toISOString();

  if (!(await s.hasItem("meta:seeded-posts.json"))) {
    for (const p of seedPosts) {
      const post: Post = { ...p, updatedAt: now };
      await putItem("posts", post.slug, post);
    }
    await s.setItem("meta:seeded-posts.json", { at: now });
  }

  if (!(await s.hasItem("meta:seeded-team.json"))) {
    // Fixed ids keep this idempotent when several server processes start at once.
    for (const member of seedTeam) {
      const id = `seed-${member.order}`;
      await putItem<TeamMember>("team", id, { ...member, id, updatedAt: now });
    }
    await s.setItem("meta:seeded-team.json", { at: now });
  }
}
