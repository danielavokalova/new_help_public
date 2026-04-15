/**
 * Downloads raw HTML from enhelp.golibe.com for each entry in content-map.json.
 * Output: scripts/import/raw/<slug>.html
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mapPath = path.join(__dirname, "content-map.json");
const outDir = path.join(__dirname, "import", "raw");

const map = JSON.parse(await fs.readFile(mapPath, "utf8"));

await fs.mkdir(outDir, { recursive: true });

for (const page of map.pages) {
  const url = new URL(page.path, map.baseUrl).toString();
  const res = await fetch(url, {
    headers: { "User-Agent": "gol-help-en-scraper/1.0" }
  });
  if (!res.ok) {
    console.error(`FAIL ${res.status} ${url}`);
    continue;
  }
  const html = await res.text();
  const target = path.join(outDir, `${page.slug}.html`);
  await fs.writeFile(target, html, "utf8");
  console.log(`OK ${page.slug} -> ${target}`);
}

console.log("Done.");
