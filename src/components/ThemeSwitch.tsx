'use client';
import Image from 'next/image';

interface ThemeSwitchProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeSwitch = ({ theme, setTheme }: ThemeSwitchProps) => {
  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-1000'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark'
        ? <Image src="/images/dark_mode.svg" alt="dark" width={20} height={20} />
        : <Image src="/images/light_mode.svg" alt="light" width={20} height={20} />
      }
    </button>
  );
};

export default ThemeSwitch;
