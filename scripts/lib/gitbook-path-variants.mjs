/**
 * GitBook paths in links sometimes use gol-ibe-* segments while exports use shorter names.
 * @param {string} gbPath - path under enhelp-golibe without .md
 * @returns {string[]}
 */
export function expandGitbookPathVariants(gbPath) {
  const rules = [
    ["/gol-ibe-dealers/", "/dealers/"],
    ["/gol-ibe-agency/", "/agency/"],
    ["/gol-ibe-prices/", "/prices/"],
    ["/gol-ibe-code-lists/", "/code-lists/"],
    ["/gol-ibe-supporting-texts/", "/supporting-texts/"],
    ["/gol-ibe-notifications/", "/notifications/"],
    ["/gol-ibe-users/", "/users/"],
    ["/gol-ibe-reservations/", "/reservations/"],
    ["/gol-ibe-statistics/", "/statistics/"]
  ];

  let pool = new Set([gbPath]);
  let prev = 0;
  while (pool.size > prev) {
    prev = pool.size;
    const next = new Set(pool);
    for (const p of pool) {
      for (const [from, to] of rules) {
        if (p.includes(from)) next.add(p.split(from).join(to));
      }
    }
    pool = next;
  }

  const parts = gbPath.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  if (last === "gol-ibe-agency") {
    pool.add(parts.slice(0, -1).concat("agency").join("/"));
  }
  if (last === "gol-ibe-dealers") {
    pool.add(parts.slice(0, -1).concat("dealers").join("/"));
  }

  return [...pool];
}

/** Remove trailing dots from URL pathname segments (broken links in source). */
export function normalizePathnameTrailingDots(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length) {
    parts[parts.length - 1] = parts[parts.length - 1].replace(/\.+$/, "");
  }
  return "/" + parts.join("/");
}
