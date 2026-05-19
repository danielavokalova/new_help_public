import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { SECTIONS, listArticleSlugs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date() },
    { url: `${base}/portal`, lastModified: new Date() },
  ];

  for (const section of SECTIONS) {
    const slugs = await listArticleSlugs(section);
    for (const slug of slugs) {
      entries.push({ url: `${base}/portal/${section}/${slug}`, lastModified: new Date() });
    }
  }

  return entries;
}
