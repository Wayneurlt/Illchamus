// Small, safe Markdown renderer for news posts written in /admin.
// All text is HTML-escaped first, so authors cannot inject markup or scripts.
// Supports: ## and ### headings, paragraphs, - lists, 1. lists, > quotes,
// **bold**, *italic*, [links](https://…) and ![images](/uploads/…) on their own line.

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const safeUrl = (url: string) => (/^(https?:\/\/|mailto:|tel:|\/)/i.test(url) ? url : "#");

function inline(text: string) {
  return escape(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      const href = safeUrl(url.replace(/&amp;/g, "&"));
      const external = /^https?:\/\//i.test(href);
      return `<a href="${escape(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
    });
}

export function renderMarkdown(source: string | undefined) {
  if (!source) return "";
  const blocks = source.replace(/\r\n?/g, "\n").trim().split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.split("\n");
      const image = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(block.trim());
      if (image) {
        return `<figure><img src="${escape(safeUrl(image[2]!))}" alt="${escape(image[1]!)}" loading="lazy" />${image[1] ? `<figcaption>${escape(image[1])}</figcaption>` : ""}</figure>`;
      }
      const heading = /^(#{2,3})\s+(.+)$/.exec(block.trim());
      if (heading && lines.length === 1) return `<h${heading[1]!.length}>${inline(heading[2]!)}</h${heading[1]!.length}>`;
      if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*]\s+/, ""))}</li>`).join("")}</ul>`;
      }
      if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l))) {
        return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\s*\d+[.)]\s+/, ""))}</li>`).join("")}</ol>`;
      }
      if (lines.every((l) => /^>\s?/.test(l))) {
        return `<blockquote>${inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "))}</blockquote>`;
      }
      return `<p>${lines.map(inline).join("<br />")}</p>`;
    })
    .join("\n");
}
