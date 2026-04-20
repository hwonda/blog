'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import PostCard from '@/components/PostCard';
import PostListHeader from '@/components/PostListHeader';
import { useSearch } from '@/contexts/SearchContext';
import { PostGridProps, ClientPostListProps } from '@/types/search';
import SeriesCarousel from '@/components/series/SeriesCarousel';
import { searchPosts } from '@/utils/searchUtils';
import { X } from 'lucide-react';

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

const ClientPostList = ({ initialPosts, seriesCards = [] }: ClientPostListProps) => {
  const { searchResults, pastSearchValue, setSearchResults, setPastSearchValue } = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get('tag');
  const q = searchParams.get('q') ?? '';

  useEffect(() => {
    if (!q) {
      setSearchResults([]);
      setPastSearchValue('');
      return;
    }

    let cancelled = false;
    searchPosts(q).then((results) => {
      if (cancelled) return;
      setSearchResults(results);
      setPastSearchValue(q);
    }).catch((error) => {
      console.error('Search error:', error);
      if (!cancelled) {
        setSearchResults([]);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [q, setSearchResults, setPastSearchValue]);

  const baseList = searchResults.length > 0 ? searchResults : initialPosts;
  const postList = selectedTag
    ? baseList.filter((post) => post.tags.includes(selectedTag))
    : baseList;

  const updateTagParam = (nextTag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextTag) params.set('tag', nextTag);
    else params.delete('tag');
    const qs = params.toString();
    router.push(qs ? `${ pathname }?${ qs }` : pathname, { scroll: false });
  };

  const handleTagClick = (tag: string) => {
    updateTagParam(selectedTag === tag ? null : tag);
  };

  const showCarousel = seriesCards.length > 0 && !selectedTag && !pastSearchValue;

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-[800px]'>
        {showCarousel && <SeriesCarousel seriesCards={seriesCards} />}
        <PostListHeader
          searchResults={searchResults}
          pastSearchValue={pastSearchValue}
          selectedTag={selectedTag}
          count={postList.length}
        />
        {selectedTag && (
          <div className="my-4 flex items-center gap-2">
            <span className="text-sm text-sub">{'태그 필터:'}</span>
            <button
              type="button"
              onClick={() => updateTagParam(null)}
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
