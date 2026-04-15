/**
 * Rewrites markdown links from enhelp.golibe.com / gitbook.io to local /section/slug
 * when a matching file exists under content/docs.
 */
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { findLocalRouteForUrl } from "./lib/gitbook-link-resolve.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const docsRoot = path.join(root, "content", "docs");

const LINK_RE = /\]\((https?:\/\/[^)\s]+)\)/g;

async function walkMdFiles(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walkMdFiles(full, out);
    else if (e.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function rewriteMarkdown(md) {
  let count = 0;
  const next = md.replace(LINK_RE, (full, url) => {
    const trimmed = url.trim();
    const local = findLocalRouteForUrl(trimmed, docsRoot, existsSync);
    if (!local) return full;
    count += 1;
    return `](${local})`;
  });
  return { text: next, count };
}

const files = await walkMdFiles(docsRoot);
let total = 0;
let touched = 0;

for (const file of files) {
  const md = await fs.readFile(file, "utf8");
  const { text, count } = rewriteMarkdown(md);
  if (count > 0) {
    await fs.writeFile(file, text, "utf8");
    touched += 1;
    total += count;
    console.log(`${count} in ${path.relative(root, file)}`);
  }
}

console.log(`Done. Files updated: ${touched}, links rewritten: ${total}`);
