# Session 7 – Vibe Coding: Realizace nápadů s pomocí AI

**Řečník:** Filip Dřímalka
**Program:** Future AI Leader (FAIL) – 11. běh
**Datum:** 24. dubna 2026 (sedmá session programu)

---

## Rychlé shrnutí

Sedmá session je věnována vibe codingu – způsobu tvorby aplikací, webů a digitálních nástrojů pomocí AI bez nutnosti být programátor. Filip vysvětluje principy, přínosy i rizika vibe codingu, ukazuje konkrétní příklady ze své praxe a tři účastníci (Vladka, Jindra, Tomáš) live sdílejí vlastní projekty. Klíčová myšlenka: vibe coding není jen o produktivitě, ale o digitalizaci procesů a tvorbě nových produktů – AI programuje systémy, které pak dělají práci za nás. Session zahrnuje i přehled nástrojů (od jednoduchých webových platforem po pokročilé kódovací nástroje) a pět fází vibe coding projektu.

---

## Klíčová témata

- Co je vibe coding a proč je to nová programátorská superschopnost
- Přínosy a rizika vibe codingu (bezpečnost, škálovatelnost, technický dluh, údržba)
- Tři kategorie use casů: interní věci, platící zákazníci, kritické systémy
- Přehled nástrojů: webové platformy vs. asistovaný vývoj vs. specializované nástroje
- Pět fází projektu: příprava → design → prototyp → interní nasazení → produkce
- Liveshow: příklady projektů od účastníků programu
- Novinky: ChatGPT 5 (GPT-5), Codex, nový model pro generování obrázků
- Avízo: speciální session o nasazování (GitHub, Vercel, Supabase)

---

## Klíčové myšlenky

### Vibe coding – nová dovednost pro každého
Termín „vibe coding" přinesl Andrej Karpathy (spoluzakladatel OpenAI): jde o nový druh programování, kdy AI dostane zadání a člověk kontroluje výstupy a orchestruje práci – „zapomeneme na to, že kód existuje." Zakladatel Replitu mluví o „just-in-time software" – naprogramujeme si přesně to, co zrovna potřebujeme, rychle a levně. Vibe kódují děti i senioři. Za dvě minuty a za pár dolarů lze postavit nástroj, který by dříve trval týdny.

### Tři velké příležitosti pro byznys
1. **Prototypování** – první verze čehokoliv lze postavit za hodiny; firmy si mohou ověřit nápad dříve, než zaplatí za vývoj
2. **Digitalizace** – AI bude programovat systémy, které dělají práci za lidi; nejvyšší nárůst produktivity nepřijde tím, že AI přebere část naší práce, ale tím, že naprogramuje nástroje, které ji dělají automaticky
3. **Nové produkty a služby** – dodavatelé mohou obohatit své služby o digitální vrstvu; kdo to neudělá, nebude konkurenceschopný

### Tři kategorie vibe coding projektů
| Kategorie | Popis | Riziko |
|---|---|---|
| **Interní věci** | Experimenty, formuláře, kalkulačky, interní nástroje | Nízké – doporučeno začít zde |
| **Pro zákazníky** | Platící zákazníci, napojení na systémy | Střední – konzultovat, být opatrný |
| **Kritické systémy** | Produkční kód, existující platforma | Vysoké – musí dělat zkušení programátoři |

### Rizika vibe codingu
- **Bezpečnost** – AI generuje kód, kterému nerozumíte; mohou uniknout data
- **Škálovatelnost** – aplikace funguje pro 5 lidí, ale padá pro 150
- **Technický dluh** – složitý nekontrolovaný kód, který se obtížně udržuje
- **Údržba** – postavit je dnes snadné; udržovat je výzva
- **Klesající radost z práce** – první verze je euforická, komplexita přináší frustraci
- Řešení: mít v týmu aspoň jednoho power usera; konzultovat s programátory; řešit rizika od prvního dne

### Co říká Filip o svém setupu
- Cursor jako primární nástroj pro agentský vývoj
- Náklady na tokeny: základní znalostní pracovník min. $90/měsíc, Filip překročil $2000/měsíc při stavbě portálu
- Rozcestník zaheslovaných projektů na jedné doméně – pro sdílení s klienty
- Prezentace, interní nástroje, nabídky zákazníkům – vše vibe kódované

### Co říkají účastníci (live ukázky)

**Vladka** – Vzdělávací portál pro zaměstnance (pedagogové, vědci, projekťáci)
- Mini aplikace: testování relevance studijního předmětu, asistenti pro orientaci v kurzu
- Postup: Deep Research → NotebookLM → Cursor + GitHub; prompty vyladěné vlastním asistentem

**Jindra** – Systém pro správu účtenek (OSVČ)
- Kompletní workflow: foto účtenky z mobilu nebo Telegramu → Google Drive → AI vyčtení dat (Gemini 3 Light) → schválení → CSV export pro účetní
- Kombinuje: Macaly → Antigravity → Cursor; Google Apps Script; Telegram bot
- Náklady na AI vyčtení: halíře za dokument

**Tomáš** – Prototyp aplikace „do práce na kole" (BI projekt)
- Postup: export e-mailů za 2 roky → přepársování do Markdown → Claude Opus vygeneroval PRD → vývoj ve VS Code + GitHub Copilot
- Klíčový insight: zadání vygenerované ze starých konverzací bylo překvapivě přesné a smysluplné

---

## Praktické tipy

- **Začněte s interními věcmi** – experimenty bez rizika; každý by si měl vyzkoušet aspoň jednu věc
- **PRD jako základ** – nechte AI vytvořit Product Requirements Document z vašeho zadání; investice 5 minut do přípravy ušetří hodiny iterace
- **Deep Research před vývojem** – prozkoumejte existující aplikace, jejich funkce a designové vzory; výsledek použijte jako součást zadání
- **Screenshoty jako kontext** – chcete podobnou funkcionalitu? Nahrajte screenshoty existující aplikace a AI ji napodobí
- **Diktujte při testování prototypu** – místo psaní procházejte aplikaci a diktujte, co chcete změnit
- **Nejlepší model na začátku** – na první verzi použijte nejinteligentnější model; méně zkušeností = potřeba chytřejšího modelu
- **Rozcestník projektů** – mějte na jednom místě všechny aplikace a weby, které chcete sdílet s klienty
- **Skills (dovednosti)** – stahujte a sdílejte hotové AI dovednosti; dají se přímo aplikovat do vlastního systému
- **Systematizujte od druhého projektu** – jakmile chcete sdílet více projektů, nastavte systém; jinak vzniká chaos
- **Hackathon pro zpětnou vazbu** – při stavbě nového systému pozvěte budoucí uživatele, postavte první verzi živě a iterujte v reálném čase

---

## Nástroje a technologie

| Nástroj | Kategorie | Popis |
|---|---|---|
| **Macaly** | Webová platforma | Nejjednodušší start; účastníci FAIL mají kredit zdarma |
| **Lovable** | Webová platforma | Uživatelsky přívětivý vibe coding nástroj |
| **Replit** | Webová platforma | Celé prostředí v prohlížeči; databáze, hosting i chat |
| **Google AI Studio** | Webová platforma | Umí naprogramovat aplikaci přímo s AI funkcionalitou uvnitř |
| **Cursor** | Asistovaný vývoj | Agentský přístup; pracuje s lokálními soubory a složkami |
| **Claude Code** | Asistovaný vývoj | Alternativa k Cursoru; ekonomičtější při intenzivním použití |
| **Codex (OpenAI)** | Asistovaný vývoj | Pro firmy s ChatGPT Enterprise; GPT-5 přináší velký skok kvality |
| **VS Code + GitHub Copilot** | Asistovaný vývoj | Standard v korporátním prostředí |
| **Antigravity** | Asistovaný vývoj | Alternativa k Cursoru; lze přepínat za běhu |
| **Claude Design** | Specializovaný nástroj | Analýza a návrh designového systému z screenshotů |
| **GitHub** | Hosting / správa kódu | Správa kódu; Vladka hostuje přímo z GitHubu |
| **Vercel** | Hosting | Doporučené nasazení pro soukromé projekty |
| **Supabase** | Databáze | Řešení pro databázovou vrstvu |
| **ChatGPT 5 / GPT-5** | AI model | Nový flagship model OpenAI; silný na programování i analýzu |
| **Google Apps Script** | Automatizace | Jindra: automatické stahování e-mailových účtenek |
| **Telegram Bot** | Integrace | Jindra: vyfotit účtenku → automatické zpracování |
| **Gemini 3 Light** | AI model | Levné vyčtení dat z dokumentů; halíře za dokument |

---

## Citace

> „Já jsem před dvěma lety zakončil komentář větou, že bychom se měli začít připravovat na svět bez programátorů, ve kterém budou programátory úplně všichni."

> „Andrej Karpathy říká: Zapomeneme na to, že kód existuje."

> „Přichází doba just-in-time softwaru – někdo udělal kopii Typeformu za dvacet minut a za tři padesát, protože to zrovna potřeboval."

> „Ten nejvyšší nárůst produktivity bude v tom, že AI bude programovat systémy, které budou dělat práci za nás."

> „Ne to postavit, ale udržovat – to je dnes největší výzva."

> „Vibe může znamenat: Velmi neefektivní, ale zábavné."

> „Profesionálové, kteří budou mít tyto dovednosti – Builders – budou klíčoví."

---

## Pojmy

| Pojem | Vysvětlení |
|---|---|
| **Vibe coding** | Způsob tvorby aplikací pomocí AI; zadáváme záměr, AI programuje, my kontrolujeme výstupy |
| **Just-in-time software** | Aplikaci si naprogramujeme přesně tehdy, kdy ji potřebujeme, rychle a levně |
| **PRD** | Product Requirements Document – strukturované zadání pro AI nebo programátory; základ každého projektu |
| **Agency / Efficacy** | Chuť a sebedůvěra pouštět se do věcí; klíčový předpoklad pro vibe coding |
| **Technický dluh** | Nahromaděný nekvalitní nebo neudržovatelný kód; u vibe codingu vzniká rychle bez kontroly |
| **Prototyp** | První funkční verze aplikace; základ pro iteraci a sběr zpětné vazby |
| **Power user** | Pokročilý uživatel AI nástrojů v týmu; most mezi byznysem a IT |
| **Builder** | Profesionál schopný vibe kódovat a digitalizovat procesy; klíčová role budoucnosti |
| **Skill / Dovednost** | Sdílitelná AI instrukce nebo prompt, který rozšiřuje schopnosti asistenta |
| **Hackathon** | Intenzivní workshop, kde se v reálném čase staví prototyp a sbírá zpětná vazba od uživatelů |

---

## Domácí úkoly

- Navibe kódujte aspoň jednu věc do úterý (speciální session o nasazování)
- Vyzkoušejte Macaly s kreditem zdarma nebo Google AI Studio; začněte s interním use casem
- Stáhněte ID file z portálu a vložte ho do své AI jako průvodce vibe codingem
- Identifikujte jeden proces ve své práci, který by šel digitalizovat pomocí vibe codingu
- Příští speciální session (úterý): GitHub, Vercel, Supabase – jak dát projekt do světa
- Příští páteční session: Práce s daty s pomocí AI (Excel, datové analýzy, insights)

---

## Propojení s dalšími moduly

- **Session 3 (Symbioza s AI)** – Vibe Working jako rozšíření principu „zadávám, koordinuji, AI realizuje"
- **Session 4 (Druhý mozek)** – kontext a dokumentace jako základ dobrého vibe coding zadání; PRD vychází ze znalostní báze
- **Session 6 (Projektové řízení)** – příprava, prototyp, řetězení workflow, compound – vše se propojuje i při vibe codingu
- **Speciální session – Rozjeďte svůj vibe projekt** – GitHub, Vercel, Supabase; nasazení do světa
- **Session 8 (Práce s daty)** – přímé navázání; vibe coding umožňuje stavět vlastní datové aplikace a dashboardy

---

*Zpracováno ze záznamu sedmé session programu Future AI Leader (24. dubna 2026)*
