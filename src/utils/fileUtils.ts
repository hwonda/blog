import path from 'path';
import { sync } from 'glob';

// 상수 파일 분리
export const POSTS_BASE_PATH = '/public/posts';
export const ABSOLUTE_POSTS_PATH = path.join(process.cwd(), POSTS_BASE_PATH);

/**
 * 특정 카테고리 또는 모든 카테고리의 MDX 파일 경로를 조회합니다.
 * @param category - 카테고리 (선택 사항)
 * @returns MDX 파일 경로 목록
 */
export const getPostPaths = (category?: string): string[] => {
  const folder = category || '**';
  return sync(`${ABSOLUTE_POSTS_PATH}/${folder}/**/*.mdx`);
};
