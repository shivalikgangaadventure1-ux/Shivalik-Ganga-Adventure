import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { toHTML, uriLooksSafe } from "@portabletext/to-html";
import type { PortableTextBlock } from "@portabletext/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** False until the Sanity project is configured, so the site still builds from local markdown. */
export const isSanityConfigured = Boolean(projectId);

const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      useCdn: true,
    })
  : null;

const builder = isSanityConfigured ? imageUrlBuilder({ projectId: projectId!, dataset }) : null;

interface SanityImage {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
}

export function sanityImageUrl(image: SanityImage, width: number): string {
  if (!builder) return "";
  return builder.image(image).width(width).auto("format").fit("max").url();
}

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

export function portableTextToHtml(blocks: PortableTextBlock[]): string {
  return toHTML(blocks, {
    components: {
      types: {
        image: ({ value }: { value: SanityImage }) => {
          if (!value?.asset?._ref) return "";
          const alt = escapeHtml(value.alt ?? "");
          const caption = value.caption ? `<figcaption>${escapeHtml(value.caption)}</figcaption>` : "";
          return `<figure><img src="${sanityImageUrl(value, 1200)}" alt="${alt}" loading="lazy" decoding="async" />${caption}</figure>`;
        },
      },
      marks: {
        link: ({ children, value }) => {
          const href: string = value?.href ?? "";
          const safe = href.startsWith("/") || uriLooksSafe(href);
          if (!safe) return children;
          const external = /^https?:\/\//.test(href);
          const rel = external ? ' rel="noopener noreferrer"' : "";
          return `<a href="${escapeHtml(href)}"${rel}>${children}</a>`;
        },
      },
    },
  });
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
