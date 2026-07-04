import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fully static export for Vercel serverless — all logic is client-side
  // output: 'export' would work for static hosting, but Vercel handles Next.js natively
  reactStrictMode: true,
  // Allow external images if needed (for preview of images in markdown)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
