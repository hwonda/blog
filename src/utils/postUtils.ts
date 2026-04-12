import { Post, PostFrontmatter, TocItem } from '@/types';
import fs from 'fs/promises';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import readingTime from 'reading-time';
import path from 'path';
import { getCategoryPublicName } from './categoryUtils';
import {
  ABSOLUTE_POSTS_PATH,
  getPostPaths,
} from './fileUtils';

/**
 * MDX 파일을 파싱하여 포스트의 요약 정보와 상세 정보를 반환합니다.
 * @param postPath - MDX 파일 경로
 * @returns 포스트 객체
 */
export const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);

  // 시리즈 포스트인 경우 시리즈명을 태그에 자동 추가
  let enrichedTags = postDetail.tags;
  if ('seriesSlug' in postAbstract && postAbstract.seriesSlug) {
    try {
      const indexPath = path.join(
        ABSOLUTE_POSTS_PATH, 'Series', postAbstract.seriesSlug, 'index.json',
      );
      const indexContent = await fs.readFile(indexPath, 'utf8');
      const seriesMeta = JSON.parse(indexContent);
      enrichedTags = [...new Set([seriesMeta.title, ...postDetail.tags])];
    } catch {
      // index.json 없으면 기존 태그 유지
    }
  }

  return {
    ...postAbstract,
    ...postDetail,
    tags: enrichedTags,
  };
};

/**
 * MDX 파일 경로를 파싱하여 포스트의 요약 정보를 반환합니다.
 * @param postPath - MDX 파일 경로
 * @returns 포스트 요약 정보 객체
 */
export const parsePostAbstract = (postPath: string) => {
  const relativeFilePath = path
    .relative(ABSOLUTE_POSTS_PATH, postPath)
    .replace(/\\/g, '/')
    .replace('.mdx', '');

  const segments = relativeFilePath.split('/');

  // 시리즈 포스트: Series/[seriesSlug]/[slug]
  if (segments.length === 3 && segments[0] === 'Series') {
    const [, seriesSlug, slug] = segments;
    const url = `/blog/series/${ seriesSlug }/${ slug }`;
    const categoryPublicName = getCategoryPublicName('Series');
    return { url, categoryPath: 'Series', categoryPublicName, slug, seriesSlug };
  }

  const [categoryPath, slug] = segments;
  const url = `/blog/${ categoryPath }/${ slug }`;
  const categoryPublicName = getCategoryPublicName(categoryPath);

  return { url, categoryPath, categoryPublicName, slug };
};

/**
 * MDX 파일을 파싱하여 포스트의 상세 정보를 반환합니다.
 * @param postPath - MDX 파일 경로
 * @returns 포스트 상세 정보 객체
 */
export const parsePostDetail = async (postPath: string) => {
  try {
    const file = await fs.readFile(postPath, 'utf8');
    const { data, content } = matter(file);
    const frontmatter = data as PostFrontmatter;
    const createdDate = dayjs(frontmatter.createdDate).locale('ko').format('YYYY.MM.DD');
    const modifiedDate = frontmatter.modifiedDate
      ? dayjs(frontmatter.modifiedDate).locale('ko').format('YYYY.MM.DD')
      : null;
    const readingTimes = Math.ceil(readingTime(content).minutes);
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];

    return {
      title: frontmatter.title,
      desc: frontmatter.desc,
      thumbnail: frontmatter.thumbnail,
      createdDate,
      modifiedDate,
      content,
      readingTimes,
      tags,
    };
  } catch (error) {
    console.error(`Error reading file ${ postPath }:`, error);
    throw error;
  }
};

/**
 * 모든 포스트 목록을 조회합니다.
 * @param category - 카테고리 (선택 사항)
 * @returns 포스트 목록
 */
export const getPostList = async (category?: string): Promise<Post[]> => {
  const postPaths = getPostPaths(category);
  const posts = await Promise.all(postPaths.map(parsePost));
  return posts;
};

/**
 * 모든 포스트 목록을 날짜 순으로 정렬하여 조회합니다.
 * @param category - 카테고리 (선택 사항)
 * @returns 정렬된 포스트 목록
 */
export const getSortedPostList = async (category?: string): Promise<Post[]> => {
  const posts = await getPostList(category);
  return sortPostsByDate(posts);
};

/**
 * 포스트 목록을 날짜 순으로 정렬합니다.
 * @param posts - 포스트 목록
 * @returns 정렬된 포스트 목록
 */
export const sortPostsByDate = (posts: Post[]) =>
  posts.sort((a, b) => b.createdDate.localeCompare(a.createdDate));

/**
 * 모든 포스트의 개수를 반환합니다.
 * @returns 포스트 개수
 */
export const getAllPostCount = async (): Promise<number> =>
  (await getPostList()).length;

/**
 * 특정 카테고리와 슬러그에 해당하는 포스트의 상세 정보를 조회합니다.
 * @param category - 카테고리 이름
 * @param slug - 포스트 슬러그
 * @returns 포스트 상세 정보
 */
export const getPostDetail = async (
  category: string,
  slug: string,
): Promise<Post> => {
  const filePath = `${ ABSOLUTE_POSTS_PATH }/${ category }/${ slug }.mdx`;
  return await parsePost(filePath);
};

/**
 * MDX 파일의 내용을 파싱하여 목차를 생성합니다.
 * @param content - MDX 파일 내용
 * @returns 목차 아이템 목록
 */
export const parseToc = (content: string): TocItem[] => {
  const regex = /^(##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading) => ({
      text: heading.replace(/^(##|###) /, ''),
      link:
        '#'
        + heading
          .replace(/^(##|###) /, '')
          .replace(/[\[\]:!@#$/%^&*()+=,.]/g, '')
          .replace(/ /g, '-')
          .toLowerCase()
          .replace('?', ''),
      indent: (heading.match(/#/g)?.length || 2) - 2,
    })) || []
  );
};

