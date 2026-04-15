import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SECTIONS,
  isSection,
  listArticles
} from "@/lib/content";
import { SECTION_LABELS } from "@/lib/sectionLabels";

export async function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSection(section)) return {};
  return {
    title: SECTION_LABELS[section]
  };
}

export default async function SectionIndexPage({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  const articles = await listArticles(section);
  const label = SECTION_LABELS[section];

  return (
    <section>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <span>{label}</span>
      </nav>
      <h2>{label}</h2>
      <p>Browse articles in this section.</p>
      <ul className="article-list">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={`/${section}/${a.slug}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
