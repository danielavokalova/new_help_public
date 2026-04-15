# gol_help_en

Documentation portal for GOL help, hosted on Vercel and managed on GitHub.

## Stack

- Next.js (App Router)
- Markdown content in `content/docs/`
- GitHub Pull Request workflow
- Vercel preview and production deploys

## Quick Start

1. Install dependencies:
   - `npm install`
2. Run local site:
   - `npm run dev`
3. Open `http://localhost:3000`

Articles are served from Markdown in `content/docs/<section>/<slug>.md` at `/<section>/<slug>`.

## Import from legacy help (optional)

1. Edit `scripts/content-map.json` (`markdownPath` + `markdownBaseUrl` for GitBook `.md` exports).
2. Run `npm run import:md` (recommended: clean source text).
3. Run `npm run import:linked` to pull linked child pages from existing Markdown.
4. Run `npm run rewrite:links` to point enhelp/gitbook URLs to local `/<section>/<slug>` paths.
5. Fallback: `npm run scrape` then `npm run transform` (HTML to Markdown, noisier).
6. Review output and follow `docs/migration-checklist.md`.

## Collaboration Workflow

1. Create branch: `git checkout -b docs/update-faq`
2. Edit files in `content/docs/` and, if needed, route pages in `app/`
3. Open Pull Request
4. Review preview URL from Vercel
5. Merge to `main`

## Deployment (Vercel)

Step-by-step (Czech): [docs/vercel-setup.md](docs/vercel-setup.md).

1. Import the GitHub repository in Vercel (framework: Next.js).
2. Set environment variable `NEXT_PUBLIC_SITE_URL` to your production URL (no trailing slash), for example `https://help.example.com`. This drives `sitemap.xml`, `robots.txt`, and canonical metadata. Preview builds can rely on Vercel’s `VERCEL_URL` when the variable is unset.
3. Copy `.env.example` to `.env.local` for local testing of the same URL if needed.

## Conventions

- Authoring rules: `.cursor/rules/`
- Agent skills: `.cursor/skills/`
- Editorial guide: `docs/style-guide.md`

