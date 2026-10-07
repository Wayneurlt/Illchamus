import { PrismaClient } from "@prisma/client";
import type { Event as EventRow, Message as MessageRow, Post as PostRow, Subscriber as SubscriberRow, TeamMember as TeamRow } from "@prisma/client";
import type { Message, Post, SiteEvent, Subscriber, TeamMember } from "./content";

// One client per server process (reused across hot reloads in development).
const globalForPrisma = globalThis as unknown as { __prisma?: PrismaClient };
export const prisma = globalForPrisma.__prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.__prisma = prisma;

/** Date column → "YYYY-MM-DD". */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
/** "YYYY-MM-DD" → Date for a date column. */
export const toDate = (s: string) => new Date(`${s}T00:00:00.000Z`);

const opt = <T>(v: T | null) => (v === null ? undefined : v);

// Rows → the JSON shapes the site and admin use.
export const postOut = (p: PostRow): Post => ({
  slug: p.slug,
  title: p.title,
  titleSw: opt(p.titleSw),
  date: isoDate(p.date),
  tag: opt(p.tag),
  excerpt: p.excerpt,
  excerptSw: opt(p.excerptSw),
  body: p.body,
  bodySw: opt(p.bodySw),
  image: opt(p.image),
  published: p.published,
  updatedAt: p.updatedAt.toISOString(),
});

export const eventOut = (e: EventRow): SiteEvent => ({
  id: e.id,
  title: e.title,
  titleSw: opt(e.titleSw),
  date: isoDate(e.date),
  endDate: e.endDate ? isoDate(e.endDate) : undefined,
  startTime: opt(e.startTime),
  endTime: opt(e.endTime),
  location: opt(e.location),
  category: opt(e.category),
  description: opt(e.description),
  descriptionSw: opt(e.descriptionSw),
  image: opt(e.image),
  published: e.published,
  updatedAt: e.updatedAt.toISOString(),
});

export const teamOut = (t: TeamRow): TeamMember => ({
  id: t.id,
  name: t.name,
  role: t.role,
  roleSw: opt(t.roleSw),
  bio: opt(t.bio),
  bioSw: opt(t.bioSw),
  photo: opt(t.photo),
  order: t.order,
  published: t.published,
  updatedAt: t.updatedAt.toISOString(),
});

export const messageOut = (m: MessageRow): Message => ({
  id: m.id,
  kind: m.kind,
  name: m.name,
  email: m.email,
  phone: opt(m.phone),
  subject: opt(m.subject),
  message: opt(m.message),
  amount: opt(m.amount),
  frequency: opt(m.frequency),
  emailed: m.emailed,
  createdAt: m.createdAt.toISOString(),
});

export const subscriberOut = (s: SubscriberRow): Subscriber & { id: string } => ({
  id: s.id,
  email: s.email,
  source: s.source,
  lang: s.lang,
  createdAt: s.createdAt.toISOString(),
});
