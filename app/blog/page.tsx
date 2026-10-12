import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { IMAGES } from "@/constants/images";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";
import { BlogCard } from "@/components/cards/BlogCard";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = buildMetadata({
  title: "Rafting Tips & Planning Guides",
  description: "Tips, guides, and planning advice for river rafting in Rishikesh from Shivalik Ganga Adventure.",
  path: "/blog",
});

// Re-fetch from Sanity at most once a minute so new posts appear without a redeploy.
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Blog"
        subtitle="Planning tips, rapid guides, and everything else to know before you raft."
        image={IMAGES.pageHeroes.blog}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
