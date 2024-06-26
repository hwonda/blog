import { promises as fs } from 'fs';
import { getPostList } from '../src/utils/postUtils';
import { blogMetadata } from '../src/constants';

(async () => {
  // 경로에 있는 모든 MDX 파일 목록 조회
  const getSitemapPostList = async () => {
    const postLists = await getPostList();
    // 도메인 빨리 사자...
    const baseUrl = blogMetadata.url;
    return postLists.map(({ url }) => ({
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
    }));
  };
  
  const posts = await getSitemapPostList();

  // 사이트맵 XML 생성()
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${posts
      .map(post => `
          <url>
            <loc>${post.url}</loc>
            <lastmod>${post.lastModified.toISOString()}</lastmod>
          </url>
        `)
      .join('')}
    </urlset>`;

  // 사이트맵 파일 생성
  await fs.writeFile('public/sitemap.xml', sitemap);
  console.log('sitemap.xml generated');
})();
