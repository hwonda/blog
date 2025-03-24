'use client';

import { useEffect, useState } from 'react';

// 스켈레톤 카드 컴포넌트
const SkeletonPostCard = () => {
  return (
    <li className='shadow-md border rounded-xl h-full transition flex sm:block'>
      <div className='relative sm:m-2 hidden sm:block sm:text-lg sm:w-[calc(100% - 4rem)] aspect-video overflow-hidden'>
        <div className='size-full bg-gray-200 animate-pulse rounded-md' />
      </div>
      <div className='flex flex-col px-2 pb-2 m-2 w-full sm:m-0 sm:w-auto'>
        <div className='h-6 bg-gray-200 rounded-md w-3/4 mb-2 relative overflow-hidden'>
          <div className='absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer' />
        </div>
        <div className='h-4 bg-gray-200 rounded-md w-full mb-2 relative overflow-hidden'>
          <div className='absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer' />
        </div>
        <div className='flex justify-between p-1'>
          <div className='h-4 bg-gray-200 rounded-md w-1/4 relative overflow-hidden'>
            <div className='absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer' />
          </div>
          <div className='flex gap-1 items-center'>
            <div className='h-4 bg-gray-200 rounded-md w-20 relative overflow-hidden'>
              <div className='absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer' />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

// 로딩 컴포넌트
export const PostListLoading = () => {
  return (
    <div className="w-full">
      <div className="mb-5 ml-5">
        <div className="h-6 bg-gray-200 rounded-md w-40 relative overflow-hidden">
          <div className='absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer' />
        </div>
      </div>
      <ul className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array(9).fill(0).map((_, index) => (
          <SkeletonPostCard key={index} />
        ))}
      </ul>
    </div>
  );
};

// 10초 지연 로딩 컴포넌트
interface DelayedLoaderProps {
  children: React.ReactNode;
  delayMs?: number;
}

const DelayedLoader = ({ children, delayMs = 10000 }: DelayedLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  if (isLoading) {
    return <PostListLoading />;
  }

  return <>{children}</>;
};

export default DelayedLoader;