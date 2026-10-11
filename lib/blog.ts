import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { PortableTextBlock } from "@portabletext/types";
import { escapeText, portableTextToHtml, sanityFetch, sanityImageUrl } from "@/lib/sanity";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  coverImageAlt?: string;
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

function getLocalSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function getLocalPosts(): BlogPostMeta[] {
  return getLocalSlugs().map((slug) => {
    const fileContents = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
    const { data } = matter(fileContents);
    return { slug, ...data } as BlogPostMeta;
  });
}

/* ------------------------------ Sanity ------------------------------ */

interface SanityPostRaw {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage?: { asset?: { _ref?: string }; alt?: string };
  author: string;
  authorTitle?: string;
  tags?: string[];
  body?: PortableTextBlock[];
  faqs?: BlogFaq[];
}

const POST_FIELDS = `
  "slug": slug.current,
  title, excerpt, publishedAt, updatedAt, coverImage, author, authorTitle, tags`;

function toMeta(raw: SanityPostRaw): BlogPostMeta {
  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt,
    coverImage: raw.coverImage ? sanityImageUrl(raw.coverImage, 1600) : "",
    coverImageAlt: raw.coverImage?.alt,
    author: raw.author,
    authorTitle: raw.authorTitle,
    tags: raw.tags ?? [],
  };
}

async function getSanityPosts(): Promise<BlogPostMeta[]> {
  const raw = await sanityFetch<SanityPostRaw[]>(
    `*[_type == "post" && defined(slug.current) && defined(coverImage.asset)] | order(publishedAt desc) {${POST_FIELDS}}`,
  );
  return (raw ?? []).map(toMeta);
}

async function getSanityPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const raw = await sanityFetch<SanityPostRaw>(
    `*[_type == "post" && slug.current == $slug && defined(coverImage.asset)][0] {${POST_FIELDS}, body, faqs}`,
    { slug },
  );
  if (!raw) return undefined;

  const faqs = (raw.faqs ?? []).filter((faq) => faq.question && faq.answer);
  const faqHtml =
    faqs.length > 0
      ? `<h2>Frequently Asked Questions</h2>${faqs
          .map((faq) => `<h3>${escapeText(faq.question)}</h3><p>${escapeText(faq.answer)}</p>`)
          .join("")}`
      : "";

  return {
    ...toMeta(raw),
    contentHtml: portableTextToHtml(raw.body ?? []) + faqHtml,
    faqs,
  };
}

/* --------------------------- Public API --------------------------- */
/* Posts come from Sanity when configured; local markdown posts stay as a
   fallback. If both define the same slug, the Sanity version wins. */

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const sanityPosts = await getSanityPosts();
  const sanitySlugs = new Set(sanityPosts.map((post) => post.slug));
  const localPosts = getLocalPosts().filter((post) => !sanitySlugs.has(post.slug));
  return [...sanityPosts, ...localPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getAllPostSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return (await getSanityPostBySlug(slug)) ?? (await getLocalPostBySlug(slug));
}

async function getLocalPostBySlug(slug: string): Promise<BlogPost | undefined> {
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
