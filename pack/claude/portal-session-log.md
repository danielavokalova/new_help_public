# GOL IBE Help Portal — Session Log & Reference

> Poslední update: 17. 4. 2026  
> Branch: `main` (deploy) + `claude/persist-left-menu-FrC8z` (feature)  
> Live URL: https://danielavokalova.github.io/new_help_public/portal/

---

## Co je tento projekt

Next.js 14 (App Router) help portál pro **GOL IBE Admin Console** — statický export (`output: "export"`) nasazený přes GitHub Actions na GitHub Pages.

**Repozitář:** `danielavokalova/new_help_public`

---

## Architektura

```
app/
  layout.tsx                  ← root layout, jen <ContentWrapper>
  globals.css                 ← globální font, CSS proměnné (--navy, --orange, ...)
  _components/
    ContentWrapper.tsx        ← header pro non-portal stránky, portal dostane children přímo
    ClientRedirect.tsx        ← klient redirect (useEffect + router.replace)
  portal/
    layout.tsx                ← HLAVNÍ: sidebar + context + floating Support button + modal
    page.tsx                  ← přehledová stránka (hero, search, dlaždice, panely)
    data.ts                   ← CATEGORIES, APP_TABS, RELEASE_NOTES
    portal.module.css         ← styly přehledové stránky
    portal-layout.module.css  ← styly sidebaru, articleWrap, categoryView, floating btn
    [section]/[slug]/
      page.tsx                ← server component pro články s generateStaticParams
    admin/
      page.tsx                ← 3-krokový AI Content Studio (Configure → Generate → Save)
      admin.module.css
  [section]/[slug]/page.tsx   ← redirect stub → /portal/[section]/[slug]
  [section]/page.tsx          ← redirect stub → /portal
  api/
    generate/route.ts         ← streaming Claude Sonnet 4.6 (jen v dev módu)
    publish/route.ts          ← zápis .md souboru na disk (jen v dev módu)
components/
  MarkdownBody.tsx            ← ReactMarkdown + rehype-raw (img, video, iframe)
content/docs/                 ← markdown články organizované podle sekcí
.github/workflows/
  github-pages.yml            ← Node.js 22, npm ci, next build, deploy na Pages
```

---

## Design systém — GOL IBE Admin Console styl

### Barvy (CSS proměnné v globals.css)
```css
--navy:        #1a3668   /* hlavní tmavě modrá */
--navy-light:  #e8edf6   /* světle modrá pro hover/active */
--orange:      #e05a00   /* akcent — jen tlačítka + section headings */
--orange-hov:  #c74e00
--bg:          #f0f3f8
--border:      #dde1ea
--text-body:   #2c3e5f
--text-muted:  #6b7a99
```

### Pravidla designu (odvozená z admin console screenshotu)
- **Oranžová POUZE pro:** primární tlačítka, outline Back button, section headings (BROWSE BY TOPIC, MOST VISITED atd.), release verze, plovoucí Support button
- **Navy pro:** veškeré zvýraznění, active stavy v sidebaru, hover stavy, focus rámečky, nadpisy
- **Žádné oranžové bordery** na strukturálních prvcích (sidebar brand border = šedý, karty = bez borderem)
- **Dlaždice:** box-shadow elevation místo rámečků (`0 3px 16px rgba(26,54,104,0.13)`, hover `0 10px 32px rgba(26,54,104,0.20)`)
- **Font:** `system-ui, -apple-system, "Segoe UI", Arial, sans-serif` — konzistentní, včetně nadpisů (`h1–h6 { font-family: inherit }`)
- **Tlačítka:** `border-radius: 5px`, padding `12–13px 24–26px`, font-size 15px
- **Žádné emoji ikony** nikde v UI

### Sidebar active stav
```css
.sidebarItemActive {
  background: #e8edf6;
  border-left: 3px solid #1a3668;  /* navy, NE oranžová */
  color: #1a3668;
  font-weight: 700;
}
```

---

## Klíčové technické detaily

### Trailing slash normalizace (důležité!)
`next.config.mjs` má `trailingSlash: true`, `usePathname()` vrací `/portal/`.  
Vždy normalizovat:
```tsx
const rawPathname = usePathname();
const pathname = rawPathname.replace(/\/$/, "") || "/";
const isPortalRoot = pathname === "/portal";
```

### Sidebar perzistence
- Všechny odkazy na články používají prefix `/portal/` (např. `/portal/getting-started/slug`)
- Stránky pod `/portal/[section]/[slug]/page.tsx` renderují v rámci portal layoutu → sidebar vždy viditelný
- Staré URL bez prefixu (`/getting-started/slug`) přesměrovávají přes `ClientRedirect`

### GitHub Actions — CI/CD
- Node.js **22** (ne 20 — Next.js 16 + Turbopack má problémy s Node 20)
- Spouští se na push do `main`
- Environment `github-pages` musí být schválené v repository settings
- Po push čekat 2–3 minuty, pak `Ctrl+Shift+R` v prohlížeči

### AI Content Studio (`/portal/admin`)
- Funguje **pouze v dev módu** (`npm run dev`) — `output: "export"` vylučuje API routes z buildu
- Vyžaduje `ANTHROPIC_API_KEY` v `.env.local`
- Používá Claude Sonnet (`claude-sonnet-4-6`), streaming přes Anthropic SDK
- Krok 1: Configure (topic, sekce, styl, poznámky)
- Krok 2: Generate + Edit (textarea nebo preview, vložení obrázku/YouTube/videa)
- Krok 3: Save (slug, cesta `content/docs/[section]/slug.md`)

---

## Plovoucí Support button

Přidán v `layout.tsx` jako `position: fixed` — vždy viditelný na všech portal stránkách:
```tsx
<button className={s.floatingSupport} onClick={() => setShowContact(true)}>
  <span className={s.floatingSupportIcon}>?</span>
  Support
</button>
```
Styly: oranžová pilulka, `border-radius: 30px`, `bottom: 28px`, `right: 28px`, `z-index: 250`.

---

## data.ts — struktura

- **CATEGORIES**: 12 kategorií (Agency, Dealers, Customers, Reservations, Prices & Markup, Code Lists, Users, Notifications, Supporting Texts, Statistics, Basic Settings, Advanced Settings) — každá má `href`, `articles[]`, `desc`
- **APP_TABS**: GOL IBE Help (active), Admin Console, TCP, My Travelport, GOL IBE Web — bez emoji
- **RELEASE_NOTES**: duben + březen 2026

---

## Co se dělalo v této session (chronologie)

1. Perzistentní sidebar na všech stránkách (article detail views)
2. Přidání `/portal/` prefixu ke všem href odkazům + redirect stuby pro staré URL
3. AI Content Studio (admin page) s streaming generováním přes Anthropic SDK
4. Podpora obrázků a videí v markdown článcích (`rehype-raw`, custom renderers)
5. Kompletní předesign — navy + oranžová, flat korporátní styl dle admin console screenshotu
6. Odstranění všech emoji ikon
7. Bílý hero místo navy gradientu
8. Box-shadow elevation na kartách místo rámečků
9. Navy active stavy (ne oranžové)
10. Node.js 22 fix v GitHub Actions workflow
11. Plovoucí Support button (pill, fixed bottom-right)
12. Konzistentní font (`h1–h6 { font-family: inherit }`)
13. Search bar na plnou šířku (`max-width: 100%`)
14. Explore → oranžový button s bílým textem na kartičkách
15. Odebrání šipek `↗` ze sidebar app odkazů

---

## Zbývající možná vylepšení (neřešeno)

- Zendesk integrace v Contact Help formuláři (TODO komentář v `layout.tsx`)
- Vyhledávání v reálném čase přes celý content (nyní jen filter přes QUICK_RESULTS)
- Walkthroughs panel (Coming Soon)
- Agency Health Check panel (Coming Soon)
- Mobilní sidebar (hamburger menu)

---

## Příkazy

```bash
npm run dev          # lokální vývoj (API routes fungují)
npm run build        # statický export do out/
npm run lint         # ESLint

# Deploy = push na main → GitHub Actions automaticky
git push origin main
```
