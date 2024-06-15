'use client';

import React from 'react';
import Image from 'next/image';
import { getCategoryDetailList } from '@/utils/categoryUtils';
import { CategoryDetail } from '@/types';

interface DropdownMenuProps {
  categoryList: CategoryDetail[];
  mounted: boolean;
  theme: string;
  toggleDropdown: () => void;
  isOpen: boolean;
}

const Dropdown = ({ categoryList, mounted, theme, toggleDropdown, isOpen }: DropdownMenuProps) => {
  // const categoryList = await getCategoryDetailList();

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-transparent rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-500"
        aria-label="Menu"
        onClick={toggleDropdown}
      >
        {mounted && theme === 'dark'
          ? <Image src="/images/dark_menu.svg" alt="" width={20} height={20} />
          : <Image src="/images/light_menu.svg" alt="" width={20} height={20} />
        }
      </button>
      {isOpen && (
        <div className="absolute top-[46px] w-56 rounded-md shadow-lg bg-white">
          <div className="p-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {categoryList.map((category, i) => (
              <a
                key={i}
                href={`/blog/${category.dirName}`}
                className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 "
                role="menuitem"
              >
                {category.publicName} ({category.count})
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

