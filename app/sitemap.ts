import type { MetadataRoute } from "next";
import { COMPANY } from "@/constants/config";
import { PACKAGES } from "@/constants/packages";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/packages",
    "/destinations",
    "/gallery",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];
  const packageRoutes = PACKAGES.map((pkg) => `/packages/${pkg.slug}`);
  const posts = await getAllPosts();
  const blogRoutes = posts.map((post) => `/blog/${post.slug}`);
  const lastModifiedByPath = new Map(posts.map((post) => [`/blog/${post.slug}`, post.updatedAt ?? post.publishedAt]));

  return [...staticRoutes, ...packageRoutes, ...blogRoutes].map((path) => ({
    url: `${COMPANY.url}${path}`,
    lastModified: lastModifiedByPath.get(path) ?? new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/packages") ? 0.8 : 0.6,
  }));
}
