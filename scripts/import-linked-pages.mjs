/**
 * Scans all Markdown under content/docs for links, resolves GitBook .md URLs,
 * downloads child pages into the right section (deduped).
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import {
  resolveTryPaths,
  sectionForGitbookPath,
  slugFromGitbookPath
} from "./lib/gitbook-link-resolve.mjs";
import {
  normalizeGitbookMarkdown,
  stripInlineHtmlNoise
} from "./lib/gitbook-md-normalize.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const docsRoot = path.join(root, "content", "docs");
const mapPath = path.join(__dirname, "content-map.json");

const map = JSON.parse(await fs.readFile(mapPath, "utf8"));
const markdownBase = map.markdownBaseUrl?.replace(/\/$/, "") || "";

if (!markdownBase) {
  console.error("Missing markdownBaseUrl in content-map.json");
  process.exit(1);
}

const LINK_RE = /\]\((https?:\/\/[^)\s]+)\)/g;

const seenJobKeys = new Set();

async function walkMdFiles(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walkMdFiles(full, out);
    else if (e.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function extractUrls(markdown) {
  const urls = [];
  let m;
  while ((m = LINK_RE.exec(markdown)) !== null) {
    urls.push(m[1].trim());
  }
  return urls;
}

const files = await walkMdFiles(docsRoot);
/** @type {string[][]} */
const queue = [];

for (const file of files) {
  const text = await fs.readFile(file, "utf8");
  for (const url of extractUrls(text)) {
    const tryPaths = resolveTryPaths(url, { forImport: true });
    if (!tryPaths?.length) continue;
    const key = tryPaths.slice().sort().join("\0");
    if (seenJobKeys.has(key)) continue;
    seenJobKeys.add(key);
    queue.push(tryPaths);
  }
}

console.log(`Found ${queue.length} unique importable link targets.`);

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

let ok = 0;
let fail = 0;

for (const tryPaths of queue) {
  await delay(120);
  let md = null;
  let successPath = null;
  const tried = [];

  for (const gp of tryPaths) {
    const mdUrl = new URL(`${gp}.md`, `${markdownBase}/`).toString();
    tried.push(mdUrl);
    const res = await fetch(mdUrl, {
      headers: { "User-Agent": "gol-help-en-import-linked/1.0" }
    });
    if (res.ok) {
      md = await res.text();
      successPath = gp;
      break;
    }
  }

  if (!md || !successPath) {
    console.error(`FAIL ${tryPaths[0]} (tried ${tried.length} URLs)`);
    fail += 1;
    continue;
  }

  md = normalizeGitbookMarkdown(md);
  md = stripInlineHtmlNoise(md);

  const section = sectionForGitbookPath(successPath);
  const slug = slugFromGitbookPath(successPath);
  const out = path.join(docsRoot, section, `${slug}.md`);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, md.trim() + "\n", "utf8");
  console.log(`OK ${slug} <- ${successPath}`);
  ok += 1;
}

console.log(`Done. OK=${ok} FAIL=${fail}`);
