'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import PostCard from '@/components/PostCard';
import PostListHeader from '@/components/PostListHeader';
import TagFilter from '@/components/TagFilter';
import { useSearch } from '@/contexts/SearchContext';
import { PostGridProps, ClientPostListProps } from '@/types/search';
import SeriesCarousel from '@/components/series/SeriesCarousel';
import { searchPosts } from '@/utils/searchUtils';

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

const ClientPostList = ({ initialPosts, allTags, seriesCards = [] }: ClientPostListProps) => {
  const { searchResults, pastSearchValue, setSearchResults, setPastSearchValue } = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tagsParam = searchParams.get('tags') ?? '';
  const selectedTags = useMemo(
    () => tagsParam.split(',').filter(Boolean),
    [tagsParam],
  );
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
  const postList = selectedTags.length > 0
    ? baseList.filter((post) => selectedTags.some((tag) => post.tags.includes(tag)))
    : baseList;

  const updateTagsParam = useCallback((nextTags: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextTags.length > 0) params.set('tags', nextTags.join(','));
    else params.delete('tags');
    const qs = params.toString();
    router.push(qs ? `${ pathname }?${ qs }` : pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  const handleTagClick = useCallback((tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    updateTagsParam(next);
  }, [selectedTags, updateTagsParam]);

  const handleTagReset = useCallback(() => {
    updateTagsParam([]);
  }, [updateTagsParam]);

  const showCarousel = seriesCards.length > 0 && selectedTags.length === 0 && !pastSearchValue;

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-[800px]'>
        {showCarousel && <SeriesCarousel seriesCards={seriesCards} />}
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
          onReset={handleTagReset}
        />
        <PostListHeader
          searchResults={searchResults}
          pastSearchValue={pastSearchValue}
          selectedTags={selectedTags}
          count={postList.length}
        />
        <PostGrid posts={postList} onTagClick={handleTagClick} />
      </div>
    </div>
  );
};

export default ClientPostList;
