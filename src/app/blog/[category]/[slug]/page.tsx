import { getPostDetail, parsePostAbstract } from '@/src/utils/postUtils';
import { getPostPaths } from '@/src/utils/fileUtils';
import PostContent from '@/src/components/post/PostContent';

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
    <div>
      <article className='mt-[56px]'>
        <PostContent post={post} />
      </article>
    </div>
  );
};

export default PostDetail;
