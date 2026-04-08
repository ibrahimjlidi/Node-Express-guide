import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizations for deployment
  reactStrictMode: true,
  
  // Image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
