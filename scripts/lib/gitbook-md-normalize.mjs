/**
 * @param {string} text
 */
export function normalizeGitbookMarkdown(text) {
  return text
    .replace(
      /\{%\s*hint[^%]*%\}\s*([\s\S]*?)\s*\{%\s*endhint\s*%\}/gi,
      (_, inner) => {
        const lines = inner.trim().split(/\r?\n/);
        return "\n\n" + lines.map((line) => `> ${line}`).join("\n") + "\n\n";
      }
    )
    .replace(/\n{3,}/g, "\n\n");
}

/** GitBook sometimes embeds HTML blocks inside .md exports. */
export function stripInlineHtmlNoise(text) {
  return text
    .replace(/<figure[\s\S]*?<img[^>]*src="([^"]+)"[^>]*>[\s\S]*?<\/figure>/gi, "\n\n![]($1)\n\n")
    .replace(/<mark[^>]*>([\s\S]*?)<\/mark>/gi, "$1")
    .replace(/&#x20;/g, " ")
    .replace(
      /<([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>/g,
      "[$1](mailto:$1)"
    );
}
