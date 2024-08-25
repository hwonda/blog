'use client';

import ThemeSwitch from '@/components/ThemeSwitch';
import Dropdown from '@/components/Dropdown';
import SearchInput from '@/components/SearchInput';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { CategoryDetail } from '@/types';
import { blogMetadata } from '@/constants';

interface HeaderProps {
  categoryList: CategoryDetail[];
}

export default function Header({ categoryList }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className='top-0 left-0 z-10 fixed flex justify-center shadow-md p-2 w-full h-12 bg-background opacity-80 hover:opacity-100'>
      <div className='flex justify-between items-center w-full max-w-[1200px]'>
        <div className='flex w-20' ref={dropdownRef}>
          <Dropdown
            categoryList={categoryList}
            mounted={mounted}
            theme={theme || 'light'}
            toggleDropdown={toggleDropdown}
            isOpen={isDropdownOpen}
          />
          <SearchInput mounted={mounted} theme={theme || 'light'} />
        </div>
        <a href='/' className='font-bold text-xl'>
          {blogMetadata.name}
        </a>
        <div className='flex justify-end w-20'>
          {mounted && theme && (
            <ThemeSwitch theme={theme} setTheme={setTheme} />
          )}
        </div>
      </div>
    </div>
  );
}
