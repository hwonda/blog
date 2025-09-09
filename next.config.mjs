import { withMicrofrontends } from '@vercel/microfrontends/next/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/blog/_next/:path*',   destination: '/_next/:path*' },
        { source: '/blog/images/:path*',  destination: '/images/:path*' },
        { source: '/blog/posts/:path*',   destination: '/posts/:path*'  },
        { source: '/blog/rss/:path*',  destination: '/rss/:path*' },
      ],
      // 나머지 모든 페이지/데이터
      fallback: [
        { source: '/blog/:path*', destination: '/:path*' },
      ],
    }
  },
};

export default withMicrofrontends(nextConfig);