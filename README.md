# Illchamus Community CBO website

Website for Illchamus Community CBO (ICDO), Baringo County, Kenya. Built with Nuxt 3, Tailwind CSS 4 and a small built-in admin, in English and Kiswahili.

## Running it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Create a `.env` file in the project folder:

```bash
NUXT_SESSION_PASSWORD=a-long-random-string-of-at-least-32-characters
NUXT_ADMIN_PASSWORD=choose-an-admin-password
# Optional: email delivery (see below)
NUXT_RESEND_API_KEY=
NUXT_RESEND_AUDIENCE_ID=
```

Content you add locally is saved in `.data/site/` (not committed to git).

## Managing content (no code needed)

Go to **`/admin`** and sign in with the admin password. From there you can:

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
| `NUXT_SESSION_PASSWORD` | yes | Encrypts admin sessions (32+ random characters) |
| `NUXT_ADMIN_PASSWORD` | yes | Password for `/admin` |
| `NUXT_PUBLIC_SITE_URL` | recommended | Public address, e.g. `https://illchamus.org` (used in share previews and the sitemap) |
| `NUXT_RESEND_API_KEY` | optional | Turns on email delivery |
| `NUXT_RESEND_AUDIENCE_ID` | optional | Newsletter audience in Resend |
| `NUXT_MAIL_FROM` | optional | Sender address once your domain is verified |

Saved content lives on the server in `/home/tiny/temi/data`, outside the build folder, so deploys never overwrite it. **Back this folder up regularly.**

## Where things are

| What | Where |
| --- | --- |
| All site wording (English / Kiswahili) | `locales/en.ts`, `locales/sw.ts` |
| Contact details, navigation, photos | `data/site.ts` |
| Brand colours and shared styles | `assets/css/main.css` |
| Pages | `pages/` |
| Server API (forms, admin, sitemap) | `server/` |

Search engines get a live `sitemap.xml`, `robots.txt`, share-preview tags on every page and structured data for the organisation, news articles and events.
