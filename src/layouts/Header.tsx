'use client';

import ThemeSwitch from '@/src/components/ThemeSwitch';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  console.log('theme', theme);

  useEffect(() => setMounted(true), []);
  return (
    <div className='top-0 left-0 z-10 fixed flex justify-center shadow-md p-2 w-full h-[50px] bg-background'>
      <div className='flex justify-between items-center w-full max-w-[1200px]'>
        <div className='flex w-20'>
          <button type='button' className='bg-transparent rounded-md p-2'>
            { mounted && theme === 'dark'
              ? <Image src='/images/dark_menu.svg' alt='' width={20} height={20} />
              : <Image src='/images/light_menu.svg' alt='' width={20} height={20} />
            }
          </button>
          {mounted && theme && <ThemeSwitch theme={theme} setTheme={setTheme}/>}
        </div>
        <a href='/' className='font-bold text-xl'>
          Hwonda Blog
        </a>
        <div className='w-20'>search</div>
      </div>
    </div>
  );
}
