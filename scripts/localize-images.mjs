/**
 * Downloads remote markdown images into public/images/docs and
 * rewrites image URLs in content/docs/*.md to local paths.
 */
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const docsRoot = path.join(root, "content", "docs");
const publicImgRoot = path.join(root, "public", "images", "docs");

const IMAGE_RE = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;

await fs.mkdir(publicImgRoot, { recursive: true });

const files = await walkMdFiles(docsRoot);
const cache = new Map();
let filesUpdated = 0;
let imagesDownloaded = 0;
let linksRewritten = 0;

for (const file of files) {
  const original = await fs.readFile(file, "utf8");
  let next = original;

  const matches = [...original.matchAll(IMAGE_RE)];
  for (const match of matches) {
    const alt = match[1];
    const rawUrl = match[2];
    const normalizedUrl = normalizeLegacyUrl(rawUrl);
    if (!normalizedUrl) continue;

    const localPath = await getOrDownloadImage(normalizedUrl);
    if (!localPath) continue;

    const escapedRaw = escapeRegExp(match[0]);
    const from = new RegExp(escapedRaw, "g");
    const to = `![${alt}](${localPath})`;
    next = next.replace(from, to);
    linksRewritten += 1;
  }

  if (next !== original) {
    await fs.writeFile(file, next, "utf8");
    filesUpdated += 1;
  }
}

console.log(
  `Done. filesUpdated=${filesUpdated} imagesDownloaded=${imagesDownloaded} linksRewritten=${linksRewritten}`
);

function normalizeLegacyUrl(raw) {
  try {
    return raw
      .replace(/&#x26;/g, "&")
      .replace(/&amp;/g, "&")
      .replace(/\\&/g, "&")
      .trim();
  } catch {
    return null;
  }
}

async function getOrDownloadImage(url) {
  if (cache.has(url)) return cache.get(url);

  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 16);
  const extGuess = guessExtFromUrl(url);
  let targetFilename = `${hash}${extGuess ? "." + extGuess : ""}`;
  let targetPath = path.join(publicImgRoot, targetFilename);
  let localPath = `/images/docs/${targetFilename}`;

  try {
    await fs.access(targetPath);
    cache.set(url, localPath);
    return localPath;
  } catch {
    // continue and download
  }

  const res = await fetch(url, { headers: { "User-Agent": "gol-help-en-image-localizer/1.0" } });
  if (!res.ok) {
    console.warn(`SKIP ${res.status} ${url}`);
    return null;
  }

  const contentType = res.headers.get("content-type") || "";
  const extFromType = guessExtFromContentType(contentType);
  if (!extGuess && extFromType) {
    targetFilename = `${hash}.${extFromType}`;
    targetPath = path.join(publicImgRoot, targetFilename);
    localPath = `/images/docs/${targetFilename}`;
  }

  const arrayBuffer = await res.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
  cache.set(url, localPath);
  imagesDownloaded += 1;
  return localPath;
}

function guessExtFromUrl(url) {
  try {
    const u = new URL(url);
    const candidate = path.extname(u.pathname).replace(".", "").toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(candidate)) return candidate;
    return "";
  } catch {
    return "";
  }
}

function guessExtFromContentType(ct) {
  if (ct.includes("image/png")) return "png";
  if (ct.includes("image/jpeg")) return "jpg";
  if (ct.includes("image/gif")) return "gif";
  if (ct.includes("image/webp")) return "webp";
  if (ct.includes("image/svg+xml")) return "svg";
  return "";
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function walkMdFiles(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walkMdFiles(full, out);
    else if (e.name.endsWith(".md")) out.push(full);
  }
  return out;
}
