import { getSortedPostList } from '@/utils/postUtils';
import { getSeriesCards, getSeriesSlugs } from '@/utils/seriesUtils';
import ClientPostList from '@/components/ClientPostList';
import { Suspense } from 'react';
import { PostListLoading } from '@/components/PostListLoading';

const PostListContent = async () => {
  const initialPosts = await getSortedPostList();
  const seriesCards = await getSeriesCards();

  return (
    <ClientPostList
      initialPosts={initialPosts}
      seriesCards={seriesCards}
    />
  );
};

const PostListLayout = () => {
  const seriesCount = getSeriesSlugs().length;

  return (
    <div className='flex justify-center min-h-screen w-full mt-20'>
      <section className='mt-10 w-full'>
        <Suspense fallback={<PostListLoading seriesCount={seriesCount} />}>
          <PostListContent />
        </Suspense>
      </section>
    </div>
  );
};

export default PostListLayout;
