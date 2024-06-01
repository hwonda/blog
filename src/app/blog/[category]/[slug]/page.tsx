import { getPostDetail, parsePostAbstract } from '@/src/utils/postUtils';
import { getPostPaths } from '@/src/utils/fileUtils';

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
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </>
  );
};

export default PostDetail;
