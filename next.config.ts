import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizations for deployment
  reactStrictMode: true,
  
  // Enable SWR (Stale While Revalidate) for API routes
  swcMinify: true,
  
  // PoweredByHeader disabled for security
  poweredByHeader: false,
  
  // Compression
  compress: true,
  
  // Image optimization
  images: {
    unoptimized: true,
  },
  
  // Production source maps (disabled for smaller bundle)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
