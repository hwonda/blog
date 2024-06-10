import { getPostDetail, parsePostAbstract } from '@/utils/postUtils';
import { getPostPaths } from '@/utils/fileUtils';
import { parseToc } from '@/utils/postUtils';
import PostDetailLayout from '@/layouts/PostDetailLayout';
import PostContent from '@/components/post/PostContent';
import TocContent from '@/components/post/TocContent';

interface SlugProps {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .map((item) => ({ category: item.categoryPath, slug: item.slug }));
  return paramList;
}

const PostDetail = async ({ params }: SlugProps) => {
  const post = await getPostDetail(params.category, params.slug);
  const toc = parseToc(post.content);
  console.log(toc);

  return (
    <PostDetailLayout post={post} toc={toc} />
  );
};

export default PostDetail;
