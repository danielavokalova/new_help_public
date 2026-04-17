import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { SECTIONS, isSection } from "@/lib/content";

export async function POST(request: NextRequest) {
  const { section, slug, content } = await request.json();

  if (!isSection(section)) {
    return Response.json({ error: "Invalid section" }, { status: 400 });
  }
  if (!slug || !content) {
    return Response.json({ error: "slug and content are required" }, { status: 400 });
  }

  const safeSlug = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/, "");

  const dir = path.join(process.cwd(), "content", "docs", section);
  await fs.mkdir(dir, { recursive: true });

  const filePath = path.join(dir, `${safeSlug}.md`);
  await fs.writeFile(filePath, content, "utf8");

  return Response.json({
    success: true,
    path: `content/docs/${section}/${safeSlug}.md`,
    slug: safeSlug,
  });
}
