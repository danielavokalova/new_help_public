"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CATEGORIES } from "../data";
import s from "./admin.module.css";

const SECTIONS = [
  { value: "getting-started", label: "Getting Started" },
  { value: "configuration", label: "Configuration" },
  { value: "operations", label: "Operations" },
  { value: "troubleshooting", label: "Troubleshooting" },
  { value: "release-notes", label: "Release Notes" },
];

const TONES = [
  { value: "step-by-step guide", label: "Step-by-step guide" },
  { value: "conversational FAQ", label: "Conversational FAQ" },
  { value: "technical reference", label: "Technical reference" },
  { value: "quick tip", label: "Quick tip" },
];

type ViewMode = "edit" | "split" | "preview";
type SaveStatus = "idle" | "saving" | "saved" | "error";

type EnrichedArticle = {
  section: string;
  slug: string;
  title: string;
  href: string;
  categoryName: string;
  categoryIcon: string;
};

type GroupEntry = { catName: string; icon: string; items: EnrichedArticle[] };

/* ── Build article catalog from CATEGORIES (always available, no API needed) ── */
const CATALOG: EnrichedArticle[] = CATEGORIES.flatMap((cat) =>
  cat.articles.map((a) => {
    const parts = a.href.replace(/^\/portal\//, "").split("/");
    return {
      section: parts[0] ?? "getting-started",
      slug: parts.slice(1).join("/") ?? "",
      title: a.title,
      href: a.href,
      categoryName: cat.name,
      categoryIcon: cat.icon,
    };
  })
);

function toSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}
function deriveSlug(md: string, fallback: string) {
  return toSlug(md.match(/^#\s+(.+)$/m)?.[1] ?? fallback);
}

/* Detect dev mode by trying a known API path */
let devModeCache: boolean | null = null;
async function isDevMode(): Promise<boolean> {
  if (devModeCache !== null) return devModeCache;
  try {
    const r = await fetch("/api/articles", { method: "GET" });
    devModeCache = r.ok;
  } catch {
    devModeCache = false;
  }
  return devModeCache!;
}

export default function AdminPage() {
  /* ── Editor state ── */
  const [content, setContent] = useState("");
  const [section, setSection] = useState("getting-started");
  const [slug, setSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [hasEditor, setHasEditor] = useState(false);
  const [devMode, setDevMode] = useState<boolean | null>(null);

  /* ── AI ── */
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("step-by-step guide");
  const [extraNotes, setExtraNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiExpanded, setAiExpanded] = useState(false);

  /* ── View ── */
  const [viewMode, setViewMode] = useState<ViewMode>("edit");

  /* ── Save ── */
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [savedPath, setSavedPath] = useState("");
  const [copied, setCopied] = useState(false);

  /* ── Browser ── */
  const [browserFilter, setBrowserFilter] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<EnrichedArticle | null>(null);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(
    new Set(CATEGORIES.map((c) => c.name))
  );
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Check dev mode on mount */
  useEffect(() => {
    isDevMode().then(setDevMode);
  }, []);

  /* ── Filter + group the static catalog ── */
  const filteredCatalog = useMemo((): EnrichedArticle[] => {
    const q = browserFilter.trim().toLowerCase();
    if (!q) return CATALOG;
    return CATALOG.filter((a) =>
      a.title.toLowerCase().includes(q) ||
      a.href.toLowerCase().includes(q) ||
      a.slug.toLowerCase().includes(q)
    );
  }, [browserFilter]);

  const groupedCatalog = useMemo((): GroupEntry[] => {
    const map = new Map<string, GroupEntry>();
    for (const cat of CATEGORIES) map.set(cat.name, { catName: cat.name, icon: cat.icon, items: [] });
    for (const a of filteredCatalog) {
      if (!map.has(a.categoryName)) map.set(a.categoryName, { catName: a.categoryName, icon: a.categoryIcon, items: [] });
      map.get(a.categoryName)!.items.push(a);
    }
    return [...map.values()].filter((g) => g.items.length > 0);
  }, [filteredCatalog]);

  /* ── Load article for editing ── */
  async function loadArticle(entry: EnrichedArticle) {
    setLoadError(null);
    setLoadingSlug(`${entry.section}/${entry.slug}`);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: entry.section, slug: entry.slug }),
      });
      if (!res.ok) throw new Error("API unavailable");
      const { content: loaded } = await res.json();
      const h1 = loaded.match(/^#\s+(.+)$/m)?.[1]?.replace(/<!--.*?-->/g, "").trim() ?? entry.title;
      setContent(loaded);
      setSlug(entry.slug);
      setSection(entry.section);
      setTopic(h1);
      setSelectedCategory(entry.categoryName);
      setSelectedArticle(entry);
      setIsNewArticle(false);
      setAiExpanded(false);
      setSaveStatus("idle");
      setHasEditor(true);
      setLoadError(null);
    } catch {
      setLoadError(`Úprava článků vyžaduje lokální dev server.\nSpusť: npm run dev`);
    } finally {
      setLoadingSlug(null);
    }
  }

  /* ── New blank article ── */
  function startNew() {
    setContent("");
    setSlug("");
    setSection("getting-started");
    setTopic("");
    setTone("step-by-step guide");
    setExtraNotes("");
    setSelectedCategory("");
    setSelectedArticle(null);
    setIsNewArticle(true);
    setAiExpanded(true);
    setSaveStatus("idle");
    setHasEditor(true);
    setLoadError(null);
    setTimeout(() => editorRef.current?.focus(), 50);
  }

  /* ── Format helpers ── */
  function insertAtCursor(before: string, after = "", placeholder = "text") {
    const ta = editorRef.current;
    if (!ta) return;
    ta.focus();
    const start = ta.selectionStart ?? 0;
    const end = ta.selectionEnd ?? 0;
    const sel = content.slice(start, end) || placeholder;
    setContent(content.slice(0, start) + before + sel + after + content.slice(end));
    requestAnimationFrame(() => ta.setSelectionRange(start + before.length, start + before.length + sel.length));
  }

  function insertBlock(text: string, cursorOffset?: number) {
    const ta = editorRef.current;
    if (!ta) return;
    ta.focus();
    const pos = ta.selectionStart ?? content.length;
    const pre = pos > 0 && content[pos - 1] !== "\n" ? "\n\n" : "";
    setContent(content.slice(0, pos) + pre + text + "\n\n" + content.slice(pos));
    requestAnimationFrame(() => {
      const c = pos + pre.length + (cursorOffset ?? text.length);
      ta.setSelectionRange(c, c);
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key === "b") { e.preventDefault(); insertAtCursor("**", "**", "bold"); }
    if (mod && e.key === "i") { e.preventDefault(); insertAtCursor("*", "*", "italic"); }
    if (mod && e.key === "k") { e.preventDefault(); insertAtCursor("[", "](https://)", "link text"); }
  }

  /* ── AI generate ── */
  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) return;
    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;
    setIsGenerating(true);
    setContent("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, section, tone, extraNotes }),
        signal: abort.signal,
      });
      if (!res.ok) {
        setContent(`> ⚠️ **AI generování nefunguje na produkčním serveru.**\n>\n> Spusť lokálně: \`npm run dev\` a přidej \`ANTHROPIC_API_KEY\` do \`.env.local\`.\n\nMůžeš psát manuálně níže.`);
        return;
      }
      const reader = res.body!.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setContent(acc);
      }
      setSlug(deriveSlug(acc, topic));
      setAiExpanded(false);
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setContent(`> ⚠️ Chyba: ${err.message}`);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [topic, section, tone, extraNotes]);

  /* ── Save ── */
  async function handleSave() {
    if (!slug.trim() || !content.trim()) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, slug, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSavedPath(data.path);
      setSaveStatus("saved");
      if (isNewArticle) setIsNewArticle(false);
    } catch {
      setSaveStatus("error");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function toggleCat(name: string) {
    setExpandedCats((prev) => {
      const n = new Set(prev);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  }

  /* ── Derived ── */
  const derivedTitle = useMemo(
    () => content.match(/^#\s+(.+)$/m)?.[1]?.replace(/<!--.*?-->/g, "").trim() ?? "(No title)",
    [content]
  );
  const wordCount = useMemo(() => (content.trim() ? content.trim().split(/\s+/).length : 0), [content]);
  const readingTime = Math.max(1, Math.round(wordCount / 200));
  const categoryHint = selectedCategory
    ? `{ title: "${derivedTitle}", href: "/portal/${section}/${slug || "slug"}" }`
    : null;

  /* ─────────────────────────────────────────────────────────── */
  return (
    <div className={s.root}>

      {/* ── Header ── */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <Link href="/portal" className={s.backLink}>← Portal</Link>
          <div className={s.titleGroup}>
            <span className={s.badge}>AI</span>
            <h1 className={s.title}>Content Studio</h1>
          </div>
          {devMode === false && (
            <span className={s.devWarning}>⚠ Produkční server — ukládání vyžaduje npm run dev</span>
          )}
        </div>
        <div className={s.headerRight}>
          {saveStatus === "saved" && <span className={s.savedBadge}>✓ Uloženo — {savedPath}</span>}
          {saveStatus === "error" && <span className={s.errorBadge}>Chyba ukládání — spusť npm run dev</span>}
        </div>
      </header>

      {/* ── Workspace ── */}
      <div className={s.workspace}>

        {/* ── LEFT BROWSER ── */}
        <aside className={s.browser}>
          <div className={s.browserHead}>
            <button className={s.newBtn} onClick={startNew}>＋ Nový článek</button>
            <div className={s.browserSearchWrap}>
              <input
                className={s.browserSearch}
                placeholder="Hledat článek…"
                value={browserFilter}
                onChange={(e) => setBrowserFilter(e.target.value)}
              />
              {browserFilter && (
                <button className={s.browserClearX} onClick={() => setBrowserFilter("")}>×</button>
              )}
            </div>
            <div className={s.browserCount}>
              {filteredCatalog.length} článků
            </div>
          </div>

          <div className={s.browserScroll}>
            {loadError && (
              <div className={s.browserError}>
                <span>⚠️</span>
                <p>{loadError}</p>
              </div>
            )}

            {filteredCatalog.length === 0 && (
              <p className={s.browserHint}>Žádný výsledek pro „{browserFilter}"</p>
            )}

            {groupedCatalog.map(({ catName, icon, items }) => (
              <div key={catName} className={s.browserCatGroup}>
                <button className={s.browserCatToggle} onClick={() => toggleCat(catName)}>
                  <span className={s.browserCatIcon}>{icon}</span>
                  <span className={s.browserCatName}>{catName}</span>
                  <span className={s.browserCatCount}>{items.length}</span>
                  <span className={`${s.browserChevron} ${expandedCats.has(catName) ? s.browserChevronOpen : ""}`}>›</span>
                </button>
                {expandedCats.has(catName) && (
                  <div className={s.browserItems}>
                    {items.map((a) => {
                      const key = `${a.section}/${a.slug}`;
                      const isActive = selectedArticle?.slug === a.slug && selectedArticle?.section === a.section;
                      const isLoading = loadingSlug === key;
                      return (
                        <button
                          key={key}
                          className={`${s.browserItem} ${isActive ? s.browserItemActive : ""} ${isLoading ? s.browserItemLoading : ""}`}
                          onClick={() => loadArticle(a)}
                          title={a.href}
                          disabled={isLoading}
                        >
                          {isLoading ? "Načítám…" : a.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* ── RIGHT EDITOR ── */}
        <div className={s.editorPanel}>

          {!hasEditor && (
            <div className={s.editorEmpty}>
              <span className={s.editorEmptyIcon}>✏️</span>
              <p className={s.editorEmptyTitle}>Vyberte článek k editaci</p>
              <p className={s.editorEmptyDesc}>
                Klikněte na článek vlevo, nebo vytvořte nový.
                {devMode === false && (
                  <><br /><br /><strong>Pro editaci a ukládání</strong> spusť lokálně:<br /><code>npm run dev</code></>
                )}
              </p>
              <button className={s.btnPrimary} style={{ marginTop: 16 }} onClick={startNew}>
                ＋ Nový článek
              </button>
            </div>
          )}

          {hasEditor && (
            <>
              {/* Top bar */}
              <div className={s.editorTopBar}>
                <div className={s.editorTitleRow}>
                  <span className={s.editorTitlePreview}>{derivedTitle}</span>
                  <span className={`${s.editorStatusBadge} ${isNewArticle ? s.editorStatusNew : s.editorStatusEdit}`}>
                    {isNewArticle ? "NOVÝ" : "EDITACE"}
                  </span>
                </div>
                <div className={s.editorMetaRow}>
                  <select className={s.metaSelect} value={section} onChange={(e) => setSection(e.target.value)}>
                    {SECTIONS.map((sec) => <option key={sec.value} value={sec.value}>{sec.label}</option>)}
                  </select>
                  <span className={s.metaSep}>/</span>
                  <input className={s.metaSlug} placeholder="article-slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                  <span className={s.metaExt}>.md</span>
                </div>
              </div>

              {/* AI panel */}
              <div className={s.aiSection}>
                <button className={`${s.aiToggle} ${aiExpanded ? s.aiToggleOpen : ""}`} onClick={() => setAiExpanded((v) => !v)}>
                  <span className={`${s.aiChevron} ${aiExpanded ? s.aiChevronOpen : ""}`}>›</span>
                  ⚡ Generovat pomocí AI
                  {isGenerating && <span className={s.aiGeneratingDot} />}
                </button>
                {aiExpanded && (
                  <div className={s.aiBody}>
                    <div className={s.field}>
                      <label className={s.label}>Téma / popis článku</label>
                      <textarea className={s.textarea} rows={2} placeholder="např. Jak nastavit multi-měnový dealer účet" value={topic} onChange={(e) => setTopic(e.target.value)} autoFocus />
                    </div>
                    <div className={s.aiRow}>
                      <div className={s.field}>
                        <label className={s.label}>Styl</label>
                        <select className={s.select} value={tone} onChange={(e) => setTone(e.target.value)}>
                          {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                      <div className={s.field}>
                        <label className={s.label}>Poznámky <span className={s.optional}>(volitelné)</span></label>
                        <input className={s.input} placeholder="Další kontext…" value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} />
                      </div>
                    </div>
                    <div className={s.aiActions}>
                      <button className={s.btnPrimary} onClick={handleGenerate} disabled={!topic.trim() || isGenerating}>
                        {isGenerating ? "Generuji…" : "Generovat článek"}
                      </button>
                      {isGenerating && <button className={s.btnOutline} onClick={() => abortRef.current?.abort()}>Zastavit</button>}
                    </div>
                  </div>
                )}
              </div>

              {/* Format toolbar */}
              <div className={s.fmtBar}>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("# ", "", "Nadpis 1")} title="Nadpis 1">H1</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("## ", "", "Nadpis 2")} title="Nadpis 2">H2</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("### ", "", "Nadpis 3")} title="Nadpis 3">H3</button>
                <span className={s.fmtSep} />
                <button className={s.fmtBtn} onClick={() => insertAtCursor("**", "**", "tučný")} title="Tučně (Ctrl+B)"><b>B</b></button>
                <button className={s.fmtBtn} onClick={() => insertAtCursor("*", "*", "kurzíva")} title="Kurzíva (Ctrl+I)"><i>I</i></button>
                <button className={s.fmtBtn} onClick={() => insertAtCursor("~~", "~~", "text")} title="Přeškrtnutí"><s>S</s></button>
                <button className={`${s.fmtBtn} ${s.fmtMono}`} onClick={() => insertAtCursor("`", "`", "kód")} title="Inline kód">`c`</button>
                <span className={s.fmtSep} />
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("- ", "", "položka")} title="Odrážky">• List</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("1. ", "", "položka")} title="Číslovaný seznam">1. List</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("- [ ] ", "", "úkol")} title="Checklist">☐ Todo</button>
                <span className={s.fmtSep} />
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("> ", "", "citát")} title="Citát">" Quote</button>
                <button className={`${s.fmtBtn} ${s.fmtWide} ${s.fmtMono}`} onClick={() => insertBlock("```\nkód zde\n```", 4)} title="Blok kódu">```</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertBlock("| Sloupec 1 | Sloupec 2 |\n|---|---|\n| Buňka | Buňka |")} title="Tabulka">⊞ Table</button>
                <span className={s.fmtSep} />
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("[", "](https://)", "text odkazu")} title="Odkaz (Ctrl+K)">🔗 Link</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("![", "](https://example.com/img.jpg)", "popis")} title="Obrázek">🖼 Obr</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertBlock('<iframe src="https://www.youtube.com/embed/VIDEO_ID" width="560" height="315" allowfullscreen></iframe>')} title="YouTube video">▶ Video</button>
                <span className={s.fmtSep} />
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertBlock("---")} title="Oddělovač">— HR</button>
                <div className={s.fmtSpacer} />
                <button className={`${s.fmtBtn} ${s.fmtWide} ${copied ? s.fmtCopied : ""}`} onClick={handleCopy} disabled={!content}>
                  {copied ? "✓ Zkopírováno" : "Kopírovat MD"}
                </button>
              </div>

              {/* View toggle */}
              <div className={s.viewBar}>
                <div className={s.viewTabs}>
                  {(["edit", "split", "preview"] as ViewMode[]).map((m) => (
                    <button key={m} className={`${s.viewTab} ${viewMode === m ? s.viewTabActive : ""}`} onClick={() => setViewMode(m)}>
                      {m === "edit" ? "Editace" : m === "split" ? "Rozdělení" : "Náhled"}
                    </button>
                  ))}
                </div>
                <div className={s.viewStats}>
                  {wordCount > 0 && <><span>{wordCount} slov</span><span>·</span><span>{readingTime} min čtení</span></>}
                </div>
                <span className={s.viewShortcuts}>Ctrl+B tučně · Ctrl+I kurzíva · Ctrl+K odkaz</span>
              </div>

              {/* Editor area */}
              <div className={`${s.editorArea} ${viewMode === "split" ? s.editorAreaSplit : ""}`}>
                {viewMode !== "preview" && (
                  <textarea
                    ref={editorRef}
                    className={s.mdTextarea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck
                    placeholder={isNewArticle ? "# Název článku\n\nZačněte psát…" : ""}
                  />
                )}
                {viewMode !== "edit" && (
                  <div className={`${s.mdPreview} ${viewMode === "split" ? s.mdPreviewSplit : ""}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Save bar */}
              <div className={s.saveBar}>
                <div className={s.saveCatWrap}>
                  <label className={s.saveCatLabel}>Kategorie:</label>
                  <select className={s.saveCatSelect} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">— nezařazeno —</option>
                    {CATEGORIES.map((cat) => <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>)}
                  </select>
                </div>
                {categoryHint && (
                  <div className={s.saveHint} title="Přidej tento řádek do data.ts">
                    <code>{categoryHint}</code>
                  </div>
                )}
                <div className={s.saveActions}>
                  {!slug.trim() && <span className={s.saveWarn}>Zadej slug</span>}
                  <button className={s.btnPrimary} onClick={handleSave} disabled={saveStatus === "saving" || !slug.trim() || !content.trim()}>
                    {saveStatus === "saving" ? "Ukládám…" : "Uložit článek"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
