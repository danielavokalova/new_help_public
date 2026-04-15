/**
 * Converts scraped HTML into Markdown under content/docs/<section>/<slug>.md
 * Uses cheerio + turndown; review and edit output before publishing.
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { load } from "cheerio";
import TurndownService from "turndown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mapPath = path.join(__dirname, "content-map.json");
const rawDir = path.join(__dirname, "import", "raw");

const map = JSON.parse(await fs.readFile(mapPath, "utf8"));
const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced"
});

function docsPath(section) {
  return path.join(root, "content", "docs", section);
}

for (const page of map.pages) {
  const src = path.join(rawDir, `${page.slug}.html`);
  let htmlFile;
  try {
    htmlFile = await fs.readFile(src, "utf8");
  } catch {
    console.warn(`SKIP missing ${src}`);
    continue;
  }

  const $ = load(htmlFile);
  const main =
    $("main").first().html() ||
    $("[role='main']").first().html() ||
    $("article").first().html() ||
    $("body").html();

  if (!main) {
    console.warn(`SKIP empty content ${page.slug}`);
    continue;
  }

  let md = turndown.turndown(main);
  md = md.replace(/\n{3,}/g, "\n\n").trim();
  const header = `# ${page.title}\n\n`;
  const out = path.join(docsPath(page.section), `${page.slug}.md`);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, header + md + "\n", "utf8");
  console.log(`OK ${page.slug} -> ${out}`);
}

console.log("Done.");
