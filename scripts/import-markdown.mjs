/**
 * Fetches official GitBook Markdown exports (cleaner than HTML -> Turndown).
 * Configure paths in content-map.json (markdownBaseUrl + markdownPath per page).
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import {
  normalizeGitbookMarkdown,
  stripInlineHtmlNoise
} from "./lib/gitbook-md-normalize.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mapPath = path.join(__dirname, "content-map.json");

const map = JSON.parse(await fs.readFile(mapPath, "utf8"));
const base = map.markdownBaseUrl?.replace(/\/$/, "") || "";

if (!base) {
  console.error("Missing markdownBaseUrl in content-map.json");
  process.exit(1);
}

for (const page of map.pages) {
  if (!page.markdownPath) {
    console.warn(`SKIP ${page.slug}: no markdownPath`);
    continue;
  }

  const rel = page.markdownPath.replace(/^\//, "");
  const url = new URL(rel, `${base}/`).toString();
  const res = await fetch(url, {
    headers: { "User-Agent": "gol-help-en-import/1.0" }
  });

  if (!res.ok) {
    console.error(`FAIL ${res.status} ${url}`);
    continue;
  }

  let md = await res.text();
  md = normalizeGitbookMarkdown(md);
  md = stripInlineHtmlNoise(md);

  const out = path.join(root, "content", "docs", page.section, `${page.slug}.md`);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, md.trim() + "\n", "utf8");
  console.log(`OK ${page.slug} -> ${out}`);
}

console.log("Done.");
