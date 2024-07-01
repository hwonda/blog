'use client';

import ThemeSwitch from '@/src/components/ThemeSwitch';

export default function Header() {
  return (
    <div className='top-0 left-0 z-10 fixed flex justify-center shadow-md p-2 w-full'>
      <div className='flex justify-between items-center w-full max-w-[1200px]'>
        <div>
          <button type='button'>=</button>
          <ThemeSwitch />
        </div>
        <a href='/' className='font-bold text-xl'>
          Frontend. Hwonda
        </a>
        <div>search</div>
      </div>
    </div>
  );
}
