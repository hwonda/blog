import { getSortedPostList } from '@/utils/postUtils';
import { getSeriesCards, getSeriesSlugs } from '@/utils/seriesUtils';
import ClientPostList from '@/components/ClientPostList';
import { Suspense } from 'react';
import { PostListLoading } from '@/components/PostListLoading';

interface PostListProps {
  category?: string;
}

const PostListContent = async ({ category }: PostListProps) => {
  const initialPosts = await getSortedPostList(category);
  const seriesCards = !category ? await getSeriesCards() : [];

  return (
    <ClientPostList
      initialPosts={initialPosts}
      category={category}
      seriesCards={seriesCards}
    />
  );
};

const PostListLayout = ({ category }: PostListProps) => {
  const seriesCount = !category ? getSeriesSlugs().length : 0;

  return (
    <div className='flex justify-center min-h-screen w-full mt-20'>
      <section className='mt-10 w-full'>
        <Suspense fallback={<PostListLoading seriesCount={seriesCount} />}>
          <PostListContent category={category} />
        </Suspense>
      </section>
    </div>
  );
};

export default PostListLayout;
