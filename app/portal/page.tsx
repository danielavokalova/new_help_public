"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import s from "./portal.module.css";

/* ── Types ──────────────────────────────────────────────── */
type Article = { title: string; href: string };

type Category = {
  icon: string;
  name: string;
  desc: string;
  href: string;
  articles: Article[];
};

type QuickResult = {
  icon: string;
  title: string;
  category: string;
  summary: string;
  href: string;
};

type AppTab = {
  label: string;
  href: string;
  isActive: boolean;
};

type ReleaseNote = { version: string; items: string[] };

/* ── Categories with sub-articles ──────────────────────── */
const CATEGORIES: Category[] = [
  {
    icon: "🏢", name: "Agency",
    desc: "Profile, e-mail settings, payment fees",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency",
    articles: [
      { title: "Email notifications settings", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency-what-is-section-e-mail-notifications-good-for" },
      { title: "Add fee for payment method", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency-how-to-add-a-fee-for-payment-method" },
    ],
  },
  {
    icon: "🤝", name: "Dealers",
    desc: "Dealer accounts, commissions, multi-currency",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-dealers",
    articles: [
      { title: "Multi-currency setup", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-dealers-customization-via-dealer-edit-how-to-set-up-a-multi-currency" },
      { title: "Calendar management", href: "/getting-started/2-gol-ibe-step-by-step-dealers-customization-via-dealer-edit-how-to-manage-calendar-on-your-gol-ibe-web-e698fa" },
      { title: "Basic front-end customization", href: "/getting-started/2-gol-ibe-step-by-step-gol-ibe-dealers-customization-via-dealer-front-end-settings-basic-fronted-customization" },
      { title: "Change background on front-end", href: "/getting-started/2-gol-ibe-step-by-step-gol-ibe-dealers-customization-via-dealer-front-end-settings-how-to-change-background-on" },
    ],
  },
  {
    icon: "👤", name: "Customers",
    desc: "Passenger profiles, travel documents",
    href: "/troubleshooting/gol-ibe-faqs",
    articles: [
      { title: "Manage travel documents", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-manage-travel-documents-in-gol-ibe" },
      { title: "Handle bookings with clients", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-handle-bookings-with-clients" },
      { title: "Handle bookings in GOL IBE", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-handle-bookings-in-gol-ibe" },
    ],
  },
  {
    icon: "🎫", name: "Reservations",
    desc: "Create, modify and cancel bookings",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-reservations",
    articles: [
      { title: "Handle bookings in Admin Console", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-reservations-gol-ibe-how-to-handle-bookings-in-admin-console" },
      { title: "Export list of bookings", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-export-the-list-of-bookings" },
      { title: "Stop fake bookings", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-stop-someone-from-sending-fake-booking" },
    ],
  },
  {
    icon: "💰", name: "Prices & Markup",
    desc: "Service fees, discounts, promo codes, special offers",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices",
    articles: [
      { title: "Handle service fees", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-how-to-handle-service-fees" },
      { title: "Service fees for 2OWs", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-prices-how-to-handle-service-fees-for-2ows" },
      { title: "Manage promo codes", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-how-to-manage-promocodes" },
      { title: "Commissions and discounts", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-what-is-section-commissions-and-discounts-good-for" },
      { title: "Handle special offers", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-how-to-handle-special-offers" },
      { title: "Discount for carrier / flight", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-prices-how-to-create-discount-for-certain-carrier-and-certain-flight" },
    ],
  },
  {
    icon: "📋", name: "Code Lists",
    desc: "Carriers, destination filters, flush caches",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists",
    articles: [
      { title: "Carriers", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-carriers" },
      { title: "Destination filters", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-destination-filters" },
      { title: "Blocked emails", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-how-about-section-blocked-e-mails" },
      { title: "Flush caches", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-what-is-section-flush-cashes-good-for" },
      { title: "Flush HTML caches", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-what-is-section-flush-html-cashes-good-for" },
    ],
  },
  {
    icon: "👥", name: "Users",
    desc: "Agents, roles, passwords, access rights",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-users",
    articles: [
      { title: "Create new user access", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-create-a-new-user-s-access" },
      { title: "Manage own user account", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-manage-own-gol-ibe-user-s-account" },
    ],
  },
  {
    icon: "🔔", name: "Notifications",
    desc: "Email templates and sent notifications",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications",
    articles: [
      { title: "Notification templates", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications-notification-templates" },
      { title: "Sent notifications", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications-sent-notifications" },
      { title: "Customize from-email section", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-customize-section-from-e-mail" },
      { title: "Most used notification types", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-what-types-of-notifications-are-the-most-used-ones-and-what-are-these-good-for" },
    ],
  },
  {
    icon: "📄", name: "Supporting Texts",
    desc: "Terms, footer, menu, ticket template, CSS",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-supporting-texts",
    articles: [
      { title: "CSS customization", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-css" },
      { title: "Create a footer", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-create-a-footer" },
      { title: "Create menu on front-end", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-create-menu-on-your-front-end" },
      { title: "Edit ticket itinerary template", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-edit-your-ticket-itinerary-template" },
      { title: "Manage terms and conditions", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-manage-terms-and-conditions" },
    ],
  },
  {
    icon: "📈", name: "Statistics",
    desc: "Reports, CSV/Excel export, column reference",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-statistics",
    articles: [
      { title: "Download statistics (CSV / Excel)", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-statistics" },
      { title: "Export list of bookings", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-export-the-list-of-bookings" },
    ],
  },
  {
    icon: "⚙️", name: "Basic Settings",
    desc: "Design, working hours, service fee, notifications",
    href: "/configuration/gol-ibe-basic-settings",
    articles: [
      { title: "Design your GOL IBE site", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-design-your-gol-ibe-site" },
      { title: "Set up working hours", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-set-up-working-hours-in-your-gol-ibe" },
      { title: "Set up service fee", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-set-up-service-fee" },
      { title: "Customize notifications", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-customize-notifications-in-your-gol-ibe" },
      { title: "Implement air ticket search form", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-implement-the-air-ticket-search-form-into-your-agency-website" },
    ],
  },
  {
    icon: "🔬", name: "Advanced Settings",
    desc: "GDS connectors, multi-PCC, NDC, parallel queries",
    href: "/configuration/gol-ibe-advanced-settings",
    articles: [
      { title: "MIR connector", href: "/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-mir" },
      { title: "Multi-PCC queries", href: "/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-multipcc-dotazovani" },
      { title: "Parallel queries", href: "/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-paraleleni-dotazovani" },
      { title: "Service fee from airline commission", href: "/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-servisni-poplatek-z-provize-letecke-spolecnosti" },
    ],
  },
];

/* ── Most-visited articles ──────────────────────────────── */
const QUICK_RESULTS: QuickResult[] = [
  {
    icon: "🔑", title: "How to reset an agent password", category: "Users",
    summary: "Reset passwords from the Users section and enforce a secure first login.",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-users",
  },
  {
    icon: "✈️", title: "Create your first air reservation", category: "Reservations",
    summary: "Follow the reservation flow and verify passenger, payment, and confirmation steps.",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-reservations",
  },
  {
    icon: "💸", title: "Set up agency markup rules", category: "Prices & Markup",
    summary: "Configure markup by route and carrier, then validate calculations on sample bookings.",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices",
  },
  {
    icon: "📧", title: "Customise booking confirmation email", category: "Notifications",
    summary: "Edit templates and placeholders for customer and internal notification variants.",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications",
  },
  {
    icon: "🔌", title: "Connect a GDS / NDC source", category: "Advanced Settings",
    summary: "Set provider credentials, test connectivity, and verify availability responses.",
    href: "/configuration/gol-ibe-advanced-settings",
  },
];

/* ── App switcher ───────────────────────────────────────── */
const APP_TABS: AppTab[] = [
  { label: "✈️ GOL IBE Help", href: "/portal", isActive: true },
  { label: "⚙️ Admin Console", href: "https://bo.golibe.com/", isActive: false },
  { label: "🌐 TCP", href: "https://www.travelcloudpro.com/#/login?returnTo=%2Fcbt%2Fcorporates", isActive: false },
  { label: "👤 My Travelport", href: "https://auth.travelport.com/", isActive: false },
  { label: "🏠 Our GOL IBE Web", href: "https://demo4.golibe.com/", isActive: false },
];

/* ── Release notes ──────────────────────────────────────── */
const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "April 2026",
    items: [
      "New Help Portal prototype launched",
      "App switcher: Admin Console, TCP, My Travelport, GOL IBE Web",
      "Left sidebar navigation with expandable topics",
      "Contact Help form (Zendesk) added",
    ],
  },
  {
    version: "March 2026",
    items: [
      "Baseline information architecture established",
      "Content organised: Getting Started, Configuration, Operations, Troubleshooting",
    ],
  },
];

/* ── Component ──────────────────────────────────────────── */
export default function PortalPage() {
  const [query, setQuery] = useState("");
  const [now, setNow] = useState<Date | null>(null);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return QUICK_RESULTS.filter((r) =>
      `${r.title} ${r.category} ${r.summary}`.toLowerCase().includes(q)
    );
  }, [query]);

  function toggleCat(name: string) {
    setExpandedCat((prev) => (prev === name ? null : name));
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST to https://YOUR_SUBDOMAIN.zendesk.com/api/v2/requests.json
    setFormSent(true);
  }

  function closeModal() {
    setShowContact(false);
    setFormSent(false);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit", year: "numeric" });
  const fmtTime = (d: Date) =>
    d.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div>
      {/* ── App Switcher + Datetime ── */}
      <div className={s.appBar}>
        <div className={s.appTabs}>
          {APP_TABS.map((tab) =>
            tab.isActive ? (
              <span key={tab.label} className={`${s.appTab} ${s.appTabActive}`}>{tab.label}</span>
            ) : (
              <a key={tab.label} href={tab.href} target="_blank" rel="noopener noreferrer" className={s.appTab}>
                {tab.label} ↗
              </a>
            )
          )}
        </div>
        {now && (
          <span className={s.datetimeBadge}>
            📅 {fmtDate(now)}&nbsp;&nbsp;🕐 {fmtTime(now)}
          </span>
        )}
      </div>

      {/* ── Hero + Search (full width) ── */}
      <div className={s.hero}>
        <h2 className={s.heroTitle}>✈️ GOL IBE Help Portal</h2>
        <p className={s.heroSub}>Your smart guide to the GOL IBE Admin Console. Get answers instantly.</p>
        <div className={s.searchWrap}>
          <span className={s.searchIcon}>🔍</span>
          <input
            className={s.omnisearch}
            placeholder="Search anything… e.g. add new user, configure markup, cancel reservation"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search help articles"
          />
        </div>
      </div>

      {/* ── Quick results (full width, conditional) ── */}
      {filteredResults.length > 0 && (
        <div className={s.quickResults}>
          <h3 style={{ margin: "0 0 10px", fontSize: 17 }}>Quick results</h3>
          <ul className={s.quickResultsList}>
            {filteredResults.map((item) => (
              <li key={item.title} className={s.quickResultItem}>
                <p style={{ margin: "0 0 4px" }}>
                  {item.icon} <strong>{item.title}</strong>
                  <span className={s.badge}>{item.category}</span>
                </p>
                <p style={{ margin: "0 0 4px", fontSize: 13.5 }}>{item.summary}</p>
                <Link href={item.href}>Open full guide →</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Two-column layout ── */}
      <div className={s.portalLayout}>

        {/* LEFT SIDEBAR */}
        <aside className={s.sidebar}>
          <div className={s.sidebarLabel}>Topics</div>
          {CATEGORIES.map((cat) => {
            const isOpen = expandedCat === cat.name;
            return (
              <div key={cat.name} className={s.sidebarSection}>
                <button
                  className={`${s.sidebarItem} ${isOpen ? s.sidebarItemActive : ""}`}
                  onClick={() => toggleCat(cat.name)}
                  aria-expanded={isOpen}
                >
                  <span className={s.sidebarItemLeft}>
                    <span className={s.sidebarItemIcon}>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </span>
                  <span className={`${s.sidebarChevron} ${isOpen ? s.sidebarChevronOpen : ""}`}>›</span>
                </button>

                {isOpen && (
                  <ul className={s.sidebarSubList}>
                    <li>
                      <Link href={cat.href} className={`${s.sidebarSubItem} ${s.sidebarSubItemAll}`}>
                        All {cat.name} articles →
                      </Link>
                    </li>
                    {cat.articles.map((a) => (
                      <li key={a.href}>
                        <Link href={a.href} className={s.sidebarSubItem}>{a.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Sidebar bottom links */}
          <div className={s.sidebarDivider} />
          <a href="https://bo.golibe.com/" target="_blank" rel="noopener noreferrer" className={s.sidebarExternalLink}>
            ⚙️ Admin Console ↗
          </a>
          <button className={s.sidebarExternalLink} onClick={() => setShowContact(true)}>
            📧 Contact Help
          </button>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <div className={s.mainContent}>

          {/* Browse by topic */}
          <p className={s.sectionTitle}>Browse by topic</p>
          <div className={s.topicGrid}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className={`${s.catCard} ${expandedCat === cat.name ? s.catCardActive : ""}`}
                onClick={() => toggleCat(cat.name)}
              >
                <div className={s.catIcon}>{cat.icon}</div>
                <div className={s.catName}>{cat.name}</div>
                <div className={s.catDesc}>{cat.desc}</div>
                <span className={s.catLink}>Explore →</span>
              </button>
            ))}
          </div>

          {/* Three panels */}
          <div className={s.panelsRow}>

            {/* What's New */}
            <div className={s.panel}>
              <div className={s.panelHeader}>
                <span className={s.panelIcon}>🆕</span>
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
                <Link href="/release-notes" style={{ fontSize: 13, marginTop: 10, display: "inline-block" }}>
                  All release notes →
                </Link>
              </div>
            </div>

            {/* Walkthroughs */}
            <div className={s.panel}>
              <div className={s.panelHeader}>
                <span className={s.panelIcon}>🚶</span>
                <span className={s.panelTitle}>Walkthroughs</span>
              </div>
              <div className={s.comingSoon}>
                <span className={s.comingSoonIcon}>🗺️</span>
                <span className={s.comingSoonLabel}>Coming soon</span>
                <span className={s.comingSoonText}>
                  Step-by-step guided paths for common tasks — first booking flow, notifications, markup rules, and more.
                </span>
              </div>
            </div>

            {/* Agency Health Check */}
            <div className={s.panel}>
              <div className={s.panelHeader}>
                <span className={s.panelIcon}>💊</span>
                <span className={s.panelTitle}>Agency Health Check</span>
              </div>
              <div className={s.comingSoon}>
                <span className={s.comingSoonIcon}>📊</span>
                <span className={s.comingSoonLabel}>Coming soon</span>
                <span className={s.comingSoonText}>
                  A quick diagnostic of your agency setup — verify all configurations are complete and up to date.
                </span>
              </div>
            </div>

          </div>{/* /panelsRow */}

          {/* Most visited */}
          <div className={s.mostVisited}>
            <div className={s.mostVisitedTitle}>🔥 Most visited</div>
            <ul className={s.mostVisitedList}>
              {QUICK_RESULTS.map((item) => (
                <li key={item.title} className={s.mostVisitedItem}>
                  <p style={{ margin: 0, fontSize: 13.5 }}>
                    {item.icon} <strong>{item.title}</strong>
                    <span className={s.badge}>{item.category}</span>
                  </p>
                  <Link href={item.href} style={{ whiteSpace: "nowrap", fontSize: 13 }}>Open →</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Action bar */}
          <div className={s.actionBar}>
            <a href="https://bo.golibe.com/" target="_blank" rel="noopener noreferrer" className={s.btnOutline}>
              ⚙️ Open Admin Console ↗
            </a>
            <button className={s.btnPrimary} onClick={() => setShowContact(true)}>
              📧 Contact Help
            </button>
          </div>

        </div>{/* /mainContent */}
      </div>{/* /portalLayout */}

      {/* ── Zendesk Contact Modal ── */}
      {showContact && (
        <div className={s.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className={s.modalBox} role="dialog" aria-modal="true">
            <button className={s.modalClose} onClick={closeModal} aria-label="Close">✕</button>
            {formSent ? (
              <div className={s.successMsg}>
                <span className={s.successIcon}>✅</span>
                <h3 style={{ margin: "0 0 8px", letterSpacing: "-0.02em" }}>Request submitted!</h3>
                <p style={{ color: "#6e6e73", fontSize: 14, margin: "0 0 22px" }}>
                  Our support team will get back to you via email shortly.
                </p>
                <button className={s.btnPrimary} onClick={closeModal}>Close</button>
              </div>
            ) : (
              <>
                <h2 className={s.modalTitle}>📧 Contact Help</h2>
                <p className={s.modalSub}>Submit a support request — our team usually responds within one business day.</p>
                <form onSubmit={handleFormSubmit}>
                  <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="ct-name">Your name</label>
                    <input id="ct-name" name="name" required className={s.formInput} value={form.name} onChange={handleFormChange} placeholder="Jane Smith" autoComplete="name" />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="ct-email">Email address</label>
                    <input id="ct-email" name="email" type="email" required className={s.formInput} value={form.email} onChange={handleFormChange} placeholder="you@youragency.com" autoComplete="email" />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="ct-subject">Subject</label>
                    <input id="ct-subject" name="subject" required className={s.formInput} value={form.subject} onChange={handleFormChange} placeholder="e.g. Issue with booking confirmation email" />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="ct-message">Message</label>
                    <textarea id="ct-message" name="message" required className={s.formTextarea} value={form.message} onChange={handleFormChange} placeholder="Describe your issue or question in detail…" />
                  </div>
                  <div className={s.formActions}>
                    <button type="button" className={s.btnOutline} onClick={closeModal}>Cancel</button>
                    <button type="submit" className={s.btnPrimary}>Send request</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
