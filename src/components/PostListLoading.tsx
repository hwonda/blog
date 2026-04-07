'use client';

import { useEffect, useState } from 'react';

// 스켈레톤 카드 컴포넌트
const SkeletonPostCard = () => {
  return (
    <li className="py-4 border-b border-gray4 last:border-b-0">
      <div className="h-6 bg-gray-200 rounded-md w-2/5 mb-2 relative overflow-hidden">
        <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
      </div>
      <div className="flex justify-between gap-4 mt-1.5">
        <div className="flex-1 space-y-1.5">
          <div className="h-4 bg-gray-200 rounded-md w-full relative overflow-hidden">
            <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
          <div className="h-4 bg-gray-200 rounded-md w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
        </div>
        <div className="w-[160px] h-[120px] shrink-0 bg-gray-200 rounded-md hidden sm:block relative overflow-hidden">
          <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="h-4 bg-gray-200 rounded-md w-24 relative overflow-hidden">
          <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
        </div>
        <div className="h-4 bg-gray-200 rounded-md w-16 relative overflow-hidden">
          <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
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
      <ul className="flex flex-col">
        {Array(6).fill(0).map((_, index) => (
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
