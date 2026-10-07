import type { Post, SiteEvent, TeamMember } from "~/server/utils/content";
import { defaultImpact, type ImpactData } from "~/data/impact";

export type PostSummary = Omit<Post, "body" | "bodySw">;
export type { Post, SiteEvent, TeamMember };

/** Published news posts, newest first. */
export const usePosts = (limit?: number) =>
  useFetch<PostSummary[]>("/api/posts", { query: limit ? { limit } : {}, key: `posts-${limit ?? "all"}`, default: () => [] });

export const usePost = (slug: string) => useFetch<Post>(`/api/posts/${encodeURIComponent(slug)}`, { key: `post-${slug}` });

/** Published events in date order. */
export const useEvents = (options: { upcoming?: boolean; limit?: number } = {}) =>
  useFetch<SiteEvent[]>("/api/events", {
    query: { ...(options.upcoming ? { upcoming: 1 } : {}), ...(options.limit ? { limit: options.limit } : {}) },
    key: `events-${options.upcoming ? "up" : "all"}-${options.limit ?? "all"}`,
    default: () => [],
  });

export const useTeam = () => useFetch<TeamMember[]>("/api/team", { key: "team", default: () => [] });

/** Today's date as YYYY-MM-DD in Kenya (EAT, UTC+3). */
export const todayInKenya = () => new Date(Date.now() + 3 * 3600_000).toISOString().slice(0, 10);

/** Impact figures (headline stats and program numbers), editable in the admin. */
export const useImpact = () => useFetch<ImpactData>("/api/impact", { key: "impact", default: () => defaultImpact() });
