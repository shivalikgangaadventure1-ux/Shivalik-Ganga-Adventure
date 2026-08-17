import type { MetadataRoute } from "next";
import { COMPANY } from "@/constants/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${COMPANY.url}/sitemap.xml`,
  };
}
