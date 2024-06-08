'use client';

// import { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';
import Image from 'next/image';

interface ThemeSwitchProps {
  theme: string;
  setTheme: (theme: string) => void;
}


const ThemeSwitch = ({ theme, setTheme}: ThemeSwitchProps) => {
  // const [mounted, setMounted] = useState(false);
  // const { theme, setTheme } = useTheme();

  // useEffect(() => setMounted(true), []);

  // if (!mounted) return null;
  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='rounded-md p-2'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark'
        ? <Image src="/images/light_mode.svg" alt="light" width={20} height={20} />
        : <Image src="/images/dark_mode.svg" alt="dark" width={20} height={20} />
      }
    </button>
  );
};

export default ThemeSwitch;
