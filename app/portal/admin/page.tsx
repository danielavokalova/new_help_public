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

const TEMPLATES = [
  "How to set up [feature] in GOL IBE",
  "Common issues with [topic] and how to fix them",
  "FAQ: [topic] for travel agency managers",
  "How to configure [setting] step by step",
  "What is [feature] and when to use it",
];

type Step = "configure" | "generate" | "publish";
type ViewMode = "edit" | "split" | "preview";
type Mode = "new" | "browse";

const DRAFT_KEY = "content-studio-draft-v2";

function toSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}

function deriveSlug(markdown: string, fallback: string): string {
  const h1 = markdown.match(/^#\s+(.+)$/m)?.[1];
  return toSlug(h1 ?? fallback);
}

type ArticleEntry = { section: string; slug: string; title: string };

type EnrichedArticle = ArticleEntry & {
  href: string;
  categoryName: string;
  categoryIcon: string;
  categoryDesc: string;
};

type GroupEntry = {
  catName: string;
  icon: string;
  desc: string;
  items: EnrichedArticle[];
};

/* Build href → category info map once from CATEGORIES */
const HREF_TO_CAT = new Map<string, { name: string; icon: string; desc: string }>();
for (const cat of CATEGORIES) {
  for (const a of cat.articles) {
    HREF_TO_CAT.set(a.href, { name: cat.name, icon: cat.icon, desc: cat.desc });
  }
}

const CAT_ORDER = CATEGORIES.map((c) => c.name);

export default function AdminPage() {
  const [mode, setMode] = useState<Mode>("new");
  const [step, setStep] = useState<Step>("configure");
  const [topic, setTopic] = useState("");
  const [section, setSection] = useState("getting-started");
  const [tone, setTone] = useState("step-by-step guide");
  const [extraNotes, setExtraNotes] = useState("");
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [slug, setSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [publishStatus, setPublishStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [savedPath, setSavedPath] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  /* Browse state */
  const [articles, setArticles] = useState<ArticleEntry[]>([]);
  const [browseLoading, setBrowseLoading] = useState(false);
  const [browseFilter, setBrowseFilter] = useState("");

  const abortRef = useRef<AbortController | null>(null);

  /* Load draft on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.topic) { setTopic(d.topic); setHasDraft(true); }
        if (d.section) setSection(d.section);
        if (d.tone) setTone(d.tone);
        if (d.extraNotes) setExtraNotes(d.extraNotes);
        if (d.content) { setContent(d.content); setStep("generate"); }
        if (d.slug) setSlug(d.slug);
      }
    } catch {}
  }, []);

  /* Auto-save draft */
  useEffect(() => {
    if (!topic && !content) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ topic, section, tone, extraNotes, content, slug }));
      setHasDraft(true);
    } catch {}
  }, [topic, section, tone, extraNotes, content, slug]);

  /* Load article list when browse mode opens */
  useEffect(() => {
    if (mode !== "browse") return;
    setBrowseLoading(true);
    fetch("/api/articles")
      .then((r) => r.json())
      .then((data) => { setArticles(data); setBrowseLoading(false); })
      .catch(() => setBrowseLoading(false));
  }, [mode]);

  function clearDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    setTopic(""); setSection("getting-started"); setTone("step-by-step guide");
    setExtraNotes(""); setContent(""); setSlug(""); setSelectedCategory("");
    setStep("configure"); setPublishStatus("idle"); setHasDraft(false); setIsEditMode(false);
  }

  /* Enrich articles with category info from CATEGORIES */
  const enrichedArticles = useMemo((): EnrichedArticle[] => {
    return articles.map((a) => {
      const href = `/portal/${a.section}/${a.slug}`;
      const catInfo = HREF_TO_CAT.get(href);
      return {
        ...a,
        href,
        categoryName: catInfo?.name ?? a.section,
        categoryIcon: catInfo?.icon ?? "📁",
        categoryDesc: catInfo?.desc ?? "",
      };
    });
  }, [articles]);

  /* Filter by title OR URL path */
  const filteredArticles = useMemo((): EnrichedArticle[] => {
    const q = browseFilter.trim().toLowerCase();
    if (!q) return enrichedArticles;
    return enrichedArticles.filter((a) =>
      a.title.toLowerCase().includes(q) ||
      a.href.toLowerCase().includes(q) ||
      a.slug.toLowerCase().includes(q)
    );
  }, [enrichedArticles, browseFilter]);

  /* Group by category, preserving CATEGORIES order */
  const groupedArticles = useMemo((): GroupEntry[] => {
    const map = new Map<string, GroupEntry>();
    for (const cat of CATEGORIES) {
      map.set(cat.name, { catName: cat.name, icon: cat.icon, desc: cat.desc, items: [] });
    }
    for (const a of filteredArticles) {
      const key = a.categoryName;
      if (!map.has(key)) {
        map.set(key, { catName: key, icon: a.categoryIcon, desc: a.categoryDesc, items: [] });
      }
      map.get(key)!.items.push(a);
    }
    return [...map.values()].filter((g) => g.items.length > 0);
  }, [filteredArticles]);

  async function loadArticleForEdit(entry: EnrichedArticle) {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: entry.section, slug: entry.slug }),
    });
    if (!res.ok) return;
    const { content: loaded } = await res.json();
    setContent(loaded);
    setSlug(entry.slug);
    setSection(entry.section);
    const h1 = loaded.match(/^#\s+(.+)$/m)?.[1]?.replace(/<!--.*?-->/g, "").trim() ?? entry.title;
    setTopic(h1);
    setSelectedCategory(CAT_ORDER.includes(entry.categoryName) ? entry.categoryName : "");
    setIsEditMode(true);
    setMode("new");
    setStep("generate");
    setViewMode("edit");
  }

  const wordCount = useMemo(() => content.trim() ? content.trim().split(/\s+/).length : 0, [content]);
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) return;
    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;
    setIsGenerating(true);
    setContent("");
    setStep("generate");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, section, tone, extraNotes }),
        signal: abort.signal,
      });
      if (!res.ok) {
        const err = await res.text();
        setContent(`> **Cannot generate:** ${err}\n\nAdd \`ANTHROPIC_API_KEY\` to \`.env.local\` and run \`npm run dev\`.`);
        return;
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setContent(acc);
      }
      setSlug(deriveSlug(acc, topic));
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setContent(`> **Error:** ${err.message}`);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [topic, section, tone, extraNotes]);

  const handlePublish = async () => {
    setPublishStatus("saving");
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, slug, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSavedPath(data.path);
      setPublishStatus("done");
      try { localStorage.removeItem(DRAFT_KEY); } catch {}
    } catch {
      setPublishStatus("error");
    }
  };

  const stepIndex = { configure: 0, generate: 1, publish: 2 }[step];

  const categoryHint = selectedCategory
    ? `{ title: "${topic || "Article Title"}", href: "/portal/${section}/${slug || "slug"}" }`
    : null;

  return (
    <div className={s.root}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <Link href="/portal" className={s.backLink}>← Portal</Link>
          <div className={s.titleGroup}>
            <span className={s.badge}>AI</span>
            <h1 className={s.title}>Content Studio</h1>
          </div>
          {hasDraft && mode === "new" && step === "configure" && (
            <span className={s.draftIndicator}>{isEditMode ? "Editing article" : "Draft saved"}</span>
          )}
        </div>

        {/* Mode toggle */}
        <div className={s.modeToggle}>
          <button
            className={`${s.modeBtn} ${mode === "new" ? s.modeBtnActive : ""}`}
            onClick={() => setMode("new")}
          >
            {isEditMode ? "Edit article" : "New article"}
          </button>
          <button
            className={`${s.modeBtn} ${mode === "browse" ? s.modeBtnActive : ""}`}
            onClick={() => setMode("browse")}
          >
            Browse & edit
          </button>
        </div>

        {mode === "new" && (
          <div className={s.stepBar}>
            {(["configure", "generate", "publish"] as Step[]).map((st, i) => (
              <button
                key={st}
                className={`${s.stepItem} ${step === st ? s.stepActive : ""} ${i < stepIndex ? s.stepDone : ""}`}
                onClick={() => { if (i <= stepIndex) setStep(st); }}
                disabled={i > stepIndex}
                style={{ cursor: i <= stepIndex ? "pointer" : "default" }}
              >
                <span className={s.stepNum}>{i + 1}</span>
                <span className={s.stepLabel}>{st}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      <div className={s.main}>

        {/* ── BROWSE MODE ── */}
        {mode === "browse" && (
          <div className={s.browsePane}>

            {/* Search bar + count */}
            <div className={s.browseSearchRow}>
              <div className={s.browseSearchWrap}>
                <span className={s.browseSearchIcon}>⌕</span>
                <input
                  className={s.browseSearch}
                  placeholder="Search by title or URL path…"
                  value={browseFilter}
                  onChange={(e) => setBrowseFilter(e.target.value)}
                  autoFocus
                />
                {browseFilter && (
                  <button className={s.browseClearBtn} onClick={() => setBrowseFilter("")}>×</button>
                )}
              </div>
              {articles.length > 0 && (
                <span className={s.browseTotal}>
                  {browseFilter
                    ? `${filteredArticles.length} of ${articles.length} articles`
                    : `${articles.length} articles`}
                </span>
              )}
            </div>

            {browseLoading && (
              <p className={s.browseHint}>Loading articles…</p>
            )}

            {!browseLoading && articles.length === 0 && (
              <div className={s.browseEmpty}>
                <span className={s.browseEmptyIcon}>📂</span>
                <p>Article list is only available in dev mode.</p>
                <code>npm run dev</code>
              </div>
            )}

            {!browseLoading && articles.length > 0 && filteredArticles.length === 0 && (
              <div className={s.browseEmpty}>
                <span className={s.browseEmptyIcon}>🔍</span>
                <p>No articles match <strong>"{browseFilter}"</strong></p>
                <button className={s.browseClearBtn2} onClick={() => setBrowseFilter("")}>Clear search</button>
              </div>
            )}

            {!browseLoading && groupedArticles.map(({ catName, icon, desc, items }) => (
              <div key={catName} className={s.browseSection}>
                <div className={s.browseSectionLabel}>
                  <span className={s.browseCatIcon}>{icon}</span>
                  <span className={s.browseCatName}>{catName}</span>
                  <span className={s.browseCount}>{items.length}</span>
                </div>
                {desc && !browseFilter && (
                  <p className={s.browseCatDesc}>{desc}</p>
                )}
                <ul className={s.browseList}>
                  {items.map((a) => (
                    <li key={`${a.section}/${a.slug}`}>
                      <button className={s.browseItem} onClick={() => loadArticleForEdit(a)}>
                        <span className={s.browseItemInfo}>
                          <span className={s.browseItemTitle}>{a.title}</span>
                          <span className={s.browseItemPath}>{a.href}</span>
                        </span>
                        <span className={s.browseItemEdit}>Edit →</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* ── NEW / EDIT MODE ── */}
        {mode === "new" && (

          <>
            {/* Step 1: Configure */}
            {step === "configure" && (
              <div className={s.configPane}>
                <div className={s.configHeader}>
                  <h2 className={s.paneTitle}>
                    {isEditMode ? "Edit article settings" : "What should this article explain?"}
                  </h2>
                  {hasDraft && (
                    <button className={s.clearDraftBtn} onClick={clearDraft}>
                      {isEditMode ? "Cancel edit" : "Clear draft"}
                    </button>
                  )}
                </div>

                {!isEditMode && (
                  <div className={s.templates}>
                    {TEMPLATES.map((t) => (
                      <button key={t} className={s.templateBtn} onClick={() => setTopic(t)}>{t}</button>
                    ))}
                  </div>
                )}

                <div className={s.field}>
                  <label className={s.label}>Topic / description</label>
                  <textarea
                    className={s.textarea}
                    placeholder="e.g. How to set up multi-currency for a dealer account"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                    autoFocus
                  />
                  <div className={s.fieldHint}>{topic.length > 0 ? `${topic.length} chars` : "Describe the topic clearly for better results"}</div>
                </div>

                <div className={s.row}>
                  <div className={s.field}>
                    <label className={s.label}>Section (folder)</label>
                    <select className={s.select} value={section} onChange={(e) => setSection(e.target.value)}>
                      {SECTIONS.map((sec) => (
                        <option key={sec.value} value={sec.value}>{sec.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className={s.field}>
                    <label className={s.label}>Style</label>
                    <select className={s.select} value={tone} onChange={(e) => setTone(e.target.value)}>
                      {TONES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={s.field}>
                  <label className={s.label}>Extra notes <span style={{ fontWeight: 400, color: "#94a3b8" }}>(optional)</span></label>
                  <input
                    className={s.input}
                    placeholder="e.g. Focus on agency managers, include a tip about caching"
                    value={extraNotes}
                    onChange={(e) => setExtraNotes(e.target.value)}
                  />
                </div>

                <div className={s.configActions}>
                  {isEditMode ? (
                    <>
                      <button className={s.btnOutline} onClick={() => { setStep("generate"); setViewMode("edit"); }}>
                        Back to editor →
                      </button>
                      <button className={s.btnPrimary} onClick={handleGenerate} disabled={!topic.trim()}>
                        Regenerate
                      </button>
                    </>
                  ) : (
                    <>
                      <button className={s.btnPrimary} onClick={handleGenerate} disabled={!topic.trim()}>
                        Generate Article
                      </button>
                      {content && (
                        <button className={s.btnOutline} onClick={() => setStep("generate")}>
                          Back to draft →
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Generate + Edit */}
            {step === "generate" && (
              <div className={s.generatePane}>
                <div className={s.generateToolbar}>
                  <div className={s.generateInfo}>
                    {isGenerating ? (
                      <span className={s.generatingBadge}><span className={s.dot} />Generating…</span>
                    ) : (
                      <span className={s.doneBadge}>{isEditMode ? "Editing" : "Draft ready"}</span>
                    )}
                    <span className={s.topicLabel}>{topic}</span>
                  </div>
                  <div className={s.toolbarRight}>
                    {!isGenerating && content && (
                      <div className={s.contentStats}>
                        <span>{wordCount} words</span>
                        <span>{readingTime} min read</span>
                      </div>
                    )}
                    <div className={s.tabBar}>
                      <button className={`${s.tab} ${viewMode === "edit" ? s.tabActive : ""}`} onClick={() => setViewMode("edit")}>Edit</button>
                      <button className={`${s.tab} ${viewMode === "split" ? s.tabActive : ""}`} onClick={() => setViewMode("split")}>Split</button>
                      <button className={`${s.tab} ${viewMode === "preview" ? s.tabActive : ""}`} onClick={() => setViewMode("preview")}>Preview</button>
                    </div>
                  </div>
                </div>

                {(viewMode === "edit" || viewMode === "split") && (
                  <div className={s.editorToolbar}>
                    <span style={{ fontSize: 12, color: "#6b7a99", marginRight: 4 }}>Insert:</span>
                    <button className={s.insertBtn} onClick={() => setContent((c) => c + "\n\n![Image description](https://example.com/image.jpg)\n")}>Image</button>
                    <button className={s.insertBtn} onClick={() => setContent((c) => c + '\n\n<iframe src="https://www.youtube.com/embed/VIDEO_ID" width="560" height="315" allowfullscreen></iframe>\n')}>YouTube</button>
                    <button className={s.insertBtn} onClick={() => setContent((c) => c + "\n\n<video src=\"VIDEO_URL\" controls></video>\n")}>Video</button>
                    <div style={{ flex: 1 }} />
                    <button className={`${s.insertBtn} ${copied ? s.insertBtnCopied : ""}`} onClick={handleCopy} disabled={!content}>
                      {copied ? "Copied!" : "Copy markdown"}
                    </button>
                  </div>
                )}

                <div className={`${s.editorArea} ${viewMode === "split" ? s.editorAreaSplit : ""}`}>
                  {viewMode === "preview" ? (
                    <div className={s.mdPreview}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                    </div>
                  ) : viewMode === "split" ? (
                    <>
                      <textarea className={s.mdEditor} value={content} onChange={(e) => setContent(e.target.value)} spellCheck />
                      <div className={`${s.mdPreview} ${s.splitPreview}`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                      </div>
                    </>
                  ) : (
                    <textarea className={s.mdEditor} value={content} onChange={(e) => setContent(e.target.value)} spellCheck />
                  )}
                </div>

                <div className={s.generateActions}>
                  <button className={s.btnOutline} onClick={() => setStep("configure")}>← Settings</button>
                  {!isEditMode && <button className={s.btnOutline} onClick={handleGenerate} disabled={isGenerating}>Regenerate</button>}
                  <button className={s.btnPrimary} onClick={() => setStep("publish")} disabled={isGenerating || !content.trim()}>
                    Save Article →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Publish */}
            {step === "publish" && publishStatus !== "done" && (
              <div className={s.publishPane}>
                <h2 className={s.paneTitle}>Save article</h2>

                <div className={s.publishPreview}>
                  <div className={s.mdPreview}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  </div>
                </div>

                <div className={s.publishForm}>
                  <div className={s.row}>
                    <div className={s.field}>
                      <label className={s.label}>Section (folder)</label>
                      <select className={s.select} value={section} onChange={(e) => setSection(e.target.value)}>
                        {SECTIONS.map((sec) => (
                          <option key={sec.value} value={sec.value}>{sec.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className={s.field} style={{ flex: 2 }}>
                      <label className={s.label}>Filename (slug)</label>
                      <input className={s.input} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="article-slug" />
                    </div>
                  </div>

                  <div className={s.pathPreview}>
                    <code>content/docs/{section}/{slug || "article-slug"}.md</code>
                  </div>

                  {/* Sidebar category picker */}
                  <div className={s.field} style={{ marginTop: 16 }}>
                    <label className={s.label}>
                      Sidebar category <span style={{ fontWeight: 400, color: "#94a3b8" }}>(which section will link to this?)</span>
                    </label>
                    <div className={s.categoryGrid}>
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.name}
                          className={`${s.catPill} ${selectedCategory === cat.name ? s.catPillActive : ""}`}
                          onClick={() => setSelectedCategory(cat.name === selectedCategory ? "" : cat.name)}
                          type="button"
                        >
                          {cat.icon} {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {categoryHint && selectedCategory && (
                    <div className={s.categoryHintBox}>
                      <div className={s.categoryHintLabel}>Add to <strong>data.ts</strong> → {selectedCategory}:</div>
                      <code className={s.categoryHintCode}>{categoryHint}</code>
                    </div>
                  )}

                  <div className={s.publishActions}>
                    <button className={s.btnOutline} onClick={() => setStep("generate")}>← Back to edit</button>
                    <button className={s.btnPrimary} onClick={handlePublish} disabled={publishStatus === "saving" || !slug.trim()}>
                      {publishStatus === "saving" ? "Saving…" : isEditMode ? "Save changes" : "Save to disk"}
                    </button>
                  </div>

                  {publishStatus === "error" && (
                    <p className={s.errorMsg}>Save failed — run the app in dev mode: <code>npm run dev</code></p>
                  )}
                </div>
              </div>
            )}

            {/* Done */}
            {publishStatus === "done" && (
              <div className={s.donePane}>
                <span className={s.doneIcon}>✅</span>
                <h2 className={s.doneTitle}>{isEditMode ? "Article updated!" : "Article saved!"}</h2>
                <p className={s.donePath}><code>{savedPath}</code></p>

                {!isEditMode && (
                  <div className={s.doneSteps}>
                    <p>Next steps to publish:</p>
                    <ol>
                      <li>Review the file in your editor</li>
                      <li>
                        {selectedCategory
                          ? <>Add to <code>app/portal/data.ts</code> under <strong>{selectedCategory}</strong>: <code style={{ display: "block", marginTop: 4, wordBreak: "break-all" }}>{categoryHint}</code></>
                          : <>Add it to the sidebar in <code>app/portal/data.ts</code></>
                        }
                      </li>
                      <li><code>git add . && git commit -m &quot;Add: {slug}&quot;</code></li>
                      <li>Push → GitHub Actions deploys automatically</li>
                    </ol>
                  </div>
                )}

                <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
                  <button className={s.btnOutline} onClick={clearDraft}>
                    {isEditMode ? "Done" : "Create another article"}
                  </button>
                  <Link href="/portal" className={s.btnPrimary}>Back to portal</Link>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
