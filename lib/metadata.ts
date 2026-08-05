import type { Metadata } from "next";
import { COMPANY } from "@/constants/config";

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function buildMetadata({ title, description, path, image }: PageMetaOptions): Metadata {
  const url = `${COMPANY.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: COMPANY.name,
      title,
      description,
      ...(image && { images: [{ url: image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
