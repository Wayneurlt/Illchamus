# Illchamus Community CBO website

Website for Illchamus Community CBO (ICDO), Baringo County, Kenya. Built with Nuxt 3, Tailwind CSS 4, Prisma and a Neon Postgres database, with a built-in admin, in English and Kiswahili.

## Running it locally

Create a `.env` file in the project folder:

```bash
# Neon: the pooled URL for the site, and the same URL without "-pooler" for migrations
DATABASE_URL=postgresql://…-pooler.…neon.tech/neondb?sslmode=require&connect_timeout=15
DIRECT_URL=postgresql://….neon.tech/neondb?sslmode=require&connect_timeout=15
NUXT_SESSION_PASSWORD=a-long-random-string-of-at-least-32-characters
NUXT_ADMIN_PASSWORD=the-starting-admin-password
# Optional: email delivery (see below)
NUXT_RESEND_API_KEY=
NUXT_RESEND_AUDIENCE_ID=
```

Then:

```bash
npm install          # also generates the Prisma client
npm run db:deploy    # create/update the database tables
npm run db:seed      # starter posts, team roles and the admin password (safe to re-run)
npm run dev          # http://localhost:3000
```

### Database commands

| Command | What it does |
| --- | --- |
| `npm run db:migrate` | After changing `prisma/schema.prisma`: create and apply a new migration |
| `npm run db:deploy` | Apply existing migrations (used by the deploy) |
| `npm run db:seed` | Add starter content if it's missing; never overwrites edits |
| `npm run db:studio` | Browse and edit the database in your browser |
| `npm run admin:reset-password` | Set the admin password back to `NUXT_ADMIN_PASSWORD` (signs everyone out) |

## Managing content (no code needed)

Go to **`/admin`** and sign in with the admin password. You can change it under **Account & security**. From there you can:

- **News** – write, edit, hide or delete posts, with photos. Use the toolbar for headings, bold text, links, lists and photos; press *Preview* to check.
- **Events** – add events to the calendar on `/events` (single or multi-day, with times in Kenya time).
- **Team** – add leadership names, roles and photos for the About page.
- **Messages** – read everything sent through the Contact form and donation pledges.
- **Subscribers** – see newsletter sign-ups and download them as a CSV file.

Every item has an optional **Kiswahili** tab. Anything left empty shows the English version to Swahili visitors.

## Email (contact form, pledges, newsletter)

Messages and sign-ups are always saved and visible in `/admin`. To also receive them by email at **illchamus@gmail.com**:

1. Create a free account at [resend.com](https://resend.com) and an API key.
2. Set `NUXT_RESEND_API_KEY`.
3. Optional: create an *Audience* in Resend for the newsletter and set `NUXT_RESEND_AUDIENCE_ID`. New subscribers are added to it automatically, and you can send newsletters from Resend.
4. Until you verify your own domain in Resend, emails are sent from `onboarding@resend.dev`, which only delivers to the email address you signed up to Resend with. After verifying a domain, set `NUXT_MAIL_FROM`, e.g. `Illchamus Website <hello@your-domain.org>`.

## Deployment

Pushing to `main` builds the site and deploys it to the Google Cloud VM with PM2 (`.github/workflows/temi.yaml`). Add these in GitHub → **Settings → Secrets and variables → Actions**:

| Secret | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | Neon pooled connection string (used by the site) |
| `DIRECT_URL` | yes | Neon direct connection string (used for migrations during deploy) |
| `NUXT_SESSION_PASSWORD` | yes | Encrypts admin sessions (32+ random characters) |
| `NUXT_ADMIN_PASSWORD` | yes | Starting password for `/admin` (the saved one in the database takes over once set) |
| `NUXT_PUBLIC_SITE_URL` | recommended | Public address, e.g. `https://illchamus.org` (used in share previews and the sitemap) |
| `NUXT_RESEND_API_KEY` | optional | Turns on email delivery |
| `NUXT_RESEND_AUDIENCE_ID` | optional | Newsletter audience in Resend |
| `NUXT_MAIL_FROM` | optional | Sender address once your domain is verified |

All content (news, events, team, messages, subscribers and uploaded photos) is stored in the Neon database, so deploys never touch it. Neon keeps automatic backups; you can also restore to an earlier point from the Neon console.

## Where things are

| What | Where |
| --- | --- |
| All site wording (English / Kiswahili) | `locales/en.ts`, `locales/sw.ts` |
| Contact details, navigation, photos | `data/site.ts` |
| Brand colours and shared styles | `assets/css/main.css` |
| Pages | `pages/` |
| Server API (forms, admin, sitemap) | `server/` |
| Database schema, migrations and seed | `prisma/` |

Search engines get a live `sitemap.xml`, `robots.txt`, share-preview tags on every page and structured data for the organisation, news articles and events.
