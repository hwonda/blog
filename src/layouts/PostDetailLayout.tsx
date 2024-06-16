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
    <div className='flex justify-center'>
      <div className='prose dark:prose-invert w-full max-w-[800px] items-center mt-[56px] p-5'>
        <PostHeader post={post} />
        <div className='flex justify-center'>
          <article className='w-full '>
            <PostContent post={post} />
            <TocContent toc={toc} />
          </article>
        </div>
        <Giscus />
      </div>
    </div>
  );
};

export default PostDetail;
