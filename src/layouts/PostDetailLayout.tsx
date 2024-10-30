import PostContent from '@/components/post/PostContent';
import TocContent from '@/components/post/TocContent';
import PostHeader from '@/components/post/PostHeader';
import Giscus from '@/components/post/Giscus';
import { Post, TocItem } from '@/types';

interface PostDetailProps {
  post: Post;
  toc: TocItem[];
}

const PostDetail = async ({ post, toc }: PostDetailProps) => {
  return (
      <div className='w-full max-w-[1200px] relative flex flex-col p-10'>
        <div className='w-full flex justify-center'>
          <PostHeader post={post} />
        </div>
        <div className='flex xl:justify-between justify-center gap-10 w-full max-w-[1200px]'>
          <article className='prose dark:prose-invert w-full max-w-[900px] mt-10'>
            <PostContent post={post} />
            <Giscus />
          </article>
          <div className='hidden xl:block mt-20'>
            <TocContent toc={toc} />
          </div>
        </div>
      </div>
  );
};

export default PostDetail;
