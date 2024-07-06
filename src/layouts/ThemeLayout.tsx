'use client';

import { ThemeProvider as NextTheme} from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export default function ThemeLayout({ children, ...props }: ThemeProviderProps) {
  return (
    <NextTheme attribute='class' defaultTheme='dark' {...props}>
      {children}
    </NextTheme>
  );
}
