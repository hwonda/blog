import React, { useCallback, useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';

export default function useSearch(callback?: (value: string) => void) {
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    callback?.(value);
    setSearchValue(value);
  }, [callback]);
  
  const debouncedSearchHandler = useMemo(() => debounce(searchHandler, 500), [searchHandler]);
  
  useEffect(() => {
    return () => {
      debouncedSearchHandler.cancel(); // Clean up on unmount
    };
  }, [debouncedSearchHandler]);

  return { searchValue, searchHandler };
}
