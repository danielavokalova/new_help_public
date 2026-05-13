# FAIL Session 8 – Jak na chytrou práci s daty s AI: od tabulek k insightům
**Datum:** 30. dubna 2026

---

## Obsah session (rekonstrukce z klíčových témat a příkladů)

### Úvod a kontext

Session osmá se věnuje práci s daty za pomoci AI – od základních konceptů až po pokročilé analytické nástroje. Téma navazuje na předchozí moduly o vibe codingu a druhém mozku a rozšiřuje je o datový rozměr.

---

### Strukturovaná vs. nestrukturovaná data

Firemní data lze rozdělit na dvě základní kategorie:
- **Strukturovaná data** – tabulky, databáze, Excel soubory; tvoří přibližně 20 % firemních dat
- **Nestrukturovaná data** – e-maily, záznamy z hovorů, dokumenty, zprávy; tvoří přibližně 80 % firemních dat

Klíčová myšlenka: většina hodnoty leží v nestrukturovaných datech, která dosud nebyla systematicky zpracovávána. AI toto mění – umí pracovat s oběma typy a převádět nestrukturovaná data na insights.

---

### Pyramida dat

Klasická hierarchie dat:

```
        Moudrost
       /        \
    Znalost
   /        \
 Informace
/            \
    Data
```

- **Data** – surová čísla a fakta
- **Informace** – data v kontextu, s významem
- **Znalost** – pochopení vzorců a příčin
- **Moudrost** – schopnost rozhodovat na základě znalostí

AI urychluje pohyb po celé pyramidě – z dat na insights v minutách místo hodin.

---

### Tři generace práce s daty

**1. generace – manuální práce s daty**
- Excel, ruční výpočty, ručně psané reporty
- Pomalé, chybové, závislé na jednom člověku

**2. generace – BI dashboardy**
- Power BI, Tableau, Looker
- Automatizované vizualizace, ale stále rigidní; otázky mimo dashboard nelze snadno zodpovědět
- Vyžaduje IT podporu nebo datové analytiky

**3. generace – konverzační analytika**
- Ptám se přirozeným jazykem: „Kteří zákazníci nekupují déle než 3 měsíce?"
- AI sama najde data, provede analýzu a vrátí odpověď
- Demokratizace dat: každý se může ptát, nejen analytici

---

### Context engineering vs. prompt engineering

Velký trend dneška není jen prompt engineering (jak formulovat otázky), ale **context engineering** – jak připravit, strukturovat a dodat správný kontext AI, aby mohla odvádět kvalitní práci.

Pro práci s daty to znamená:
- Dodat AI metadata o datové sadě (co sloupce znamenají, jaký je kontext)
- Popsat byznys kontext (jsme e-shop, sezónnost, typické vzorce)
- Ukázat příklady očekávaného výstupu

---

### AI jako mozek vs. sval při práci s daty

- **AI jako sval** – mechanické úkoly: přepočítat, přeformátovat, sloučit tabulky, vyčistit data
- **AI jako mozek** – analytické a strategické úkoly: najít vzorce, generovat hypotézy, interpretovat výsledky, navrhovat akce

Filipova analýza 308 Cursor konverzací přes API ukázala: 70 % použití bylo „sval" (mechanické úkoly), 30 % bylo „mozek" (analytické myšlení). Analýza trvala 18 minut a stála přibližně 1 dolar.

---

### Správný nástroj pro správný objem dat

Výběr nástroje závisí na objemu a typu dat:

| Objem / typ | Doporučený nástroj |
|---|---|
| Malý soubor, jednorázová otázka | Chatbot (Claude, ChatGPT) – stačí vložit data do chatu |
| Větší soubor, opakovaná práce | Claude Cowork, Microsoft Copilot (Analyst) |
| Komplexní analýza, vlastní kód | Cursor, Claude Code, Streamlit |
| Enterprise, velké objemy | Keboola, Power BI, Dextra |

---

### Jednorázová vs. pravidelná práce s daty

Klíčové rozhodnutí při každém datovém úkolu:

- **Jednorázová analýza** – stačí hodit data do chatu a ptát se; není třeba budovat systém
- **Pravidelná práce** – vyplatí se investovat do automatizace; skript, napojení na zdroj dat, opakovaný workflow

Příklad: měsíční report prodejů – první měsíc udělejte s AI manuálně, druhý měsíc nechte AI napsat skript, který to udělá automaticky.

---

### Hodnota konverzací jako datového zdroje

Největší nevyužitý datový zdroj ve firmách jsou konverzace – záznamy z hovorů, e-maily, zápisky z porad, zprávy v týmových chatech.

> „Největší hodnota dnes leží v našich konverzacích."

AI umí tyto nestrukturované zdroje zpracovat, kategorizovat, analyzovat sentiment, extrahovat akční body a identifikovat vzorce.

---

### Filipovy příklady z praxe

**Analýza FAIL portálu v Cursoru**
- Filipova segmentace uživatelů portálu
- Výsledek: Champions 30 %, aktivní 35 %, pasivní, spící 12 %
- Použit Cursor pro přímou práci s lokálními daty

**Analýza 308 Cursor konverzací přes API**
- Cíl: pochopit, jak účastníci používají AI (mozek vs. sval)
- Volání Anthropic API na každou konverzaci, kategorizace
- Výsledek: 70 % sval, 30 % mozek; hotovo za 18 minut, cena ~$1
- Závěr: většina lidí zatím používá AI primárně mechanicky

**Výkaz zisků a ztrát v Claude Opus**
- Filip nahrál výkaz do Claude Opus
- AI analyzovala trendy, navrhla hypotézy a oblasti k prozkoumání
- Rychlá finanční analýza bez nutnosti datového analytika

---

### Příklady z komunity

**Martin Brandýský – AI helpdesk s knowledge base v Zendesku**
- Zákaznická podpora napojená na znalostní bázi
- AI odpovídá na dotazy zákazníků s využitím interní dokumentace
- Dramatické snížení počtu manuálně zodpovídaných ticketů

**Pavel Šebesta – optimalizace výroby broušením**
- Výrobní data a parametry broušení
- AI analyzovala data a navrhla optimální parametry
- Výsledek: z hodin analýzy na 2 minuty

**Radek Juroška (Kofola) – systém pro zpracování zápisů z porad**
- Workflow: Apps Script + Gemini → Obsidian
- Automatické zpracování zápisů z porad do strukturovaných poznámek
- Propojení s týmovým druhým mozkem

**Simona B. – automatizované výběrové řízení**
- Google Forms + váhový systém
- AI hodnotí odpovědi kandidátů podle předem definovaných kritérií s váhami
- Výrazná úspora času HR týmu

**Domácí úkol z minulého ročníku – analýza osobních financí**
- Účastníci analyzovali vlastní bankovní výpisy pomocí AI
- Typický výsledek: překvapivé insights o struktuře výdajů

---

### Přehled nástrojů pro práci s daty

| Nástroj | Kategorie | Poznámka |
|---|---|---|
| Excel + Copilot | Tabulkový procesor + AI | Dostupné v Microsoft 365; přirozený jazyk v Excelu |
| Excel + Claude doplněk | Tabulkový procesor + AI | Integrace Clauda přímo do Excelu |
| Google Sheets + AI | Tabulkový procesor + AI | Gemini integrace; Appscript automatizace |
| Claude Opus | Chatbot | Nejlepší na komplexní analýzu dokumentů a dat |
| ChatGPT Thinking/Pro | Chatbot | Reasoning modely na složité datové problémy |
| Claude Cowork | Pokročilý chatbot | Práce s lokálními soubory a složkami |
| Microsoft Copilot (Researcher/Analyst) | Pokročilý asistent | Analyst mode pro datové analýzy |
| Cursor | Kódovací nástroj | Agentský přístup; ideální pro vlastní datové skripty |
| Claude Code | Kódovací nástroj | Přímé API volání a kódování datových pipeline |
| Streamlit | Vizualizace / aplikace | Rychlé prototypy datových dashboardů v Pythonu |
| Anthropic API | API | Volání modelů programaticky; analýza velkých datasetů |
| Deep Research | Funkce chatbotů | Průzkum datových témat z internetu |
| Zendesk + AI | Helpdesk | Martin Brandýský: zákaznická podpora s knowledge base |
| Apps Script + Gemini | Automatizace | Radek Juroška: zpracování zápisů z porad |
| Obsidian | Znalostní báze | Cíl pipeline Radka Jurošky |
| Keboola | Enterprise data | ETL a datové pipeline pro větší firmy |
| Dextra | Enterprise data | Česká datová platforma |
| Power BI | BI dashboard | 2. generace; stále relevantní pro vizualizace |

---

### Klíčové citáty

> „Data jsou ropa. Nicméně, pokud s tou ropou nic neděláte, tak nepřináší hodnotu."

> „Čistá data neexistují."

> „Největší hodnota dnes leží v našich konverzacích."

> „Velký trend není jenom prompt engineering, ale také context engineering."

---

*Konec přepisu / rekonstrukce obsahu session 8*
