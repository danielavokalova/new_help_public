"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePortal } from "./layout";
import { CATEGORIES, RELEASE_NOTES } from "./data";
import s from "./portal.module.css";

type QuickResult = {
  icon: string;
  title: string;
  category: string;
  summary: string;
  href: string;
};

const QUICK_RESULTS: QuickResult[] = [
  {
    icon: "🔑", title: "How to reset an agent password", category: "Users",
    summary: "Reset passwords from the Users section and enforce a secure first login.",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-users",
  },
  {
    icon: "✈️", title: "Create your first air reservation", category: "Reservations",
    summary: "Follow the reservation flow and verify passenger, payment, and confirmation steps.",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-reservations",
  },
  {
    icon: "💸", title: "Set up agency markup rules", category: "Prices & Markup",
    summary: "Configure markup by route and carrier, then validate calculations on sample bookings.",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices",
  },
  {
    icon: "📧", title: "Customise booking confirmation email", category: "Notifications",
    summary: "Edit templates and placeholders for customer and internal notification variants.",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications",
  },
  {
    icon: "🔌", title: "Connect a GDS / NDC source", category: "Advanced Settings",
    summary: "Set provider credentials, test connectivity, and verify availability responses.",
    href: "/portal/configuration/gol-ibe-advanced-settings",
  },
];

export default function PortalOverviewPage() {
  const [query, setQuery] = useState("");
  const { setSelectedCat, openContact } = usePortal();

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return QUICK_RESULTS.filter((r) =>
      `${r.title} ${r.category} ${r.summary}`.toLowerCase().includes(q)
    );
  }, [query]);

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
        </div>
      </div>

      <div className={s.body}>

        {/* Quick results */}
        {filteredResults.length > 0 && (
          <div className={s.quickResults}>
            <h3 style={{ margin: "0 0 8px", fontSize: 19 }}>Quick results</h3>
            <ul className={s.quickResultsList}>
              {filteredResults.map((item) => (
                <li key={item.title} className={s.quickResultItem}>
                  <p>
                    <strong>{item.title}</strong>
                    <span className={s.badge}>{item.category}</span>
                  </p>
                  <p style={{ color: "#6e6e73", fontSize: 14 }}>{item.summary}</p>
                  <Link href={item.href}>Open full guide →</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Browse by topic */}
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
            </div>
            <div className={s.comingSoon}>
              <span className={s.comingSoonIcon}></span>
              <span className={s.comingSoonLabel}>Coming soon</span>
              <span className={s.comingSoonText}>
                Step-by-step guided paths — first booking, markup rules, notifications setup, and more.
              </span>
            </div>
          </div>

          {/* Agency Health Check */}
          <div className={s.panel}>
            <div className={s.panelHeader}>
              <span className={s.panelTitle}>Agency Health Check</span>
            </div>
            <div className={s.comingSoon}>
              <span className={s.comingSoonIcon}></span>
              <span className={s.comingSoonLabel}>Coming soon</span>
              <span className={s.comingSoonText}>
                Quick diagnostic — verify all agency configurations are complete and up to date.
              </span>
            </div>
          </div>

        </div>

        {/* Most Visited */}
        <div className={s.mostVisited}>
          <div className={s.mostVisitedTitle}>Most visited</div>
          <ul className={s.mostVisitedList}>
            {QUICK_RESULTS.map((item) => (
              <li key={item.title} className={s.mostVisitedItem}>
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

      </div>
    </>
  );
}
