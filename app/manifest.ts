import type { MetadataRoute } from "next";
import { COMPANY } from "@/constants/config";
import { THEME } from "@/constants/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: COMPANY.shortName,
    description: COMPANY.description,
    start_url: "/",
    display: "standalone",
    background_color: THEME.white,
    theme_color: THEME.primary,
    icons: [
      {
        src: "/images/logo/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
