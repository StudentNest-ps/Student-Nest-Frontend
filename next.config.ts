import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/sn/:path*',
        destination: `${process.env.NEXT_PUBLIC_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
