"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, APP_TABS, type Category } from "./data";
import s from "./portal-layout.module.css";

/* ── Context ────────────────────────────────────────────── */
type PortalCtx = {
  selectedCat: Category | null;
  setSelectedCat: (cat: Category | null) => void;
  openContact: () => void;
};

const PortalContext = createContext<PortalCtx>({
  selectedCat: null,
  setSelectedCat: () => {},
  openContact: () => {},
});

export function usePortal() {
  return useContext(PortalContext);
}

/* ── Layout ─────────────────────────────────────────────── */
export default function PortalLayout({ children }: { children: ReactNode }) {
  const rawPathname = usePathname();
  const router = useRouter();
  const pathname = rawPathname.replace(/\/$/, "") || "/";
  const isPortalRoot = pathname === "/portal";

  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* Auto-expand and highlight the category matching the current article */
  useEffect(() => {
    if (!isPortalRoot) {
      const match = CATEGORIES.find(
        (cat) =>
          cat.href === pathname ||
          cat.articles.some((a) => a.href === pathname)
      );
      if (match) {
        setExpandedCat(match.name);
      }
    }
  }, [pathname, isPortalRoot]);

  function handleCatClick(cat: Category) {
    setSelectedCat(cat);
    setExpandedCat((prev) => (prev === cat.name ? null : cat.name));
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST to https://YOUR_SUBDOMAIN.zendesk.com/api/v2/requests.json
    setFormSent(true);
  }

  function closeContact() {
    setShowContact(false);
    setFormSent(false);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit", year: "numeric" });
  const fmtTime = (d: Date) =>
    d.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <PortalContext.Provider value={{ selectedCat, setSelectedCat, openContact: () => setShowContact(true) }}>
      <div className={s.portalRoot}>

        {/* ══ LEFT SIDEBAR ══════════════════════════════════ */}
        <aside className={s.sidebar}>

          {/* Brand + clock */}
          <div className={s.sidebarBrand}>
            <button
              className={s.sidebarBrandBtn}
              onClick={() => { setSelectedCat(null); router.push("/portal"); }}
            >
              GOL IBE Help
            </button>
            {now && (
              <div className={s.datetimeBadge}>
                <div>{fmtDate(now)}</div>
                <div>{fmtTime(now)}</div>
              </div>
            )}
          </div>

          {/* App switcher */}
          <div className={s.sidebarApps}>
            <span className={s.sidebarAppsLabel}>Switch to</span>
            {APP_TABS.map((tab) =>
              tab.isActive ? (
                <button key={tab.label} className={`${s.appLink} ${s.appLinkActive}`}>
                  {tab.label}
                </button>
              ) : (
                <a
                  key={tab.label}
                  href={tab.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.appLink}
                >
                  {tab.label}
                </a>
              )
            )}
          </div>

          {/* Topic navigation */}
          <div className={s.sidebarTopics}>
            <span className={s.sidebarLabel}>Topics</span>
            {CATEGORIES.map((cat) => {
              const isCatActive =
                cat.href === pathname ||
                cat.articles.some((a) => a.href === pathname) ||
                (isPortalRoot && selectedCat?.name === cat.name);
              const isExpanded = expandedCat === cat.name;
              return (
                <div key={cat.name}>
                  <button
                    className={`${s.sidebarItem} ${isCatActive ? s.sidebarItemActive : ""}`}
                    onClick={() => handleCatClick(cat)}
                    aria-expanded={isExpanded}
                  >
                    <span className={s.sidebarItemLeft}>
                      <span className={s.sidebarItemIcon}>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className={`${s.sidebarChevron} ${isExpanded ? s.sidebarChevronOpen : ""}`}>›</span>
                  </button>

                  {isExpanded && (
                    <ul className={s.sidebarSubList}>
                      <li>
                        <Link
                          href={cat.href}
                          className={`${s.sidebarSubItem} ${s.sidebarSubItemAll} ${cat.href === pathname ? s.sidebarSubItemActive : ""}`}
                        >
                          All {cat.name} articles →
                        </Link>
                      </li>
                      {cat.articles.map((a) => (
                        <li key={a.href}>
                          <Link
                            href={a.href}
                            className={`${s.sidebarSubItem} ${a.href === pathname ? s.sidebarSubItemActive : ""}`}
                          >
                            {a.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer actions */}
          <div className={s.sidebarFooter}>
            <a
              href="https://bo.golibe.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sidebarFooterBtn}
            >
              Admin Console
            </a>
            <Link href="/portal/admin" className={s.sidebarFooterBtn}>
              Content Studio
            </Link>
            <button className={s.sidebarFooterBtn} onClick={() => setShowContact(true)}>
              Contact Help
            </button>
          </div>

        </aside>
        {/* ══ END SIDEBAR ═══════════════════════════════════ */}

        {/* ══ MAIN CONTENT ══════════════════════════════════ */}
        <div className={s.portalMain}>
          {selectedCat && isPortalRoot ? (
            <CategoryView cat={selectedCat} onBack={() => setSelectedCat(null)} />
          ) : (
            children
          )}
        </div>

      </div>

      {/* ══ ZENDESK CONTACT MODAL ═════════════════════════ */}
      {showContact && (
        <div
          className={s.modalOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) closeContact(); }}
        >
          <div className={s.modalBox} role="dialog" aria-modal="true">
            <button className={s.modalClose} onClick={closeContact} aria-label="Close">✕</button>

            {formSent ? (
              <div className={s.successMsg}>
                <span className={s.successIcon}>✅</span>
                <h3 style={{ margin: "0 0 8px", letterSpacing: "-0.02em", fontSize: 22 }}>
                  Request submitted!
                </h3>
                <p style={{ color: "#6e6e73", fontSize: 15, margin: "0 0 24px" }}>
                  Our support team will get back to you via email shortly.
                </p>
                <button className={s.btnPrimary} onClick={closeContact}>Close</button>
              </div>
            ) : (
              <>
                <h2 className={s.modalTitle}>Contact Help</h2>
                <p className={s.modalSub}>
                  Submit a support request — our team usually responds within one business day.
                </p>
                <form onSubmit={handleFormSubmit}>
                  <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="ct-name">Your name</label>
                    <input id="ct-name" name="name" required className={s.formInput}
                      value={form.name} onChange={handleFormChange} placeholder="Jane Smith" autoComplete="name" />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="ct-email">Email address</label>
                    <input id="ct-email" name="email" type="email" required className={s.formInput}
                      value={form.email} onChange={handleFormChange} placeholder="you@youragency.com" autoComplete="email" />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="ct-subject">Subject</label>
                    <input id="ct-subject" name="subject" required className={s.formInput}
                      value={form.subject} onChange={handleFormChange} placeholder="e.g. Issue with booking confirmation email" />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="ct-message">Message</label>
                    <textarea id="ct-message" name="message" required className={s.formTextarea}
                      value={form.message} onChange={handleFormChange} placeholder="Describe your issue or question in detail…" />
                  </div>
                  <div className={s.formActions}>
                    <button type="button" className={s.btnOutline} onClick={closeContact}>Cancel</button>
                    <button type="submit" className={s.btnPrimary}>Send request</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </PortalContext.Provider>
  );
}

/* ── Category detail view ───────────────────────────────── */
function CategoryView({ cat, onBack }: { cat: Category; onBack: () => void }) {
  return (
    <div className={s.categoryView}>
      <button className={s.backBtn} onClick={onBack}>← Back to overview</button>

      <div className={s.categoryHero}>
        <h1 className={s.categoryTitle}>{cat.name}</h1>
      </div>
      <p className={s.categoryDesc}>{cat.desc}</p>

      <div className={s.articleGrid}>
        {cat.articles.map((a) => (
          <Link key={a.href} href={a.href} className={s.articleCard}>
            <span>{a.title}</span>
            <span className={s.articleArrow}>→</span>
          </Link>
        ))}
      </div>

      <Link href={cat.href} className={s.allArticlesLink}>
        View all {cat.name} articles →
      </Link>
    </div>
  );
}
