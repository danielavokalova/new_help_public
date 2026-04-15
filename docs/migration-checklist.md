# Migration Checklist

Use this list when importing pages from the legacy help site into `content/docs/`.

## Before import

- Confirm you have permission to republish the source content.
- Update `scripts/content-map.json` with correct paths and target `section` + `slug`.
- Prefer slugs that do not overwrite curated drafts until reviewed.

## Run pipeline

1. Prefer `npm run import:md` — fetches GitBook `.md` exports (see `markdownBaseUrl` / `markdownPath` in `scripts/content-map.json`).
2. Run `npm run import:linked` to fetch pages linked from imported Markdown (idempotent: same source path overwrites the same slug file).
3. Run `npm run rewrite:links` so in-repo links use `/<section>/<slug>` instead of enhelp/gitbook hosts.
4. Fallback: `npm run scrape` (HTML to `scripts/import/raw/`) then `npm run transform`.
5. Open a branch and review diffs in Git.

If a legacy page returns 404 (for example “versions”), note it in `content-map.json` and add the article manually when the source is available.

See also `docs/import-gaps.md` for links that still fail after `import:linked`.

## Editorial pass

- Remove duplicate headings and marketing phrasing.
- Normalize terminology using `docs/style-guide.md`.
- Fix internal links to new URLs (`/<section>/<slug>`), or run `npm run rewrite:links` after imports.
- Add Prerequisites, Steps, and Verification where missing.
- Replace broken or external links with stable destinations.

## Before merge

- `npm run build` passes locally.
- Spot-check pages in the browser for layout and readability.
- Update home page or section lists if you add new top-level articles.
