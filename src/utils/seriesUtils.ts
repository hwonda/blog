import path from 'path';
import { sync } from 'glob';
import { ABSOLUTE_POSTS_PATH } from './fileUtils';
import { parsePost } from './postUtils';
import { Series, SeriesMetadata, SeriesCard, Post } from '@/types';
import fs from 'fs/promises';

const seriesBasePath = path.join(ABSOLUTE_POSTS_PATH, 'Series');

/**
 * 모든 시리즈 슬러그(디렉토리 이름)를 조회합니다.
 */
export const getSeriesSlugs = (): string[] => {
  const pattern = path.join(seriesBasePath, '*', 'index.json').replace(/\\/g, '/');
  const indexFiles = sync(pattern);
  return indexFiles.map((filePath) => {
    const parts = filePath.split('/');
    return parts[parts.length - 2];
  });
};

/**
 * 특정 시리즈의 메타데이터를 로드합니다.
 */
export const getSeriesMetadata = async (seriesSlug: string): Promise<SeriesMetadata> => {
  const indexPath = path.join(seriesBasePath, seriesSlug, 'index.json');
  const content = await fs.readFile(indexPath, 'utf-8');
  return JSON.parse(content) as SeriesMetadata;
};

/**
 * 특정 시리즈의 모든 포스트를 순서대로 조회합니다.
 */
export const getSeriesPosts = async (seriesSlug: string): Promise<Post[]> => {
  const seriesDir = path.join(seriesBasePath, seriesSlug);
  const pattern = path.join(seriesDir, '*.mdx').replace(/\\/g, '/');
  const mdxFiles = sync(pattern);
  const posts = await Promise.all(mdxFiles.map(parsePost));
  return posts.sort((a, b) => a.createdDate.localeCompare(b.createdDate));
};

/**
 * 특정 시리즈의 전체 정보를 로드합니다.
 */
export const getSeries = async (seriesSlug: string): Promise<Series> => {
  const metadata = await getSeriesMetadata(seriesSlug);
  const posts = await getSeriesPosts(seriesSlug);
  return {
    ...metadata,
    slug: seriesSlug,
    url: `/blog/series/${ seriesSlug }`,
    posts,
    postCount: posts.length,
  };
};

/**
 * 모든 시리즈를 조회합니다.
 */
export const getAllSeries = async (): Promise<Series[]> => {
  const slugs = getSeriesSlugs();
  return Promise.all(slugs.map(getSeries));
};

/**
 * 모든 시리즈의 카드 정보를 조회합니다.
 */
export const getSeriesCards = async (): Promise<SeriesCard[]> => {
  const allSeries = await getAllSeries();
  return allSeries
    .filter((s) => s.postCount > 0)
    .map((series) => ({
      title: series.title,
      desc: series.desc,
      slug: series.slug,
      url: series.url,
      thumbnail: series.thumbnail,
      postCount: series.postCount,
    }));
};
