'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Post } from '@/types';

interface SearchContextType {
  searchResults: Post[];
  setSearchResults: React.Dispatch<React.SetStateAction<Post[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  pastSearchValue: string;
  setPastSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pastSearchValue, setPastSearchValue] = useState<string>('');

  const contextValue: SearchContextType = {
    searchResults,
    setSearchResults,
    searchQuery,
    setSearchQuery,
    pastSearchValue,
    setPastSearchValue,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};