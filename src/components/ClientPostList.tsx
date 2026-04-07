'use client';

import { useState } from 'react';
import PostCard from '@/components/PostCard';
import { useSearch } from '@/contexts/SearchContext';
import { PostListHeaderProps, PostGridProps, ClientPostListProps } from '@/types/search';
import { X } from 'lucide-react';

const PostListHeader = ({ searchResults, pastSearchValue, category }: PostListHeaderProps) => {
  const renderHeaderContent = () => {
    // 검색어가 있을 때
    if (pastSearchValue) {
      return searchResults.length > 0 ? (
        <span>
          <span className="mr-1">{`'${ pastSearchValue }'`}</span>
          {'에 대한 검색결과'}
        </span>
      ) : (
        <div>
          <span className="mr-1">{`'${ pastSearchValue }'`}</span>
          {'에 대한 검색 결과가 없습니다.'}
          <div className='mt-8 pt-5 border-t-2 border-gray1'>{'모든 포스트'}</div>
        </div>
      );
    }
    // 카테고리가 있을 때
    if (category) {
      return (
        <span>
          <span className="mr-1">{category}</span>
          {'에 관한 글들'}
        </span>
      );
    }
    // 기본
    return '모든 포스트';
  };

  return (
    <div className="border-b-2 border-gray1 pb-5 px-4 lg:px-0">
      <strong className="text-xl font-semibold">
        {renderHeaderContent()}
      </strong>
    </div>
  );
};

interface PostGridWithTagProps extends PostGridProps {
  onTagClick: (tag: string)=> void;
}

const PostGrid = ({ posts, onTagClick }: PostGridWithTagProps) => {
  if (!posts.length) {
    return <div>{'No posts found.'}</div>;
  }

  return (
    <ul className="flex flex-col">
      {posts.map((post) => (
        <PostCard key={post.url} post={post} onTagClick={onTagClick} />
      ))}
    </ul>
  );
};

const ClientPostList = ({ initialPosts, category }: ClientPostListProps) => {
  const { searchResults, pastSearchValue } = useSearch();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const baseList = searchResults.length > 0 ? searchResults : initialPosts;
  const postList = selectedTag
    ? baseList.filter((post) => post.tags.includes(selectedTag))
    : baseList;

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-[800px]'>
        <PostListHeader
          searchResults={searchResults}
          pastSearchValue={pastSearchValue}
          category={category}
        />
        {selectedTag && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-sub">{'태그 필터:'}</span>
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent1 text-white text-sm transition-colors hover:opacity-80"
            >
              {selectedTag}
              <X className="size-3.5" />
            </button>
          </div>
        )}
        <PostGrid posts={postList} onTagClick={handleTagClick} />
      </div>
    </div>
  );
};

export default ClientPostList;
