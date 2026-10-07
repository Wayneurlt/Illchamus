import type { TeamMember } from "../utils/content";

export default defineEventHandler(async () =>
  (await listItems<TeamMember>("team")).filter((m) => m.published).sort((a, b) => a.order - b.order)
);
