'use client';

import React from 'react';
import Image from 'next/image';
import { CategoryDetail } from '@/types';
import { Menu } from 'lucide-react';

interface DropdownMenuProps {
  categoryList: CategoryDetail[];
  mounted: boolean;
  theme: string;
  toggleDropdown: () => void;
  isOpen: boolean;
}

const Dropdown = ({
  categoryList,
  mounted,
  theme,
  toggleDropdown,
  isOpen,
}: DropdownMenuProps) => {

  return (
    <>
      <button
        type='button'
        className='bg-transparent rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-500  transition-all duration-500'
        aria-label='Menu'
        onClick={toggleDropdown}
      >
        {mounted && 
          <Menu size={16} />
        }
      </button>
      {isOpen && (
        <div className='absolute top-10 w-40 rounded-md shadow-lg bg-white'>
          <div
            className='p-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {categoryList.map((category, i) => (
              <a
                key={i}
                href={`/blog/${category.dirName}`}
                className='flex items-center rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 '
                role='menuitem'
              >
                {category.publicName} ({category.count})
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
