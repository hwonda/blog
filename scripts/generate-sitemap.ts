import { promises as fs } from 'fs';
import { getPostList } from '../src/utils/postUtils';
import { blogMetadata } from '../src/constants';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

export const getSitemapURLs = async (): Promise<SitemapURL[]> => {
  const baseUrl = blogMetadata.url;
  const postLists = await getPostList();

  // 카테고리 목록 추출 (중복 제거)
  const categories = [...new Set(postLists.map((post) => post.categoryPublicName))];

  const urls: SitemapURL[] = [
    {
      loc: `${ baseUrl }/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'always',
      priority: 1.0,
    },
    // 각 카테고리 페이지 추가
    ...categories.map((categoryPublicName) => ({
      loc: `${ baseUrl }/blog/${ categoryPublicName }`,
      lastmod: new Date().toISOString(),
      changefreq: 'always',
      priority: 0.9,
    })),
    // 개별 포스트 페이지
    ...postLists.map(({ url, date }) => ({
      loc: `${ baseUrl }${ url }`,
      lastmod: date.toISOString(),
      changefreq: 'always',
      priority: 0.8,
    })),
  ];

  return urls;
};

(async () => {
  const posts = await getSitemapURLs();

  // 사이트맵 XML 생성
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${ posts
    .map((post) => `
          <url>
            <loc>${ post.loc }</loc>
            <lastmod>${ post.lastmod }</lastmod>
            <changefreq>${ post.changefreq }</changefreq>
            <priority>${ post.priority }</priority>
          </url>
        `)
    .join('') }
    </urlset>`;

  // 사이트맵 파일 생성
  await fs.writeFile('public/sitemap.xml', sitemap);
  console.log('sitemap.xml generated');
})();
