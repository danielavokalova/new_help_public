import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownBody } from "@/components/MarkdownBody";
import { BackButton } from "@/components/BackButton";
import { ShareButton } from "@/components/ShareButton";
import { SECTIONS, getArticle, isSection, listArticleSlugs } from "@/lib/content";
import { SECTION_LABELS } from "@/lib/sectionLabels";
import { CATEGORIES } from "../../data";
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
  const articleHref = `/portal/${section}/${slug}`;

  const parentCat = CATEGORIES.find(
    (cat) => cat.href === articleHref || cat.articles.some((a) => a.href === articleHref)
  );
  const isCategoryPage = parentCat?.href === articleHref;
  const relatedArticles = parentCat
    ? parentCat.articles.filter((a) => a.href !== articleHref).slice(0, 6)
    : [];

  return (
    <div className={s.articleWrap}>

      {/* ── Header: breadcrumb + back + share ── */}
      <div className={s.articlePageHeader}>
        <div className={s.articleNav}>
          <BackButton />
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/portal">Home</Link>
            <span aria-hidden="true"> / </span>
            {parentCat && !isCategoryPage ? (
              <>
                <Link href={parentCat.href}>{parentCat.name}</Link>
                <span aria-hidden="true"> / </span>
                <span>{article.title}</span>
              </>
            ) : (
              <>
                <Link href="/portal">{label}</Link>
                <span aria-hidden="true"> / </span>
                <span>{article.title}</span>
              </>
            )}
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

      {/* ── All articles grid (category overview pages) ── */}
      {isCategoryPage && parentCat && (
        <div className={s.relatedSection}>
          <div className={s.relatedLabel}>All {parentCat.name} articles</div>
          <div className={s.articleGrid}>
            {parentCat.articles.map((a) => (
              <Link key={a.href} href={a.href} className={s.articleCard}>
                <span>{a.title}</span>
                <span className={s.articleArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Related articles (regular article pages) ── */}
      {!isCategoryPage && relatedArticles.length > 0 && (
        <div className={s.relatedSection}>
          <div className={s.relatedLabel}>Related articles</div>
          <div className={s.articleGrid}>
            {relatedArticles.map((a) => (
              <Link key={a.href} href={a.href} className={s.articleCard}>
                <span>{a.title}</span>
                <span className={s.articleArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}


