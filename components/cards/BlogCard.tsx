import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

export function BlogCard({ post, headingAs: Heading = "h2" }: { post: BlogPostMeta; headingAs?: "h2" | "h3" }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt || post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {new Date(post.publishedAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <Heading className="mt-2 font-heading text-lg font-bold text-heading">{post.title}</Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{post.excerpt}</p>
      </div>
    </Link>
  );
}
