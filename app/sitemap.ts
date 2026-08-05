import type { MetadataRoute } from "next";
import { COMPANY } from "@/constants/config";
import { PACKAGES } from "@/constants/packages";
import { getAllPostSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
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
  const blogRoutes = getAllPostSlugs().map((slug) => `/blog/${slug}`);

  return [...staticRoutes, ...packageRoutes, ...blogRoutes].map((path) => ({
    url: `${COMPANY.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/packages") ? 0.8 : 0.6,
  }));
}
