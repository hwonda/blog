import fs from 'fs';
import path from 'path';
import lunr from 'lunr';
import { getSortedPostList } from '../src/utils/postUtils';

/**
 * MDX 콘텐츠에서 마크다운/JSX 문법을 제거하고 순수 텍스트만 추출합니다.
 */
function stripMdx(content: string): string {
  return content
    // JSX/HTML 태그 제거
    .replace(/<[^>]+>/g, ' ')
    // 코드 블록 제거
    .replace(/```[\s\S]*?```/g, ' ')
    // 인라인 코드 제거
    .replace(/`[^`]+`/g, ' ')
    // 이미지 제거
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    // 링크 텍스트만 남기기
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    // 헤딩 마크다운 제거
    .replace(/^#{1,6}\s+/gm, '')
    // bold, italic 마크다운 제거
    .replace(/\*{1,3}(.*?)\*{1,3}/g, '$1')
    .replace(/_{1,3}(.*?)_{1,3}/g, '$1')
    // 수평선 제거
    .replace(/^[-*_]{3,}$/gm, '')
    // blockquote 제거
    .replace(/^>\s+/gm, '')
    // import/export 구문 제거
    .replace(/^(import|export)\s+.*$/gm, '')
    // 연속 공백/줄바꿈 정리
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 한국어 토크나이저 — 유니코드 정규화 및 특수문자 정리
 */
const koTokenizer = (token: lunr.Token) => {
  return token.update((word: string) => {
    return word
      .normalize('NFC')
      .replace(/^[^\w가-힣]+/, '')
      .replace(/[^\w가-힣]+$/, '');
  });
};

lunr.Pipeline.registerFunction(koTokenizer, 'koTokenizer');

async function generateSearchIndex() {
  const posts = await getSortedPostList();

  const documents = posts.map((post, idx) => ({
    id: idx.toString(),
    title: post.title,
    desc: post.desc,
    url: post.url,
    categoryPath: post.categoryPath,
    categoryPublicName: post.categoryPublicName,
    date: post.date,
    dateString: post.dateString,
    thumbnail: post.thumbnail,
    readingTimes: post.readingTimes,
    tags: post.tags,
  }));

  const index = lunr(function (this: lunr.Builder) {
    this.pipeline.reset();
    this.searchPipeline.reset();
    this.pipeline.add(koTokenizer);
    this.searchPipeline.add(koTokenizer);

    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('desc', { boost: 8 });
    this.field('tags', { boost: 6 });
    this.field('content', { boost: 1 });

    posts.forEach((post, idx) => {
      this.add({
        id: idx.toString(),
        title: post.title,
        desc: post.desc,
        tags: post.tags.join(' '),
        content: stripMdx(post.content),
      });
    });
  });

  const output = {
    index: index.toJSON(),
    documents,
  };

  const publicDirectory = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory);
  }

  fs.writeFileSync(
    path.join(publicDirectory, 'search-index.json'),
    JSON.stringify(output),
  );

  console.log(`Search index generated (${ documents.length } posts)`);
}

generateSearchIndex()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error generating search index:', error);
    process.exit(1);
  });
