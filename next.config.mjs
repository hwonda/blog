import { withMicrofrontends } from '@vercel/microfrontends/next/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/blog/:path*', destination: '/:path*' },
    ]
  },
};

export default withMicrofrontends(nextConfig);