import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPosts, getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import { jsonLd } from "@/lib/sanity";
import { getBlogPostingSchema, getBreadcrumbSchema, getFAQPageSchema } from "@/lib/schema";
import { BlogCard } from "@/components/cards/BlogCard";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Re-fetch from Sanity at most once a minute; slugs not known at build time render on demand.
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getAllPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = (await getAllPosts()).filter((other) => other.slug !== post.slug).slice(0, 3);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  const blogPostingSchema = getBlogPostingSchema(post);
  const faqSchema = post.faqs.length > 0 ? getFAQPageSchema(post.faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd(blogPostingSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
        />
      )}

      <PageHero
        title={post.title}
        subtitle={new Date(post.publishedAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container className="mx-auto max-w-3xl">
          <div className="relative mb-6 h-56 w-full overflow-hidden rounded-2xl sm:h-72 md:h-80">
            <Image src={post.coverImage} alt={post.coverImageAlt || post.title} fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" priority fetchPriority="high" />
          </div>
          {post.authorTitle && (
            <p className="mb-8 text-sm text-muted">
              Written by <span className="font-semibold text-heading">{post.author}</span>,{" "}
              {post.authorTitle}
            </p>
          )}
          <article
            className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-heading prose-a:text-primary prose-a:no-underline hover:prose-a:underline sm:prose-base"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </Container>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-light py-16 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Keep Reading" title="More From Our Blog" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} headingAs="h3" />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
