# gol-ibe-meetings

Documentation portal for GOL IBE Meetings help, built with Next.js and hosted on Vercel.

## Stack

- Next.js (App Router, static export)
- Markdown content in `content/docs/`
- GitHub Pull Request workflow
- Vercel preview and production deploys

## Quick Start

1. Install dependencies:
   - `npm install`
2. Run local site:
   - `npm run dev`
3. Open `http://localhost:3000`

Articles are served from Markdown in `content/docs/<section>/<slug>.md` at `/portal/<section>/<slug>`.

## Content Sections

| Section | Path | Purpose |
|---|---|---|
| `getting-started` | `/portal/getting-started/…` | Intro, first steps, key concepts |
| `configuration` | `/portal/configuration/…` | Setup, settings, integrations |
| `operations` | `/portal/operations/…` | Day-to-day workflows |
| `troubleshooting` | `/portal/troubleshooting/…` | FAQs, known issues, fixes |
| `release-notes` | `/portal/release-notes/…` | Changelogs and new features |

## Collaboration Workflow

1. Create branch: `git checkout -b docs/update-faq`
2. Edit files in `content/docs/`
3. Open Pull Request
4. Review Vercel preview URL
5. Merge to `main`

## Deployment (Vercel)

1. Import the GitHub repository in Vercel (framework: Next.js).
2. Set `NEXT_PUBLIC_SITE_URL` to your production URL (no trailing slash).
3. Copy `.env.example` to `.env.local` for local testing.
