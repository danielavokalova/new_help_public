# Session 8 – Chytrá práce s daty: od tabulek k insightům

**Řečník:** Filip Dřímalka
**Program:** Future AI Leader (FAIL) – 11. běh
**Datum:** 30. dubna 2026 (osmá session programu)

---

## Rychlé shrnutí

Osmá session pojednává o tom, jak AI zásadně mění práci s daty – od manuálního zpracování tabulek přes BI dashboardy až po konverzační analytiku, kde se kdokoliv může přirozeným jazykem ptát na insights z firemních dat. Filip vysvětluje základní koncepty (strukturovaná vs. nestrukturovaná data, pyramida dat), tři generace práce s daty a klíčový rozdíl mezi AI jako mozkem a svalem. Na konkrétních příkladech z vlastní praxe i od účastníků ukazuje, jak dnes lze za minuty a korunky udělat analýzy, které dříve trvaly hodiny nebo dny. Klíčový trend: context engineering – připravit AI správný kontext je důležitější než samotná formulace dotazu.

---

## Klíčová témata

- Strukturovaná vs. nestrukturovaná data a jejich podíl ve firmách
- Pyramida: data → informace → znalost → moudrost
- Tři generace práce s daty: manuální, BI dashboardy, konverzační analytika
- Context engineering vs. prompt engineering
- AI jako mozek vs. AI jako sval
- Správný nástroj pro správný objem a typ dat
- Jednorázová vs. pravidelná práce s daty
- Konverzace jako nejvýznamnější nevyužitý datový zdroj
- Příklady z praxe Filipa a komunity

---

## Klíčové myšlenky

### Strukturovaná vs. nestrukturovaná data
Ve firmách tvoří strukturovaná data (tabulky, databáze, Excel) přibližně **20 %** celkového objemu. Zbývajících **80 %** jsou nestrukturovaná data – e-maily, záznamy z hovorů, zápisky z porad, dokumenty, zprávy v chatech. Většina hodnoty leží právě tam, ale dosud byla špatně přístupná. AI tuto propast překonává a umí pracovat s oběma typy.

### Pyramida dat: od surových čísel k moudrosti
Data sama o sobě nemají hodnotu – teprve v kontextu se stávají informacemi, ze vzorců se stává znalost a ze znalosti moudrost. AI dramaticky zkracuje čas potřebný k pohybu po této pyramidě – analýza, která trvala dny, zvládnutelná za minuty.

> „Data jsou ropa. Nicméně, pokud s tou ropou nic neděláte, tak nepřináší hodnotu."

### Tři generace práce s daty

**1. generace – manuální:** Excel, ruční výpočty, ručně psané reporty. Pomalé, chybové, závislé na konkrétním člověku.

**2. generace – BI dashboardy:** Power BI, Tableau, Looker. Automatizované vizualizace, ale rigidní – otázky mimo dashboard nelze snadno zodpovědět. Vyžaduje IT nebo datové analytiky.

**3. generace – konverzační analytika:** Ptám se přirozeným jazykem a dostávám odpovědi. Demokratizace dat – každý se může ptát, nejen analytici. AI sama najde data, provede analýzu a vrátí insight s doporučením.

### Context engineering – větší trend než prompt engineering
Prompt engineering (jak formulovat dotaz) je jen část rovnice. **Context engineering** – jak připravit, strukturovat a dodat správný kontext – je ještě důležitější. Pro práci s daty to znamená: dodat AI popis sloupců, byznys kontext, typické vzorce a příklady očekávaných výstupů. Čím lepší kontext, tím lepší analýza.

> „Velký trend není jenom prompt engineering, ale také context engineering."

### AI jako mozek vs. AI jako sval
- **Sval** – mechanické úkoly: přepočítat, přeformátovat, sloučit tabulky, vyčistit data, extrahovat hodnoty
- **Mozek** – analytické úkoly: najít vzorce, generovat hypotézy, interpretovat výsledky, navrhovat akce

Filipova analýza 308 Cursor konverzací ukázala: **70 % použití bylo sval, 30 % mozek**. Většina lidí zatím využívá AI primárně mechanicky – přitom mozková část přináší nejvyšší hodnotu. Analýza samotná trvala 18 minut a stála přibližně 1 dolar.

### Správný nástroj pro správný objem dat
Není jeden univerzální nástroj. Rozhodujícím kritériem je objem dat a frekvence použití:

| Situace | Nástroj |
|---|---|
| Malý soubor, jednorázová otázka | Chatbot (Claude, ChatGPT) – stačí vložit data přímo do chatu |
| Větší soubor, opakovaná práce | Claude Cowork, Microsoft Copilot Analyst |
| Vlastní kód, komplexní pipeline | Cursor, Claude Code, Streamlit |
| Enterprise, velké objemy | Keboola, Power BI, Dextra |

### Jednorázová vs. pravidelná práce s daty
Klíčová otázka před každým datovým projektem: budu to dělat jednou, nebo opakovaně? Jednorázová analýza – stačí chat. Pravidelná práce – investujte do automatizace. Doporučený postup: první měsíc udělejte manuálně s AI, druhý měsíc nechte AI napsat skript, který to udělá automaticky.

### Konverzace jako největší nevyužitý datový zdroj
Záznamy z hovorů, e-maily, zápisky z porad, zprávy v týmových chatech – to jsou data, která firmy mají, ale většinou nevyužívají. AI je umí zpracovat, kategorizovat, analyzovat sentiment a extrahovat vzorce.

> „Největší hodnota dnes leží v našich konverzacích."

> „Čistá data neexistují."

---

## Příklady z praxe

### Filipovy vlastní příklady

**Segmentace uživatelů FAIL portálu (Cursor)**
Filipova analýza chování uživatelů portálu odhalila strukturu komunity:
- Champions: 30 %
- Aktivní: 35 %
- Pasivní: zbývající část
- Spící: 12 %

Výsledky použity pro personalizaci komunikace a úpravy programu.

**Analýza 308 Cursor konverzací přes API**
Cíl: pochopit, jak účastníci FAIL skutečně používají AI (mozek vs. sval). Filipův skript zavolal Anthropic API na každou konverzaci a kategorizoval ji. Výsledek za 18 minut a přibližně 1 dolar: 70 % sval (mechanické úkoly), 30 % mozek (analytické myšlení). Insight pro design dalších modulů.

**Výkaz zisků a ztrát v Claude Opus**
Nahrání výkazu do Claudu Opus → rychlá finanční analýza: trendy, hypotézy, oblasti k prohloubení. Alternativa k najímání datového analytika pro jednorázový přehled.

### Příklady z komunity

**Martin Brandýský – AI helpdesk s knowledge base (Zendesk)**
Zákaznická podpora napojená na znalostní bázi v Zendesku. AI odpovídá na dotazy zákazníků s využitím interní dokumentace. Dramatické snížení počtu manuálně zodpovídaných ticketů.

**Pavel Šebesta – optimalizace výroby broušením**
Výrobní data a parametry broušení analyzovala AI a navrhla optimální nastavení. Výsledek: z hodin analýzy na 2 minuty.

**Radek Juroška (Kofola) – systém pro zpracování zápisů z porad**
Workflow: Google Apps Script + Gemini → strukturované zápisky v Obsidianu. Automatické zpracování zápisů z porad napojené na týmový druhý mozek.

**Simona B. – automatizované výběrové řízení**
Google Forms + váhový systém hodnocení odpovědí kandidátů. AI vyhodnocuje podle předem definovaných kritérií s váhami. Výrazná úspora času HR týmu při zachování konzistentního hodnocení.

**Analýza osobních financí (domácí úkol z minulého ročníku)**
Účastníci analyzovali vlastní bankovní výpisy pomocí AI. Typický výsledek: překvapivé insights o struktuře výdajů, které člověk dříve neviděl.

---

## Praktické tipy

- **Začněte jednoduchostí** – malý datový soubor? Vložte ho přímo do chatu. Neplánujte složité řešení dříve, než to vůbec zkusíte.
- **Popište kontext, nejen data** – dejte AI metadata (co sloupce znamenají), byznys kontext a příklady dobrého výstupu; tím zásadně zlepšíte kvalitu analýzy.
- **Hledejte „mozek" použití** – zkuste AI nejen pro mechanické úkoly, ale i pro interpretaci, hypotézy a doporučení akcí; tam je nejvyšší hodnota.
- **Konverzace jsou data** – začněte zaznamenávat a strukturovat zápisky z porad, hovory se zákazníky a interní diskuze; AI z nich umí vytáhnout znalost.
- **Jednorázové vs. opakované** – rozhodněte před startem; teprve při opakované práci investujte do automatizace.
- **Použijte nejlepší model pro analýzu** – Claude Opus nebo ChatGPT Thinking jsou výrazně lepší na komplexní datovou analýzu než rychlé modely.
- **Vyčistěte data s AI** – „čistá data neexistují", ale AI pomůže s identifikací a opravou anomálií rychleji než manuálně.
- **Hackathon přístupu k datům** – jednou za čas věnujte den analýze dat, která máte, ale dosud jste nepoužívali; e-maily, CRM záznamy, zápisky z hovorů.

---

## Nástroje a technologie

| Nástroj | Kategorie | Použití |
|---|---|---|
| **Excel + Copilot** | Tabulky + AI | Přirozený jazyk v Excelu; analýzy bez vzorců |
| **Excel + Claude doplněk** | Tabulky + AI | Claude přímo v Excelu |
| **Google Sheets + AI** | Tabulky + AI | Gemini integrace; Apps Script automatizace |
| **Claude Opus** | Chatbot | Komplexní analýza dokumentů a finančních výkazů |
| **ChatGPT Thinking/Pro** | Chatbot | Reasoning modely na složité datové problémy |
| **Claude Cowork** | Pokročilý chatbot | Práce s lokálními soubory a složkami |
| **Microsoft Copilot (Analyst)** | Pokročilý asistent | Datové analýzy přirozeným jazykem |
| **Microsoft Copilot (Researcher)** | Pokročilý asistent | Průzkum a syntéza dat z interních zdrojů |
| **Cursor** | Kódovací nástroj | Agentský přístup; datové skripty a pipeline |
| **Claude Code** | Kódovací nástroj | API volání; analýza velkých datasetů programaticky |
| **Streamlit** | Vizualizace | Rychlé prototypy datových dashboardů v Pythonu |
| **Anthropic API** | API | Programatické volání modelů; analýza stovek záznamů |
| **Deep Research** | Funkce chatbotů | Průzkum datových témat z internetu nebo interních zdrojů |
| **Zendesk + AI** | Helpdesk | Zákaznická podpora napojená na knowledge base |
| **Apps Script + Gemini** | Automatizace | Zpracování zápisů z porad; propojení Google Workspace |
| **Obsidian** | Znalostní báze | Cíl datového pipeline; strukturované poznámky |
| **Keboola** | Enterprise data | ETL a datové pipeline pro větší firmy |
| **Dextra** | Enterprise data | Česká datová platforma |
| **Power BI** | BI dashboard | 2. generace; vizualizace; stále relevantní |

---

## Citace

> „Data jsou ropa. Nicméně, pokud s tou ropou nic neděláte, tak nepřináší hodnotu."

> „Čistá data neexistují."

> „Největší hodnota dnes leží v našich konverzacích."

> „Velký trend není jenom prompt engineering, ale také context engineering."

---

## Pojmy

| Pojem | Vysvětlení |
|---|---|
| **Strukturovaná data** | Data v definovaném formátu – tabulky, databáze, Excel; ~20 % firemních dat |
| **Nestrukturovaná data** | E-maily, dokumenty, záznamy hovorů, zápisky; ~80 % firemních dat; dosud obtížně zpracovatelná |
| **Pyramida dat** | Hierarchie: data → informace → znalost → moudrost; AI urychluje pohyb nahoru |
| **Konverzační analytika** | 3. generace práce s daty: ptám se přirozeným jazykem, AI analyzuje a odpovídá |
| **Context engineering** | Příprava a strukturování kontextu pro AI; důležitější než samotný prompt |
| **AI jako mozek** | Analytické použití AI: hypotézy, interpretace, doporučení; 30 % využití dle Filipovy analýzy |
| **AI jako sval** | Mechanické použití AI: přepočty, formátování, slučování; 70 % využití dle Filipovy analýzy |
| **Jednorázová analýza** | Stačí chatbot; nepotřebuje automatizaci |
| **Pravidelná analýza** | Vyplatí se investovat do skriptu nebo automatizace |
| **Knowledge base** | Znalostní báze; interní dokumentace napojená na AI pro zákaznickou podporu nebo interní použití |

---

## Domácí úkoly

- Proveďte analýzu dat, která máte a dosud jste nevyužívali (e-maily, CRM záznamy, zápisky z porad)
- Vyzkoušejte nahrát datový soubor přímo do Claude Opus nebo ChatGPT a položte analytickou otázku
- Identifikujte jeden opakovaný datový úkol ve své práci a zamyslete se, zda by šlo automatizovat
- Zkuste přidat kontext (popis sloupců, byznys kontext) k datovému dotazu a porovnejte kvalitu odpovědi
- Příští session: pokračování práce s AI (téma oznámeno v portálu)

---

## Propojení s dalšími moduly

- **Session 2 (Nástroje AI)** – konkrétní chatovací a kódovací nástroje pro práci s daty jsou podmnožinou nástrojů probíraných v session 2
- **Session 4 (Druhý mozek)** – zápisky z porad, dokumenty a e-maily jsou datové zdroje, které druhý mozek sbírá; session 8 ukazuje, jak z nich vytáhnout insights
- **Session 7 (Vibe Coding)** – Streamlit dashboardy, vlastní datové aplikace a skripty jsou přímým výstupem vibe codingu aplikovaného na data
- **Session 3 (Symbioza)** – princip AI jako mozek vs. sval přímopřevzat ze session 3 a aplikován na datový kontext
- **Speciální session (Rozjeďte vibe projekt)** – technické nasazení datových aplikací (GitHub, Vercel, Supabase)

---

*Zpracováno z klíčových témat a příkladů osmé session programu Future AI Leader (30. dubna 2026)*
