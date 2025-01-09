'use client';

import PostCard from '@/components/PostCard';
import { useSearch } from '@/contexts/SearchContext';
import { PostListHeaderProps, PostGridProps, ClientPostListProps } from '@/types/search';

const PostListHeader = ({ searchResults, pastSearchValue, category }: PostListHeaderProps) => {
  const renderHeaderContent = () => {
    // 검색어가 있을 때
    if (pastSearchValue) {
      return searchResults.length > 0 ? (
        <span>
          <span className="impact-color mr-1">{`'${ pastSearchValue }'`}</span>
          {'에 대한 검색결과'}
        </span>
      ) : (
        <div>
          <span className="impact-color mr-1">{`'${ pastSearchValue }'`}</span>
          {'에 대한 검색 결과가 없습니다.'}
          <div className='mt-8 pt-2 border-t border-main'>{'모든 포스트'}</div>
        </div>
      );
    }
    // 카테고리가 있을 때
    if (category) {
      return (
        <span>
          <span className="impact-color mr-1">{category}</span>
          {'에 관한 글들'}
        </span>
      );
    }
    // 기본
    return '모든 포스트';
  };

  return (
    <div className="mb-5 ml-5">
      <strong className="text-xl font-semibold">
        {renderHeaderContent()}
      </strong>
    </div>
  );
};

const PostGrid = ({ posts }: PostGridProps) => {
  // 포스트가 없을 때
  if (!posts.length) {
    return <div>{'No posts found.'}</div>;
  }

  return (
    <ul className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.title} post={post} />
      ))}
    </ul>
  );
};

const ClientPostList = ({ initialPosts, category }: ClientPostListProps) => {
  const { searchResults, pastSearchValue } = useSearch();
  const postList = searchResults.length > 0 ? searchResults : initialPosts;

  return (
    <>
      <PostListHeader
        searchResults={searchResults}
        pastSearchValue={pastSearchValue}
        category={category}
      />
      <PostGrid posts={postList} />
    </>
  );
};

export default ClientPostList;