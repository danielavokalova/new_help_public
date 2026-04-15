# Import gaps

Some links from the legacy help do not resolve to a GitBook `.md` export (404) even after path variants (`gol-ibe-*` vs shorter segments).

After the last `npm run import:linked` run, typical remaining cases are:

- Placeholder or broken targets in the source (for example paths containing `broken-reference`).
- Duplicate or malformed slugs in the original site (for example repeated `of-your-gol-ibe` in one FAQ URL).
- Subpages that exist only under a different branch in GitBook than the link suggests (for example some “supporting texts” links under step-by-step while the article lives under FAQs).

**What to do:** add a manual Markdown page, or fix the source link in GitBook and re-run `import:linked`, or map a one-off `markdownPath` in `scripts/content-map.json` and run `npm run import:md`.
