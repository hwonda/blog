'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import useSearch from '@/hooks/useSearch';

interface SearchInputProps {
  mounted: boolean;
  theme: string;
}

const SearchInput = ({ mounted, theme }: SearchInputProps) => {
  const { searchValue, searchHandler } = useSearch();
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !searchValue &&
      !(event.target as HTMLElement).closest('.search-container')
    ) {
      setIsExpanded(false);
    }
    if (!isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [searchValue]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className='flex items-center search-container'>
      <button
        type='button'
        className='bg-transparent rounded-md p-2 w-10 hover:bg-gray-200 dark:hover:bg-gray-500'
        aria-label='Search'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {mounted && theme && theme === 'dark' ? (
          <Image src='/images/dark_search.svg' alt='' width={20} height={20} />
        ) : (
          <Image src='/images/light_search.svg' alt='' width={20} height={20} />
        )}
      </button>
      <input
        ref={inputRef}
        type='text'
        onChange={searchHandler}
        className={`transition-all duration-300 bg-orange-50 dark:bg-gray-800 border border-impact-color rounded-sm h-8 ${
          isExpanded ? 'w-24 p-2 sm:w-36 md:w-48 lg:w-64' : 'w-0 p-0 border-0'
        }`}
      />
    </div>
  );
};

export default SearchInput;
