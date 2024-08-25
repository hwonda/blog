import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

export default function useSearch(callback?: (value: string) => void) {
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      callback?.(value);
      setSearchValue(value);
    }, 500),
    []
  );
  console.log('searchValue', searchValue);

  return { searchValue, searchHandler };
}
