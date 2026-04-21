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
type ArticleEntry = { section: string; slug: string; title: string };
type EnrichedArticle = ArticleEntry & {
  href: string;
  categoryName: string;
  categoryIcon: string;
};
type GroupEntry = { catName: string; icon: string; items: EnrichedArticle[] };

/* Build href → category lookup once at module level */
const HREF_TO_CAT = new Map<string, { name: string; icon: string }>();
for (const cat of CATEGORIES) {
  for (const a of cat.articles) {
    HREF_TO_CAT.set(a.href, { name: cat.name, icon: cat.icon });
  }
}
const CAT_ORDER = CATEGORIES.map((c) => c.name);

function toSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}
function deriveSlug(md: string, fallback: string) {
  return toSlug(md.match(/^#\s+(.+)$/m)?.[1] ?? fallback);
}

export default function AdminPage() {
  /* ── Editor state ── */
  const [content, setContent] = useState("");
  const [section, setSection] = useState("getting-started");
  const [slug, setSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [hasEditor, setHasEditor] = useState(false);

  /* ── AI generation ── */
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
  const [articles, setArticles] = useState<ArticleEntry[]>([]);
  const [browseLoading, setBrowseLoading] = useState(false);
  const [browserFilter, setBrowserFilter] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<EnrichedArticle | null>(null);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(
    new Set(CATEGORIES.map((c) => c.name))
  );

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Load article list on mount */
  useEffect(() => {
    setBrowseLoading(true);
    fetch("/api/articles")
      .then((r) => r.json())
      .then((data) => { setArticles(data); setBrowseLoading(false); })
      .catch(() => setBrowseLoading(false));
  }, []);

  /* Enrich with category info */
  const enrichedArticles = useMemo((): EnrichedArticle[] =>
    articles.map((a) => {
      const href = `/portal/${a.section}/${a.slug}`;
      const cat = HREF_TO_CAT.get(href);
      return { ...a, href, categoryName: cat?.name ?? a.section, categoryIcon: cat?.icon ?? "📁" };
    }),
    [articles]
  );

  /* Filter */
  const filteredArticles = useMemo((): EnrichedArticle[] => {
    const q = browserFilter.trim().toLowerCase();
    if (!q) return enrichedArticles;
    return enrichedArticles.filter((a) =>
      a.title.toLowerCase().includes(q) ||
      a.href.toLowerCase().includes(q) ||
      a.slug.toLowerCase().includes(q)
    );
  }, [enrichedArticles, browserFilter]);

  /* Group in CATEGORIES order */
  const groupedArticles = useMemo((): GroupEntry[] => {
    const map = new Map<string, GroupEntry>();
    for (const cat of CATEGORIES) map.set(cat.name, { catName: cat.name, icon: cat.icon, items: [] });
    for (const a of filteredArticles) {
      if (!map.has(a.categoryName)) map.set(a.categoryName, { catName: a.categoryName, icon: a.categoryIcon, items: [] });
      map.get(a.categoryName)!.items.push(a);
    }
    return [...map.values()].filter((g) => g.items.length > 0);
  }, [filteredArticles]);

  /* Load an article for editing */
  async function loadArticle(entry: EnrichedArticle) {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: entry.section, slug: entry.slug }),
    });
    if (!res.ok) return;
    const { content: loaded } = await res.json();
    const h1 = loaded.match(/^#\s+(.+)$/m)?.[1]?.replace(/<!--.*?-->/g, "").trim() ?? entry.title;
    setContent(loaded);
    setSlug(entry.slug);
    setSection(entry.section);
    setTopic(h1);
    setSelectedCategory(CAT_ORDER.includes(entry.categoryName) ? entry.categoryName : "");
    setSelectedArticle(entry);
    setIsNewArticle(false);
    setAiExpanded(false);
    setSaveStatus("idle");
    setHasEditor(true);
  }

  /* Start a new blank article */
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
    setTimeout(() => editorRef.current?.focus(), 50);
  }

  /* ── Formatting helpers ── */
  function insertAtCursor(before: string, after = "", placeholder = "text") {
    const ta = editorRef.current;
    if (!ta) return;
    ta.focus();
    const start = ta.selectionStart ?? 0;
    const end = ta.selectionEnd ?? 0;
    const sel = content.slice(start, end) || placeholder;
    const next = content.slice(0, start) + before + sel + after + content.slice(end);
    setContent(next);
    requestAnimationFrame(() => {
      ta.setSelectionRange(start + before.length, start + before.length + sel.length);
    });
  }

  function insertBlock(text: string, cursorOffset?: number) {
    const ta = editorRef.current;
    if (!ta) return;
    ta.focus();
    const pos = ta.selectionStart ?? content.length;
    const pre = pos > 0 && content[pos - 1] !== "\n" ? "\n\n" : "";
    const next = content.slice(0, pos) + pre + text + "\n\n" + content.slice(pos);
    setContent(next);
    requestAnimationFrame(() => {
      const c = pos + pre.length + (cursorOffset ?? text.length);
      ta.setSelectionRange(c, c);
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key === "b") { e.preventDefault(); insertAtCursor("**", "**", "bold text"); }
    if (mod && e.key === "i") { e.preventDefault(); insertAtCursor("*", "*", "italic text"); }
    if (mod && e.key === "k") { e.preventDefault(); insertAtCursor("[", "](https://)", "link text"); }
  }

  /* ── AI generation ── */
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
        setContent(`> **Cannot generate:** ${await res.text()}\n\nAdd \`ANTHROPIC_API_KEY\` to \`.env.local\`.`);
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
      if (err instanceof Error && err.name !== "AbortError") setContent(`> **Error:** ${err.message}`);
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
      /* Refresh browser list after saving a new article */
      if (isNewArticle) {
        setIsNewArticle(false);
        fetch("/api/articles").then((r) => r.json()).then(setArticles).catch(() => {});
      }
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

  /* ─────────────────────────────────────────────────── */
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
        </div>
        <div className={s.headerRight}>
          {saveStatus === "saved" && (
            <span className={s.savedBadge}>✓ Saved — {savedPath}</span>
          )}
          {saveStatus === "error" && (
            <span className={s.errorBadge}>Save failed — run npm run dev</span>
          )}
        </div>
      </header>

      {/* ── Workspace: browser + editor ── */}
      <div className={s.workspace}>

        {/* ── LEFT BROWSER ── */}
        <aside className={s.browser}>
          <div className={s.browserHead}>
            <button className={s.newBtn} onClick={startNew}>＋ New article</button>
            <div className={s.browserSearchWrap}>
              <input
                className={s.browserSearch}
                placeholder="Search articles…"
                value={browserFilter}
                onChange={(e) => setBrowserFilter(e.target.value)}
              />
              {browserFilter && (
                <button className={s.browserClearX} onClick={() => setBrowserFilter("")}>×</button>
              )}
            </div>
          </div>

          <div className={s.browserScroll}>
            {browseLoading && <p className={s.browserHint}>Loading…</p>}

            {!browseLoading && articles.length === 0 && (
              <p className={s.browserHint}>
                Available in dev mode only.<br /><code>npm run dev</code>
              </p>
            )}

            {!browseLoading && articles.length > 0 && filteredArticles.length === 0 && (
              <p className={s.browserHint}>No match for "{browserFilter}"</p>
            )}

            {!browseLoading && groupedArticles.map(({ catName, icon, items }) => (
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
                      const isActive = selectedArticle?.slug === a.slug && selectedArticle?.section === a.section;
                      return (
                        <button
                          key={`${a.section}/${a.slug}`}
                          className={`${s.browserItem} ${isActive ? s.browserItemActive : ""}`}
                          onClick={() => loadArticle(a)}
                          title={a.href}
                        >
                          {a.title}
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

          {/* Empty state */}
          {!hasEditor && (
            <div className={s.editorEmpty}>
              <span className={s.editorEmptyIcon}>✏️</span>
              <p className={s.editorEmptyTitle}>Select an article to edit</p>
              <p className={s.editorEmptyDesc}>Choose from the list on the left, or create a new article.</p>
              <button className={s.btnPrimary} style={{ marginTop: 12 }} onClick={startNew}>
                ＋ New article
              </button>
            </div>
          )}

          {/* Editor */}
          {hasEditor && (
            <>
              {/* ── Top bar: title + meta ── */}
              <div className={s.editorTopBar}>
                <div className={s.editorTitleRow}>
                  <span className={s.editorTitlePreview}>{derivedTitle}</span>
                  <span className={`${s.editorStatusBadge} ${isNewArticle ? s.editorStatusNew : s.editorStatusEdit}`}>
                    {isNewArticle ? "NEW" : "EDITING"}
                  </span>
                </div>
                <div className={s.editorMetaRow}>
                  <select className={s.metaSelect} value={section} onChange={(e) => setSection(e.target.value)}>
                    {SECTIONS.map((sec) => (
                      <option key={sec.value} value={sec.value}>{sec.label}</option>
                    ))}
                  </select>
                  <span className={s.metaSep}>/</span>
                  <input
                    className={s.metaSlug}
                    placeholder="article-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                  <span className={s.metaExt}>.md</span>
                </div>
              </div>

              {/* ── AI panel (collapsible) ── */}
              <div className={s.aiSection}>
                <button
                  className={`${s.aiToggle} ${aiExpanded ? s.aiToggleOpen : ""}`}
                  onClick={() => setAiExpanded((v) => !v)}
                >
                  <span className={`${s.aiChevron} ${aiExpanded ? s.aiChevronOpen : ""}`}>›</span>
                  ⚡ Generate with AI
                  {isGenerating && <span className={s.aiGeneratingDot} />}
                </button>

                {aiExpanded && (
                  <div className={s.aiBody}>
                    <div className={s.field}>
                      <label className={s.label}>Topic / description</label>
                      <textarea
                        className={s.textarea}
                        rows={2}
                        placeholder="e.g. How to set up multi-currency for a dealer account"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className={s.aiRow}>
                      <div className={s.field}>
                        <label className={s.label}>Style</label>
                        <select className={s.select} value={tone} onChange={(e) => setTone(e.target.value)}>
                          {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                      <div className={s.field}>
                        <label className={s.label}>Extra notes <span className={s.optional}>(optional)</span></label>
                        <input className={s.input} placeholder="Extra context…" value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} />
                      </div>
                    </div>
                    <div className={s.aiActions}>
                      <button className={s.btnPrimary} onClick={handleGenerate} disabled={!topic.trim() || isGenerating}>
                        {isGenerating ? "Generating…" : "Generate article"}
                      </button>
                      {isGenerating && (
                        <button className={s.btnOutline} onClick={() => abortRef.current?.abort()}>Stop</button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Format toolbar ── */}
              <div className={s.fmtBar}>
                {/* Headings */}
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("# ", "", "Heading 1")} title="Heading 1">H1</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("## ", "", "Heading 2")} title="Heading 2">H2</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("### ", "", "Heading 3")} title="Heading 3">H3</button>
                <span className={s.fmtSep} />
                {/* Inline formatting */}
                <button className={s.fmtBtn} onClick={() => insertAtCursor("**", "**", "bold")} title="Bold (Ctrl+B)"><b>B</b></button>
                <button className={s.fmtBtn} onClick={() => insertAtCursor("*", "*", "italic")} title="Italic (Ctrl+I)"><i>I</i></button>
                <button className={s.fmtBtn} onClick={() => insertAtCursor("~~", "~~", "text")} title="Strikethrough"><s>S</s></button>
                <button className={`${s.fmtBtn} ${s.fmtMono}`} onClick={() => insertAtCursor("`", "`", "code")} title="Inline code">`c`</button>
                <span className={s.fmtSep} />
                {/* Lists */}
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("- ", "", "item")} title="Bullet list">• List</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("1. ", "", "item")} title="Numbered list">1. List</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("- [ ] ", "", "task")} title="Task list">☐ Todo</button>
                <span className={s.fmtSep} />
                {/* Blocks */}
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("> ", "", "quote")} title="Blockquote">" Quote</button>
                <button className={`${s.fmtBtn} ${s.fmtWide} ${s.fmtMono}`} onClick={() => insertBlock("```\ncode here\n```", 4)} title="Code block">```</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertBlock("| Col 1 | Col 2 |\n|---|---|\n| Cell | Cell |")} title="Table">⊞ Table</button>
                <span className={s.fmtSep} />
                {/* Media */}
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("[", "](https://)", "link text")} title="Link (Ctrl+K)">🔗 Link</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertAtCursor("![", "](https://example.com/img.jpg)", "alt")} title="Image">🖼 Image</button>
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertBlock('<iframe src="https://www.youtube.com/embed/VIDEO_ID" width="560" height="315" allowfullscreen></iframe>')} title="YouTube embed">▶ Video</button>
                <span className={s.fmtSep} />
                <button className={`${s.fmtBtn} ${s.fmtWide}`} onClick={() => insertBlock("---")} title="Horizontal rule">— HR</button>
                {/* Right side */}
                <div className={s.fmtSpacer} />
                <button className={`${s.fmtBtn} ${s.fmtWide} ${copied ? s.fmtCopied : ""}`} onClick={handleCopy} disabled={!content}>
                  {copied ? "✓ Copied" : "Copy MD"}
                </button>
              </div>

              {/* ── View toggle ── */}
              <div className={s.viewBar}>
                <div className={s.viewTabs}>
                  {(["edit", "split", "preview"] as ViewMode[]).map((m) => (
                    <button
                      key={m}
                      className={`${s.viewTab} ${viewMode === m ? s.viewTabActive : ""}`}
                      onClick={() => setViewMode(m)}
                    >
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  ))}
                </div>
                <div className={s.viewStats}>
                  {wordCount > 0 && <><span>{wordCount} words</span><span>·</span><span>{readingTime} min read</span></>}
                </div>
                <span className={s.viewShortcuts}>Ctrl+B bold · Ctrl+I italic · Ctrl+K link</span>
              </div>

              {/* ── Editor area ── */}
              <div className={`${s.editorArea} ${viewMode === "split" ? s.editorAreaSplit : ""}`}>
                {viewMode !== "preview" && (
                  <textarea
                    ref={editorRef}
                    className={s.mdTextarea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck
                    placeholder={isNewArticle ? "# Article Title\n\nStart writing here…" : ""}
                  />
                )}
                {viewMode !== "edit" && (
                  <div className={`${s.mdPreview} ${viewMode === "split" ? s.mdPreviewSplit : ""}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* ── Save bar ── */}
              <div className={s.saveBar}>
                <div className={s.saveCatWrap}>
                  <label className={s.saveCatLabel}>Category:</label>
                  <select
                    className={s.saveCatSelect}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">— not in sidebar —</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>

                {categoryHint && (
                  <div className={s.saveHint} title="Add this line to data.ts">
                    <code>{categoryHint}</code>
                  </div>
                )}

                <div className={s.saveActions}>
                  {!slug.trim() && (
                    <span className={s.saveWarn}>Enter a slug first</span>
                  )}
                  <button
                    className={s.btnPrimary}
                    onClick={handleSave}
                    disabled={saveStatus === "saving" || !slug.trim() || !content.trim()}
                  >
                    {saveStatus === "saving" ? "Saving…" : "Save article"}
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
