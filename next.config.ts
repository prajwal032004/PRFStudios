import type { NextConfig } from "next";

// Static export: `npm run build` emits a self-contained site in /out that can be
// uploaded to any host serving prfstudios.in (cPanel, Nginx, Netlify, Vercel, S3…).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
