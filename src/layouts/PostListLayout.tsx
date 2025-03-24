import { getSortedPostList } from '@/utils/postUtils';
import ClientPostList from '@/components/ClientPostList';
import { Suspense } from 'react';
import { PostListLoading } from '@/components/PostListLoading';

interface PostListProps {
  category?: string;
}

const PostListLayout = async ({ category }: PostListProps) => {
  const initialPosts = await getSortedPostList(category);

  return (
    <div className='flex justify-center mt-10 px-5 min-h-screen w-full'>
      <section className='mt-10 w-full max-w-[1200px]'>
        <Suspense fallback={<PostListLoading />}>
          {/* <DelayedLoader> */}
          <ClientPostList initialPosts={initialPosts} category={category} />
          {/* </DelayedLoader> */}
        </Suspense>
      </section>
    </div>
  );
};

export default PostListLayout;