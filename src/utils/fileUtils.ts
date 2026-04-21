import path from 'path';
import { sync } from 'glob';

export const POSTS_BASE_PATH = path.join(process.cwd(), 'posts');
export const ABSOLUTE_POSTS_PATH = POSTS_BASE_PATH;

/**
 * 모든 MDX 파일 경로를 조회합니다.
 * posts/*.mdx (일반 포스트) + posts/Series/**\/*.mdx (시리즈 포스트)
 */
export const getPostPaths = (): string[] => {
  const rootPattern = path.join(ABSOLUTE_POSTS_PATH, '*.mdx').replace(/\\/g, '/');
  const seriesPattern = path.join(ABSOLUTE_POSTS_PATH, 'Series', '**', '*.mdx').replace(/\\/g, '/');

  return [...sync(rootPattern), ...sync(seriesPattern)];
};
