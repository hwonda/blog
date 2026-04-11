'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/contexts/SearchContext';
import { Search } from 'lucide-react';

interface SearchInputProps {
  mounted: boolean;
  theme: string;
}

const SearchInput = ({ mounted }: SearchInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isComposingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchQuery, setSearchQuery } = useSearch();
  const router = useRouter();

  const submitSearch = () => {
    const trimmed = searchQuery.trim();
    router.push(trimmed ? `/blog?q=${ encodeURIComponent(trimmed) }` : '/blog');
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposingRef.current) {
      e.preventDefault();
      submitSearch();
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      !searchQuery
      && !(event.target as HTMLElement).closest('.search-container')
    ) {
      setIsExpanded(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className='flex items-center search-container'>
      <button
        type='button'
        className={`bg-transparent rounded-md p-2 hover:bg-gray4 mr-1
          ${ isExpanded ? 'hidden sm:block' : 'block' }
          transition-all duration-500`}
        aria-label='Search'
        onClick={() => {
          if (isExpanded && searchQuery) {
            submitSearch();
          } else {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        {mounted
          && <Search size={16} />
        }
      </button>
      <input
        ref={inputRef}
        id='search-input'
        type='text'
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onCompositionStart={() => { isComposingRef.current = true; }}
        onCompositionEnd={() => { isComposingRef.current = false; }}
        placeholder='검색어 입력 후 Enter'
        className={`transition-all duration-300 bg-background border border-accent1 rounded-xs h-8 ${
          isExpanded ? 'w-24 p-2 sm:w-36 md:w-48 lg:w-64' : 'w-0 p-0 border-0'
        }`}
      />
    </div>
  );
};

export default SearchInput;
