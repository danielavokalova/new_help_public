---
name: help-project-playbook
description: Project-wide operating guide for the GOL help portal. Use when making any change in this repository to follow architecture, content workflow, image handling, and GitHub-to-Vercel deployment standards.
---

# GOL Help Project Playbook

## Use this skill when

- starting any new task in this repository
- importing or restructuring documentation content
- preparing pull requests or release changes
- troubleshooting deployment or content rendering issues

## Project map

- App routes: `app/`
- Content source: `content/docs/<section>/<slug>.md`
- Shared helpers: `lib/`
- Import scripts: `scripts/`
- Project rules: `.cursor/rules/`
- Team process docs: `docs/`

## Canonical section model

- `getting-started`
- `configuration`
- `operations`
- `troubleshooting`
- `release-notes`

Do not invent new top-level sections unless explicitly requested.

## Content workflow (default order)

1. Import root pages: `npm run import:md`
2. Import linked pages: `npm run import:linked`
3. Rewrite legacy links to local routes: `npm run rewrite:links`
4. Localize remote images: `npm run localize:images`
5. Verify build: `npm run build`

## Image policy

- Prefer local images under `public/images/docs/`.
- Markdown files should reference images via local URLs (`/images/docs/...`).
- If imported content points to legacy external image hosts, run `npm run localize:images`.

## Editing standards

- Keep language neutral and instructional.
- Prefer short paragraphs and numbered procedures.
- Keep one canonical article per topic; use links instead of duplicates.
- For major edits, preserve existing slugs to avoid broken routes.

## Release and deploy expectations

- Use branch + PR workflow only.
- Ensure `.github/PULL_REQUEST_TEMPLATE.md` checklist is satisfied.
- Build must pass locally.
- GitHub Actions deploy to Vercel is source of truth.
- Required secrets for deploy workflow:
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
  - `VERCEL_TOKEN` (or fallback secret used in workflow)

## Quick checks before merge

- No unresolved legacy links where local page exists.
- No new broken image references.
- `sitemap.xml` and `robots.txt` still generated.
- Home and section pages still render expected links.
