'use client';

import PostCard from '@/components/PostCard';
import { useSearch } from '@/contexts/SearchContext';
import { Post } from '@/types';

interface ClientPostListProps {
  initialPosts: Post[];
  category?: string;
}

const ClientPostList = ({ initialPosts, category }: ClientPostListProps) => {
  const { searchResults, searchQuery } = useSearch();
  const postList = searchResults.length > 0 ? searchResults : initialPosts;

  if (!postList.length) return <div>No posts found.</div>;

  return (
    <>
      <div className='mb-5 ml-5'>
        {searchResults.length > 0 ? (
          <strong className='text-xl font-semibold text-gray-600 dark:text-gray-300'>
            Search Results for '{searchQuery}'
          </strong>
        ) : category ? (
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
    </>
  );
};

export default ClientPostList;