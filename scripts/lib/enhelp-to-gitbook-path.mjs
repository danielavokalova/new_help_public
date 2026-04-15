/**
 * Map public enhelp.golibe.com paths to GitBook content paths (no .md).
 * @param {string} pathname - e.g. /5.-gol-ibe-faqs/how-to-handle-bookings-in-gol-ibe
 * @returns {string | null}
 */
export function enhelpPathToGitbookContentPath(pathname) {
  const clean = pathname.split("?")[0].replace(/^\/+|\/+$/g, "");
  const parts = clean.split("/").filter(Boolean);
  if (!parts.length) return null;

  const remapFirst = {
    "2.-gol-ibe-basic-settings": ["1.-gol-ibe", "3.-gol-ibe-basic-settings"],
    "3.-gol-ibe-advanced-settings": ["1.-gol-ibe", "4.-gol-ibe-advanced-settings"],
    "4.-gol-ibe-step-by-step": ["1.-gol-ibe", "2.-gol-ibe-step-by-step"],
    "5.-gol-ibe-faqs": ["1.-gol-ibe", "5.-gol-ibe-faqs"]
  };

  const r = remapFirst[parts[0]];
  if (r) {
    return [...r, ...parts.slice(1)].join("/");
  }
  if (parts[0] === "1.-gol-ibe") {
    return parts.join("/");
  }
  return ["1.-gol-ibe", ...parts].join("/");
}
