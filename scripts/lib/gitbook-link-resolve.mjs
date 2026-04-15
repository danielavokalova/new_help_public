import crypto from "crypto";
import path from "path";

import { enhelpPathToGitbookContentPath } from "./enhelp-to-gitbook-path.mjs";
import {
  expandGitbookPathVariants,
  normalizePathnameTrailingDots
} from "./gitbook-path-variants.mjs";

/** Hub pages use curated slugs from content-map (not slugFromGitbookPath). */
export const HUB_TO_LOCAL = new Map([
  ["1.-gol-ibe/1.-gol-ibe-intro", "/getting-started/gol-ibe-intro"],
  ["1.-gol-ibe/2.-gol-ibe-step-by-step", "/getting-started/gol-ibe-step-by-step"],
  ["1.-gol-ibe/3.-gol-ibe-basic-settings", "/configuration/gol-ibe-basic-settings"],
  ["1.-gol-ibe/4.-gol-ibe-advanced-settings", "/configuration/gol-ibe-advanced-settings"],
  ["1.-gol-ibe/5.-gol-ibe-faqs", "/troubleshooting/gol-ibe-faqs"]
]);

export const HUB_DOC_PATHS = new Set(HUB_TO_LOCAL.keys());

/**
 * @param {string} rawUrl
 * @returns {string | null} GitBook content path without .md
 */
export function resolvePrimaryGitbookPath(rawUrl) {
  let u;
  try {
    u = new URL(rawUrl);
  } catch {
    return null;
  }

  const host = u.hostname.toLowerCase();
  if (host === "app.gitbook.com") return null;
  if (u.pathname.match(/\.(png|jpe?g|gif|svg|webp|ico)$/i)) return null;

  if (host === "cee-systems.gitbook.io" && u.pathname.includes("/enhelp-golibe/")) {
    const pathnorm = normalizePathnameTrailingDots(u.pathname);
    const rel = pathnorm.split("/enhelp-golibe/")[1]?.replace(/\/$/, "");
    if (!rel) return null;
    return rel.replace(/\.md$/i, "");
  }

  if (host === "enhelp.golibe.com") {
    const pathnorm = normalizePathnameTrailingDots(u.pathname);
    return enhelpPathToGitbookContentPath(pathnorm);
  }

  return null;
}

/**
 * Paths to try when fetching or matching files (expanded variants).
 * @param {string} rawUrl
 * @param {{ forImport?: boolean }} opts - if forImport, hub roots are excluded (already in repo via content-map).
 * @returns {string[] | null}
 */
export function resolveTryPaths(rawUrl, opts = {}) {
  const { forImport = false } = opts;
  const primary = resolvePrimaryGitbookPath(rawUrl);
  if (!primary) return null;
  if (primary.includes("broken-reference")) return null;
  if (forImport && HUB_DOC_PATHS.has(primary)) return null;

  return [...new Set(expandGitbookPathVariants(primary))];
}

export function sectionForGitbookPath(gbPath) {
  if (gbPath.includes("5.-gol-ibe-faqs")) return "troubleshooting";
  if (
    gbPath.includes("3.-gol-ibe-basic-settings") ||
    gbPath.includes("4.-gol-ibe-advanced-settings")
  ) {
    return "configuration";
  }
  if (gbPath.includes("2.-gol-ibe-step-by-step")) return "getting-started";
  if (gbPath.includes("1.-gol-ibe-intro")) return "getting-started";
  return "operations";
}

function sanitizeSlugSegment(s) {
  return s
    .toLowerCase()
    .replace(/\.+$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "page";
}

export function slugFromGitbookPath(gbPath) {
  const parts = gbPath.split("/").filter(Boolean).map(sanitizeSlugSegment);
  let s = parts.join("-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
  if (s.length > 110) {
    const h = crypto.createHash("sha1").update(gbPath).digest("hex").slice(0, 10);
    const tail = parts.slice(-4).join("-");
    s = `${tail}-${h}`.slice(0, 110);
  }
  return s || "page";
}

/**
 * @param {string} rawUrl
 * @param {string} docsRoot - absolute path to content/docs
 * @param {(p: string) => boolean} fileExists
 * @returns {string | null} local path e.g. /getting-started/foo
 */
export function findLocalRouteForUrl(rawUrl, docsRoot, fileExists) {
  const primary = resolvePrimaryGitbookPath(rawUrl);
  if (!primary || primary.includes("broken-reference")) return null;

  if (HUB_TO_LOCAL.has(primary)) return HUB_TO_LOCAL.get(primary);

  const variants = [...new Set(expandGitbookPathVariants(primary))];
  for (const gp of variants) {
    if (HUB_TO_LOCAL.has(gp)) return HUB_TO_LOCAL.get(gp);
    const section = sectionForGitbookPath(gp);
    const slug = slugFromGitbookPath(gp);
    const f = path.join(docsRoot, section, `${slug}.md`);
    if (fileExists(f)) return `/${section}/${slug}`;
  }
  return null;
}
