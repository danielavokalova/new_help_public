"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Category = {
  icon: string;
  name: string;
  desc: string;
  href: string;
};

type QuickResult = {
  icon: string;
  title: string;
  category: string;
  summary: string;
  href: string;
};

const CATEGORIES: Category[] = [
  { icon: "🏢", name: "Agency", desc: "Profile, settings, branding", href: "/getting-started" },
  { icon: "🤝", name: "Dealers", desc: "Dealer accounts and commissions", href: "/getting-started" },
  { icon: "👤", name: "Customers", desc: "Passenger profiles and loyalty data", href: "/operations" },
  { icon: "🎫", name: "Reservations", desc: "Create, modify and cancel bookings", href: "/operations" },
  { icon: "💰", name: "Prices & Markup", desc: "Fares, markups and surcharges", href: "/configuration" },
  { icon: "📋", name: "Code Lists", desc: "Carriers, destinations, cache", href: "/configuration" },
  { icon: "👥", name: "Users", desc: "Agents, roles, passwords", href: "/getting-started" },
  { icon: "🔔", name: "Notifications", desc: "Email templates and alerts", href: "/troubleshooting" },
  { icon: "📄", name: "Supporting Texts", desc: "Terms, conditions, content blocks", href: "/configuration" },
  { icon: "📈", name: "Statistics", desc: "Reports and usage analytics", href: "/operations" },
  { icon: "⚙️", name: "Basic Settings", desc: "First-time setup and core config", href: "/configuration" },
  { icon: "🔬", name: "Advanced Settings", desc: "GDS connectors, APIs, webhooks", href: "/configuration" }
];

const QUICK_RESULTS: QuickResult[] = [
  {
    icon: "🔑",
    title: "How to reset an agent password",
    category: "Users",
    summary: "Reset passwords from the users section and enforce a secure first login.",
    href: "/getting-started"
  },
  {
    icon: "✈️",
    title: "Create your first air reservation",
    category: "Reservations",
    summary: "Follow the reservation flow and verify passenger, payment, and confirmation steps.",
    href: "/operations"
  },
  {
    icon: "💸",
    title: "Set up agency markup rules",
    category: "Prices & Markup",
    summary: "Configure markup by route and carrier, then validate calculations on sample bookings.",
    href: "/configuration"
  },
  {
    icon: "📧",
    title: "Customise booking confirmation email",
    category: "Notifications",
    summary: "Edit templates and placeholders for customer and internal notification variants.",
    href: "/troubleshooting"
  },
  {
    icon: "🔌",
    title: "Connect a GDS / NDC source",
    category: "Advanced Settings",
    summary: "Set provider credentials, test connectivity, and verify availability responses.",
    href: "/configuration"
  }
];

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return QUICK_RESULTS.filter((item) =>
      `${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="portal-home">
      <div className="hero">
        <h2>✈️ New Help Portal</h2>
        <p>Your smart guide to the GOL IBE Admin Console. Get answers instantly.</p>
      </div>

      <label htmlFor="omnisearch" className="sr-only">Omnisearch</label>
      <input
        id="omnisearch"
        className="omnisearch"
        placeholder="🔍  Search anything... e.g. add new user, configure markup, cancel reservation"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredResults.length > 0 && (
        <div className="quick-results">
          <h3>Quick results</h3>
          <ul>
            {filteredResults.map((item) => (
              <li key={item.title}>
                <p>
                  {item.icon} <strong>{item.title}</strong> <span className="badge">{item.category}</span>
                </p>
                <p>{item.summary}</p>
                <Link href={item.href}>Open full guide →</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Browse by topic</h3>
      <div className="topic-grid">
        {CATEGORIES.map((category) => (
          <Link key={category.name} href={category.href} className="cat-card">
            <div className="cat-icon">{category.icon}</div>
            <div className="cat-name">{category.name}</div>
            <div className="cat-desc">{category.desc}</div>
            <span className="cat-link">Explore →</span>
          </Link>
        ))}
      </div>

      <div className="most-visited">
        <h3>🔥 Most visited</h3>
        <ul>
          {QUICK_RESULTS.map((item) => (
            <li key={`popular-${item.title}`}>
              <p>
                {item.icon} <strong>{item.title}</strong> <span className="badge">{item.category}</span>
              </p>
              <Link href={item.href}>Open →</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
