"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { usePortal } from "./layout";
import { CATEGORIES, RELEASE_NOTES, WALKTHROUGHS, HEALTH_CHECKS } from "./data";
import s from "./portal.module.css";

type SearchResult = {
  title: string;
  href: string;
  category: string;
  categoryDesc: string;
};

const ALL_ARTICLES: SearchResult[] = CATEGORIES.flatMap((cat) =>
  cat.articles.map((a) => ({
    title: a.title,
    href: a.href,
    category: cat.name,
    categoryDesc: cat.desc,
  }))
);

const MOST_VISITED = ALL_ARTICLES.slice(0, 5);

export default function PortalOverviewPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { setSelectedCat, openContact } = usePortal();

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const filteredResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase();
    return ALL_ARTICLES.filter((r) =>
      `${r.title} ${r.category} ${r.categoryDesc}`.toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const r of filteredResults) {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    }
    return groups;
  }, [filteredResults]);

  const healthOk = HEALTH_CHECKS.filter((h) => h.status === "ok").length;
  const healthTotal = HEALTH_CHECKS.length;

  return (
    <>
      {/* ── Hero + Search ── */}
      <div className={s.hero}>
        <h2 className={s.heroTitle}>GOL IBE Help Portal</h2>
        <p className={s.heroSub}>Your smart guide to the GOL IBE Admin Console. Get answers instantly.</p>
        <div className={s.searchWrap}>
          <span className={s.searchIcon}>&#9906;</span>
          <input
            className={s.omnisearch}
            placeholder="Search anything… e.g. add new user, configure markup, cancel reservation"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search help articles"
          />
          {query && (
            <button className={s.searchClear} onClick={() => setQuery("")} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>
      </div>

      <div className={s.body}>

        {/* ── Search results ── */}
        {debouncedQuery.trim() && (
          <div className={s.quickResults}>
            <div className={s.searchResultsHeader}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1a3668" }}>
                {filteredResults.length === 0
                  ? "No results"
                  : `${filteredResults.length} result${filteredResults.length !== 1 ? "s" : ""} for "${debouncedQuery}"`}
              </h3>
            </div>
            {filteredResults.length === 0 ? (
              <p className={s.noResults}>
                Try a different keyword, or browse by topic below.
              </p>
            ) : (
              Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className={s.resultGroup}>
                  <div className={s.resultGroupLabel}>{category}</div>
                  <ul className={s.quickResultsList}>
                    {items.map((item) => (
                      <li key={item.href} className={s.quickResultItem}>
                        <Link href={item.href} className={s.quickResultLink}>
                          <span className={s.quickResultTitle}>{item.title}</span>
                          <span className={s.quickResultArrow}>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Browse by topic ── */}
        {!debouncedQuery.trim() && (
          <>
            <p className={s.sectionTitle}>Browse by topic</p>
            <div className={s.topicGrid}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  className={s.catCard}
                  onClick={() => setSelectedCat(cat)}
                >
                  <div className={s.catIcon}>{cat.icon}</div>
                  <div className={s.catName}>{cat.name}</div>
                  <div className={s.catDesc}>{cat.desc}</div>
                  <span className={s.catLink}>Explore</span>
                </button>
              ))}
            </div>

            {/* Three panels */}
            <div className={s.panelsRow}>

              {/* What's New */}
              <div className={s.panel}>
                <div className={s.panelHeader}>
                  <span className={s.panelTitle}>What&apos;s New</span>
                </div>
                <div className={s.panelBody}>
                  {RELEASE_NOTES.map((r) => (
                    <div key={r.version} className={s.releaseEntry}>
                      <div className={s.releaseVersion}>{r.version}</div>
                      <ul className={s.releaseList}>
                        {r.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                  <Link href="/release-notes" style={{ fontSize: 14, marginTop: 10, display: "inline-block" }}>
                    All release notes →
                  </Link>
                </div>
              </div>

              {/* Walkthroughs */}
              <div className={s.panel}>
                <div className={s.panelHeader}>
                  <span className={s.panelTitle}>Walkthroughs</span>
                  <span className={s.panelCount}>{WALKTHROUGHS.length} guides</span>
                </div>
                <div className={s.panelBody}>
                  <ul className={s.walkthroughList}>
                    {WALKTHROUGHS.map((w) => (
                      <li key={w.href}>
                        <Link href={w.href} className={s.walkthroughItem}>
                          <span className={s.walkthroughStepsBadge}>{w.steps} steps</span>
                          <span className={s.walkthroughContent}>
                            <span className={s.walkthroughTitle}>{w.title}</span>
                            <span className={s.walkthroughCat}>{w.category}</span>
                          </span>
                          <span className={s.walkthroughArrow}>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Agency Health Check */}
              <div className={s.panel}>
                <div className={s.panelHeader}>
                  <span className={s.panelTitle}>Agency Health Check</span>
                  <span className={`${s.panelCount} ${healthOk === healthTotal ? s.panelCountGood : s.panelCountWarn}`}>
                    {healthOk}/{healthTotal} ok
                  </span>
                </div>
                <div className={s.panelBody}>
                  <ul className={s.healthList}>
                    {HEALTH_CHECKS.map((h) => (
                      <li key={h.label}>
                        <Link href={h.href} className={s.healthItem}>
                          <span
                            className={`${s.healthDot} ${
                              h.status === "ok"
                                ? s.healthDotOk
                                : h.status === "warning"
                                ? s.healthDotWarn
                                : s.healthDotPending
                            }`}
                          />
                          <span className={s.healthContent}>
                            <span className={s.healthLabel}>{h.label}</span>
                            <span className={s.healthDesc}>{h.desc}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Most Visited */}
            <div className={s.mostVisited}>
              <div className={s.mostVisitedTitle}>Most visited</div>
              <ul className={s.mostVisitedList}>
                {MOST_VISITED.map((item) => (
                  <li key={item.href} className={s.mostVisitedItem}>
                    <p>
                      <strong>{item.title}</strong>
                      <span className={s.badge}>{item.category}</span>
                    </p>
                    <Link href={item.href} style={{ whiteSpace: "nowrap", fontSize: 14 }}>Open →</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action bar */}
            <div className={s.actionBar}>
              <a href="https://bo.golibe.com/" target="_blank" rel="noopener noreferrer" className={s.btnOutline}>
                Open Admin Console ↗
              </a>
              <button className={s.btnPrimary} onClick={openContact}>
                Contact Help
              </button>
            </div>
          </>
        )}

      </div>
    </>
  );
}
