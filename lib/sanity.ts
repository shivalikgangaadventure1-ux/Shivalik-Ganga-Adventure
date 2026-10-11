import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
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

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId: projectId!, dataset }) : null;

interface SanityImage {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
}

export function sanityImageUrl(image: SanityImage, width: number): string {
  if (!builder) return "";
  return builder.image(image).width(width).auto("format").fit("max").url();
}

/**
 * Returns null only when Sanity isn't configured. Network/API errors are
 * deliberately thrown: during ISR revalidation Next.js then keeps serving the
 * last good page instead of caching an empty blog list or a false 404, and a
 * failed build keeps the previous deployment live.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params, { next: { revalidate: 60 } });
}

export function portableTextToHtml(blocks: PortableTextBlock[]): string {
  // Editors often leave stray empty paragraphs; drop them instead of rendering <p></p>.
  const nonEmpty = blocks.filter(
    (block) =>
      block._type !== "block" ||
      (block.children as { text?: string }[] | undefined)?.some((child) => child.text?.trim()),
  );
  return toHTML(nonEmpty, {
    components: {
      types: {
        image: ({ value }: { value: SanityImage }) => {
          if (!value?.asset?._ref) return "";
          const alt = escapeHtml(value.alt ?? "");
          const caption = value.caption ? `<figcaption>${escapeHtml(value.caption)}</figcaption>` : "";
          const size = value.asset._ref.match(/-(\d+)x(\d+)-/);
          const dimensions = size ? ` width="${size[1]}" height="${size[2]}"` : "";
          return `<figure><img src="${sanityImageUrl(value, 1200)}" alt="${alt}"${dimensions} loading="lazy" decoding="async" style="height:auto" />${caption}</figure>`;
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
