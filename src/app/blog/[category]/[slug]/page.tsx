import { getPostDetail, parsePostAbstract } from '@/src/utils/postUtils';
import { getPostPaths } from '@/src/utils/fileUtils';
import { parseToc } from '@/src/utils/postUtils';
import PostContent from '@/src/components/post/PostContent';
import TocContent from '@/src/components/post/TocContent';

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
    <div className='mt-[56px] flex justify-center p-5'>
      <article className='w-full max-w-[720px]'>
        <PostContent post={post} />
        <TocContent toc={toc} />
      </article>
    </div>
  );
};

export default PostDetail;
