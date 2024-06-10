import PostContent from '@/components/post/PostContent';
import TocContent from '@/components/post/TocContent';
import PostHeader from '@/components/post/PostHeader';
import { Post, TocItem } from '@/types';

interface PostDetailProps {
  post: Post;
  toc: TocItem[];
}

const PostDetail = async ({ post, toc }: PostDetailProps) => {
  return (
    <div className='flex flex-col items-center mt-[56px] p-5'>
      <PostHeader post={post} />
      <div className='flex justify-center'>
        <article className='w-full max-w-[720px]'>
          <PostContent post={post} />
          <TocContent toc={toc} />
        </article>
      </div>
    </div>
  );
};

export default PostDetail;
