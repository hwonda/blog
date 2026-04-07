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
    <div className='w-full max-w-[800px] relative flex flex-col mt-10 px-4 lg:px-0'>
      <div className='w-full flex justify-center'>
        <PostHeader post={post} />
      </div>
      <article className='prose dark:prose-invert w-full max-w-[800px] break-all'>
        <PostContent post={post} />
      </article>
      <div className='hidden xl:block absolute h-[calc(100%-720px)] right-[-265px] top-[255px]'>
        <TocContent toc={toc} />
      </div>
      <Giscus />
    </div>
  );
};

export default PostDetail;
