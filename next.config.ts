import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "https://webinar-fundeb-apm.vercel.app",
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
