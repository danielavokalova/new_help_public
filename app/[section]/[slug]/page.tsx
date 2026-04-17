import { ClientRedirect } from "@/app/_components/ClientRedirect";
import { SECTIONS, isSection, listArticleSlugs } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const params: { section: string; slug: string }[] = [];
  for (const section of SECTIONS) {
    const slugs = await listArticleSlugs(section);
    for (const slug of slugs) {
      params.push({ section, slug });
    }
  }
  return params;
}

export default async function ArticleRedirectPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!isSection(section)) notFound();
  return <ClientRedirect to={`/portal/${section}/${slug}`} />;
}
