'use client';

import ThemeSwitch from '@/components/ThemeSwitch';
import SearchInput from '@/components/SearchInput';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [portfolioPath, setPortfolioPath] = useState('/fe');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- hydration 감지용 의도적 패턴

    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    if (from === 'fe' || from === 'pm') {
      sessionStorage.setItem('blog-from', from);
      setPortfolioPath(`/${ from }`);
    } else {
      const stored = sessionStorage.getItem('blog-from');
      if (stored === 'fe' || stored === 'pm') {
        setPortfolioPath(`/${ stored }`);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='fixed top-0 z-50 w-full'>
      <div className={`${ isScrolled ? 'border-b border-gray5 bg-background' : '' } flex justify-center`}>
        <div className="w-full max-w-[800px] relative flex items-center justify-between py-4 px-4 lg:px-0 backdrop-blur-md text-main">
          <div className="font-paperlogy relative z-10 flex items-center gap-2 text-base font-medium sm:text-2xl">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- microfrontend 간 네비게이션 */}
            <a href="/blog" aria-label="블로그 홈으로 이동">
              <span className="hidden sm:inline">{'HWONDA BLOG'}</span>
              <span className="sm:hidden">{'HWONDA'}</span>
            </a>
            <a
              href={portfolioPath}
              className="text-sub hover:bg-gray5 rounded-md p-1.5 transition-all duration-300 sm:px-3 text-base hover:text-accent2"
              aria-label="포트폴리오로 이동"
            >
              {'About'}
            </a>
          </div>
          <nav className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
            <div className='flex'>
              <SearchInput mounted={mounted} theme={theme || 'light'} />
              <div className='flex justify-end ml-1'>
                {mounted && theme && (
                  <ThemeSwitch theme={theme} setTheme={setTheme} />
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
