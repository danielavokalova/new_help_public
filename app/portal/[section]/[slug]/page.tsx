import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownBody } from "@/components/MarkdownBody";
import { BackButton } from "@/components/BackButton";
import { ShareButton } from "@/components/ShareButton";
import { SECTIONS, getArticle, isSection, listArticleSlugs } from "@/lib/content";
import { SECTION_LABELS } from "@/lib/sectionLabels";
import s from "../../portal-layout.module.css";

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
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!isSection(section)) return {};
  const article = await getArticle(section, slug);
  if (!article) return {};
  return { title: article.title };
}

export default async function PortalArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!isSection(section)) notFound();

  const article = await getArticle(section, slug);
  if (!article) notFound();

  const label = SECTION_LABELS[section];

  return (
    <div className={s.articleWrap}>

      {/* ── Header: breadcrumb + back + share ── */}
      <div className={s.articlePageHeader}>
        <div className={s.articleNav}>
          <BackButton />
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/portal">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/portal">{label}</Link>
            <span aria-hidden="true"> / </span>
            <span>{article.title}</span>
          </nav>
        </div>
        <div className={s.articleTitleRow}>
          <h1 className={s.articleMainTitle}>{article.title}</h1>
          <ShareButton />
        </div>
      </div>

      {/* ── Body ── */}
      <div className={s.articleBody}>
        <MarkdownBody>{article.bodyWithoutH1}</MarkdownBody>
      </div>

    </div>
  );
}

