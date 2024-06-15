import PostCard from '@/components/PostCard';
import { getSortedPostList } from '../utils/postUtils';

interface PostListProps {
  category?: string;
}

const PostListLayout = async ({ category }: PostListProps) => {
  const postList = await getSortedPostList(category);

  if (!postList) return <div>No posts found.</div>;
  return (
    <div className='flex justify-center mt-10 px-5 min-h-screen'>
      <section className='mt-10 w-full max-w-[1200px]'>
        <div className='mb-5 ml-5'>
          {category
            ? (
            <>
              <span className='text-gray-600 dark:text-gray-300'>Posts about</span>
              <strong className='ml-2 text-xl font-semibold impact-color'>{category}</strong>
            </>
            ) : (
            <strong className='text-xl font-semibold text-gray-600 dark:text-gray-300'>All posts</strong>
          )}
        </div>
        <ul className='gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {postList.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PostListLayout;
