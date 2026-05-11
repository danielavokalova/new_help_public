"use client";

import Link from "next/link";
import { useState } from "react";
import s from "./home.module.css";

type Product = {
  emoji: string;
  name: string;
  desc: string;
  href?: string;
  action: string;
  comingSoon?: boolean;
};

const PRODUCTS: Product[] = [
  {
    emoji: "✈️",
    name: "GOL IBE",
    desc: "Admin Console help — users, bookings, markup rules, settings and more.",
    href: "/portal/",
    action: "Open help",
  },
  {
    emoji: "🛫",
    name: "LCC",
    desc: "Low-cost carrier integration guides and configuration walkthroughs.",
    action: "Coming soon",
    comingSoon: true,
  },
  {
    emoji: "🌐",
    name: "NDC",
    desc: "NDC offer & order management, airline connectivity and API references.",
    action: "Coming soon",
    comingSoon: true,
  },
  {
    emoji: "🏨",
    name: "Hotels",
    desc: "Hotel search, property setup, rate management and booking flows.",
    action: "Coming soon",
    comingSoon: true,
  },
];

const CHIPS = ["Add user", "Service fee", "Cancel booking", "Markup rules", "Email templates", "Flush caches"];

export default function HelpCenterHome() {
  const [query, setQuery] = useState("");

  function handleChip(label: string) {
    window.location.href = `/portal/?q=${encodeURIComponent(label)}`;
  }

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim()) {
      window.location.href = `/portal/?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <div className={s.page}>
      {/* Top bar */}
      <div className={s.topBar}>
        <span className={s.topBarBrand}>Help Center</span>
      </div>

      {/* Hero */}
      <div className={s.hero}>
        <h2 className={s.heroTitle}>Hi, how can we help you?</h2>
        <p className={s.heroSub}>Search the knowledge base or choose your product below.</p>

        <div className={s.searchWrap}>
          <span className={s.searchIcon}>🔍</span>
          <input
            className={s.omnisearch}
            placeholder="Search anything… e.g. add new user, service fee, cancel booking"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            aria-label="Search help articles"
          />
          {query && (
            <button className={s.searchClear} onClick={() => setQuery("")} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>

        <div className={s.heroChips}>
          {CHIPS.map((chip) => (
            <button key={chip} className={s.heroChip} onClick={() => handleChip(chip)}>
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className={s.body}>
        <p className={s.sectionLabel}>Browse by product</p>
        <div className={s.productGrid}>
          {PRODUCTS.map((p) =>
            p.href ? (
              <Link key={p.name} href={p.href} className={s.tile}>
                <div className={s.tileEmoji}>{p.emoji}</div>
                <div className={s.tileName}>{p.name}</div>
                <div className={s.tileDesc}>{p.desc}</div>
                <div className={s.tileFooter}>
                  <span className={s.tileAction}>{p.action}</span>
                </div>
              </Link>
            ) : (
              <div key={p.name} className={`${s.tile} ${s.tileDisabled}`}>
                <div className={s.tileEmoji}>{p.emoji}</div>
                <div className={s.tileName}>{p.name}</div>
                <div className={s.tileDesc}>{p.desc}</div>
                <div className={s.tileFooter}>
                  <span className={s.tileBadge}>Coming soon</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
