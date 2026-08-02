import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "html.physcode.com",
        pathname: "/travel/**",
      },
    ],
  },
};

export default nextConfig;
