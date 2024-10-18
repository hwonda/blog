'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSearch } from '@/contexts/SearchContext';

interface SearchInputProps {
  mounted: boolean;
  theme: string;
}

const SearchInput = ({ mounted, theme }: SearchInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchResults, searchQuery, setSearchQuery } = useSearch();

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !searchQuery &&
      !(event.target as HTMLElement).closest('.search-container')
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className='flex items-center search-container'>
      <button
        type='button'
        className={`bg-transparent rounded-md p-2 w-10 hover:bg-gray-200 dark:hover:bg-gray-500
          ${isExpanded ? 'hidden sm:block' : 'block'}
          transition-all duration-300`}
        aria-label='Search'
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (isExpanded && searchQuery) {
            handleSearch();
          }
        }}
      >
        {mounted && theme && theme === 'dark' ? (
          <Image src='/images/dark_search.svg' alt='search_icon' width={20} height={20} />
        ) : (
          <Image src='/images/light_search.svg' alt='search_icon' width={20} height={20} />
        )}
      </button>
      <input
        ref={inputRef}
        type='text'
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder='Search...'
        className={`transition-all duration-300 bg-orange-50 dark:bg-gray-800 border border-impact-color rounded-sm h-8 ${
          isExpanded ? 'w-24 p-2 sm:w-36 md:w-48 lg:w-64' : 'w-0 p-0 border-0'
        }`}
      />
    </div>
  );
};

export default SearchInput;