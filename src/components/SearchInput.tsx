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
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchResults, searchQuery, setSearchQuery, setPastSearchValue } = useSearch();
  const router = useRouter();

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setPastSearchValue('');
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${ encodeURIComponent(searchQuery.trim()) }`);
      if (!response.ok) {
        throw new Error(`HTTP error. status: ${ response.status }`);
      }
      const results = await response.json();

      // 상태 업데이트를 동시에 처리
      Promise.all([
        setPastSearchValue(searchQuery.trim()),
        setSearchResults(results),
      ]);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSearching) {
      e.preventDefault();
      setSearchQuery(searchQuery.trim());
      await handleSearch();
      router.push('/blog');
      setIsExpanded(false);
      setSearchQuery('');
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
        className={`bg-transparent rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-500 mr-1
          ${ isExpanded ? 'hidden sm:block' : 'block' }
          transition-all duration-500`}
        aria-label='Search'
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (isExpanded && searchQuery && !isSearching) {
            handleSearch();
          }
        }}
        disabled={isSearching}
      >
        {mounted
          && <Search size={16} />
        }
      </button>
      <input
        ref={inputRef}
        type='text'
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder='검색어 입력'
        disabled={isSearching}
        className={`transition-all duration-300 bg-orange-50 dark:bg-gray-800 border border-impact-color rounded-sm h-8 ${
          isExpanded ? 'w-24 p-2 sm:w-36 md:w-48 lg:w-64' : 'w-0 p-0 border-0'
        }`}
      />
    </div>
  );
};

export default SearchInput;