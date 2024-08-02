'use client';

import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = document.documentElement.scrollTop;
      const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (currentScroll / scrollableHeight) * 100;
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className='fixed top-0 left-0 z-20 h-1 w-full bg-background'>
      <div className='h-1 bg-impact-color' style={{ width: `${scrollProgress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
