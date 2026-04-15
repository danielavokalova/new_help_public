import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownBody } from "@/components/MarkdownBody";
import {
  SECTIONS,
  getArticle,
  isSection,
  listArticleSlugs
} from "@/lib/content";
import { SECTION_LABELS } from "@/lib/sectionLabels";

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

export async function generateMetadata({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!isSection(section)) return {};
  const article = await getArticle(section, slug);
  if (!article) return {};
  return {
    title: article.title
  };
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!isSection(section)) notFound();

  const article = await getArticle(section, slug);
  if (!article) notFound();

  const label = SECTION_LABELS[section];

  return (
    <section>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/${section}`}>{label}</Link>
        <span aria-hidden="true"> / </span>
        <span>{article.title}</span>
      </nav>
      <h2 className="article-title">{article.title}</h2>
      <MarkdownBody>{article.bodyWithoutH1}</MarkdownBody>
    </section>
  );
}
