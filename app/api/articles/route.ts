import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { SECTIONS } from "@/lib/content";

export const dynamic = "force-static";

/* GET — list all articles (no dynamic request params used) */
export async function GET() {
  const result: Array<{ section: string; slug: string; title: string }> = [];

  for (const section of SECTIONS) {
    const dir = path.join(process.cwd(), "content", "docs", section);
    try {
      const files = await fs.readdir(dir);
      for (const file of files.sort()) {
        if (!file.endsWith(".md")) continue;
        const slug = file.replace(/\.md$/, "");
        const content = await fs.readFile(path.join(dir, file), "utf8");
        const h1 = content.match(/^#\s+(.+)$/m)?.[1]?.replace(/<!--.*?-->/g, "").trim() ?? slug;
        result.push({ section, slug, title: h1 });
      }
    } catch {}
  }

  return Response.json(result);
}

/* POST — fetch a single article's content (POST is not pre-rendered in static export) */
export async function POST(request: NextRequest) {
  const { section, slug } = await request.json();
  if (!section || !slug) {
    return Response.json({ error: "section and slug are required" }, { status: 400 });
  }
  const filePath = path.join(process.cwd(), "content", "docs", section, `${slug}.md`);
  try {
    const content = await fs.readFile(filePath, "utf8");
    return Response.json({ content });
  } catch {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}
