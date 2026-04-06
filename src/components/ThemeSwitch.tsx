'use client';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitchProps {
  theme: string;
  setTheme: (theme: string)=> void;
}

const ThemeSwitch = ({ theme, setTheme }: ThemeSwitchProps) => {
  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='rounded-md p-2 hover:bg-gray4 transition-all duration-500'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark'
        ? <Moon size={16} />
        : <Sun size={16} />
      }
    </button>
  );
};

export default ThemeSwitch;
