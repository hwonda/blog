import { withMicrofrontends } from '@vercel/microfrontends/next/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/blog/:path*', destination: '/:path*' },
      { source: '/blog/images/:path*', destination: '/images/:path*' }
    ]
  },
};

export default withMicrofrontends(nextConfig);