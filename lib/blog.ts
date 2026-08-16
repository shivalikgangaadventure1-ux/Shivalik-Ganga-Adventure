import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  author: string;
  authorTitle?: string;
  tags: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
  faqs: BlogFaq[];
}

/**
 * Parses the "## Frequently Asked Questions" section (if present) out of the
 * post's raw markdown into structured Q&A pairs, so it can also power
 * FAQPage schema without duplicating the content in frontmatter.
 */
function extractFaqs(markdown: string): BlogFaq[] {
  const sectionMatch = markdown.match(/## Frequently Asked Questions\n\n([\s\S]*?)(?:\n## |$)/);
  if (!sectionMatch) return [];

  return sectionMatch[1]
    .trim()
    .split(/\n\n+/)
    .map((block) => block.match(/^\*\*(.+?)\*\*\n([\s\S]+)$/))
    .filter((match): match is RegExpMatchArray => match !== null)
    .map((match) => ({
      question: match[1].trim(),
      answer: match[2].trim().replace(/\n+/g, " "),
    }));
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const fileContents = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data } = matter(fileContents);
      return { slug, ...data } as BlogPostMeta;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return {
    slug,
    contentHtml: processed.toString(),
    faqs: extractFaqs(content),
    ...(data as Omit<BlogPostMeta, "slug">),
  };
}
