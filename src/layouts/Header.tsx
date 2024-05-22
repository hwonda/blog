'use client';

import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  return (
    <div
      className='fixed top-0 left-0 w-full p-2 shadow-md z-10'
    >
      <div className='flex items-center'>
        <a href='/' className='text-xl font-bold'>훤다log</a>
        <ThemeSwitch />
      </div>
    </div>
  );
}