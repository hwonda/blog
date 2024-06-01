import PostCard from '@/src/components/PostCard';
import { getSortedPostList } from '../utils/postUtils';
import { Post } from '@/src/types/post';

interface PostListProps {
  category?: string;
}

const PostListLayout = async ({ category }: PostListProps) => {
  const postList = await getSortedPostList(category);

  if (!postList) return <div>No posts found.</div>;
  return (
    <div className='flex justify-center mt-10 px-5'>
      <section className='mt-14 w-full max-w-[1200px]'>
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
