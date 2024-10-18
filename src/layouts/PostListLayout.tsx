import { getSortedPostList } from '@/utils/postUtils';
import ClientPostList from '@/components/ClientPostList';

interface PostListProps {
  category?: string;
}

const PostListLayout = async ({ category }: PostListProps) => {
  const initialPosts = await getSortedPostList(category);

  return (
    <div className='flex justify-center mt-10 px-5 min-h-screen'>
      <section className='mt-10 w-full max-w-[1200px]'>
        <ClientPostList initialPosts={initialPosts} category={category} />
      </section>
    </div>
  );
};

export default PostListLayout;