import fs from "fs/promises";
import path from "path";

export const SECTIONS = [
  "getting-started",
  "configuration",
  "operations",
  "troubleshooting",
  "release-notes"
] as const;

export type Section = (typeof SECTIONS)[number];

const CONTENT_ROOT = path.join(process.cwd(), "content", "docs");

export function isSection(s: string): s is Section {
  return (SECTIONS as readonly string[]).includes(s);
}

export function extractTitle(md: string): string | null {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

/** Remove leading H1 so page title can be rendered separately. */
export function stripLeadingH1(md: string): string {
  return md.replace(/^#\s+[^\n]+\n+/, "");
}

export async function listArticleSlugs(section: string): Promise<string[]> {
  const dir = path.join(CONTENT_ROOT, section);
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name.replace(/\.md$/, ""))
    .sort((a, b) => a.localeCompare(b));
}

export async function listArticles(
  section: string
): Promise<{ slug: string; title: string }[]> {
  const slugs = await listArticleSlugs(section);
  const out: { slug: string; title: string }[] = [];
  for (const slug of slugs) {
    const raw = await fs.readFile(
      path.join(CONTENT_ROOT, section, `${slug}.md`),
      "utf8"
    );
    out.push({ slug, title: extractTitle(raw) ?? slug });
  }
  return out;
}

export async function getArticle(
  section: string,
  slug: string
): Promise<{ title: string; body: string; bodyWithoutH1: string } | null> {
  const filePath = path.join(CONTENT_ROOT, section, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const title = extractTitle(raw) ?? slug;
    return {
      title,
      body: raw,
      bodyWithoutH1: stripLeadingH1(raw)
    };
  } catch {
    return null;
  }
}
