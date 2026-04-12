import { promises as fs } from 'fs';
import { getPostList } from '../src/utils/postUtils';
import { getAllSeries } from '../src/utils/seriesUtils';
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
  const allSeries = await getAllSeries();

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
    // 시리즈 목차 페이지
    ...allSeries.map((series) => ({
      loc: `${ baseUrl }/blog/series/${ series.slug }`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.85,
    })),
    // 개별 포스트 페이지
    ...postLists.map(({ url, createdDate, modifiedDate }) => ({
      loc: `${ baseUrl }${ url }`,
      lastmod: new Date((modifiedDate ?? createdDate).replace(/\./g, '-')).toISOString(),
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
