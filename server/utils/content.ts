import { randomUUID } from "node:crypto";
import type { H3Event } from "h3";

// ---------- JSON shapes shared by the public API and the admin ----------

export interface Post {
  slug: string;
  title: string;
  titleSw?: string;
  date: string; // YYYY-MM-DD
  tag?: string;
  excerpt: string;
  excerptSw?: string;
  body: string; // Markdown
  bodySw?: string;
  image?: string;
  published: boolean;
  updatedAt: string;
}

export interface SiteEvent {
  id: string;
  title: string;
  titleSw?: string;
  date: string; // YYYY-MM-DD
  endDate?: string;
  startTime?: string; // HH:MM
  endTime?: string;
  location?: string;
  category?: string;
  description?: string;
  descriptionSw?: string;
  image?: string;
  published: boolean;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleSw?: string;
  bio?: string;
  bioSw?: string;
  photo?: string;
  order: number;
  published: boolean;
  updatedAt: string;
}

export interface Message {
  id: string;
  kind: "contact" | "pledge";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  amount?: number;
  frequency?: string;
  emailed: boolean;
  createdAt: string;
}

export interface Subscriber {
  email: string;
  source: string;
  lang?: string;
  createdAt: string;
}

export const newId = () => randomUUID().replace(/-/g, "").slice(0, 16);

/** Restrict ids/slugs to filename-safe characters. */
export const safeId = (id: string) =>
  String(id)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 80);

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70) || newId();

// ---------- Validation helpers ----------

export const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
export const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Trim a value to a string of at most `max` characters ("" for non-strings). */
export const str = (value: unknown, max = 500) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export const optional = (value: unknown, max = 500) => str(value, max) || undefined;

export function fail(statusCode: number, code: string): never {
  throw createError({ statusCode, statusMessage: code, data: { code } });
}

// ---------- Simple per-process rate limiting ----------

const hits = new Map<string, number[]>();

export function rateLimit(event: H3Event, bucket: string, limit: number, windowMs: number) {
  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) fail(429, "rate_limited");
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
}
