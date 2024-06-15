import { CategoryDetail } from '@/types';
import { getPostList } from './postUtils';
import { sync } from 'glob';
import { ABSOLUTE_POSTS_PATH } from './fileUtils';
/**
 * 카테고리 폴더 이름을 공용 이름으로 변환합니다.
 * @param dirPath - 카테고리 폴더 경로
 * @returns 공용 이름
 */
export const getCategoryPublicName = (dirPath: string) =>
  dirPath
    .split('_')
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');

/**
 * 모든 카테고리 목록을 조회합니다.
 * @returns 카테고리 목록
 */
export const getCategoryList = () => {
  const categoryPaths: string[] = sync(`${ABSOLUTE_POSTS_PATH}/*`);
  return categoryPaths.map((path) => path.split('/').pop());
};

/**
 * 카테고리별 포스트 개수를 포함한 상세 정보를 조회합니다.
 * @returns 카테고리 상세 정보 목록
 */
export const getCategoryDetailList = async (): Promise<CategoryDetail[]> => {
  const posts = await getPostList();
  const categoryCounts: { [key: string]: number } = { all: posts.length };
  posts.forEach(({ categoryPath }) => {
    categoryCounts[categoryPath] = (categoryCounts[categoryPath] || 0) + 1;
  });

  const detailList: CategoryDetail[] = Object.entries(categoryCounts).map(
    ([category, count]) => ({
      dirName: category === 'all' ? '' : category,
      publicName: category === 'all' ? '모든 포스트' : getCategoryPublicName(category),
      count,
    })
  );

  return detailList;
};
