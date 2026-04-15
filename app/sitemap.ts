import type { MetadataRoute } from "next";

import { SECTIONS, listArticleSlugs } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    }
  ];

  for (const section of SECTIONS) {
    routes.push({
      url: `${base}/${section}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    });

    const slugs = await listArticleSlugs(section);
    for (const slug of slugs) {
      routes.push({
        url: `${base}/${section}/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6
      });
    }
  }

  return routes;
}
