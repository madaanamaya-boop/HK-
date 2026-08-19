import type { NextConfig } from "next";

// When BUILD_TARGET=pages (used by the GitHub Pages workflow) the app is
// statically exported and served from https://<user>.github.io/HK-/.
// The default build (e.g. Vercel) is unaffected and keeps full SSR + API routes.
const isPages = process.env.BUILD_TARGET === "pages";
const repo = "HK-";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isPages
    ? {
        output: "export",
        images: { unoptimized: true },
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
