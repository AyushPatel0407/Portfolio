import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

// Blog posts are Markdown files in /content/blog. The file name is the URL slug.
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { html: string; headings: { id: string; text: string }[] };

function readPostFile(file: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  const words = content.trim().split(/\s+/).length;
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    // gray-matter turns unquoted YAML dates into Date objects
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
  return { meta, content, draft: data.draft === true };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPostFile)
    .filter((p) => !p.draft)
    .map((p) => p.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = `${slug}.md`;
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(POSTS_DIR, file))) return null;
  const { meta, content, draft } = readPostFile(file);
  if (draft) return null;
  // Posts are committed Markdown, but sanitise anyway so a pasted <script> can never run.
  const html = sanitizeHtml(await marked.parse(content), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "del"]),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, a: ["href", "title", "target", "rel"], h2: ["id"], img: ["src", "alt", "title", "width", "height"], code: ["class"] },
    allowedSchemes: ["https", "mailto"],
    transformTags: {
      h2: (tag, attribs) => ({ tagName: "h2", attribs }),
      a: (tag, attribs) =>
        /^https?:\/\//.test(attribs.href ?? "")
          ? { tagName: "a", attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" } }
          : { tagName: "a", attribs },
    },
    allowedSchemesAppliedToAttributes: ["href", "src"],
  });
  // Give each h2 an id so the post can show a table of contents.
  const headings: { id: string; text: string }[] = [];
  const withIds = html.replace(/<h2>(.*?)<\/h2>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const id = text.toLowerCase().replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { ...meta, html: withIds, headings };
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
