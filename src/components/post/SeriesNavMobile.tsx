'use client';

import { useState } from 'react';
import { Series } from '@/types';
import Link from 'next/link';
import { ChevronDown, ChevronUp, List, ChevronLeft, ChevronRight } from 'lucide-react';

interface SeriesNavMobileProps {
  series: Series;
  currentPostSlug: string;
}

const SeriesNavMobile = ({ series, currentPostSlug }: SeriesNavMobileProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const currentIndex = series.posts.findIndex((p) => p.slug === currentPostSlug);
  const prevPost = currentIndex > 0 ? series.posts[currentIndex - 1] : null;
  const nextPost = currentIndex < series.posts.length - 1 ? series.posts[currentIndex + 1] : null;

  return (
    <div className="not-prose w-full max-w-[800px] border border-gray3 rounded-lg overflow-hidden mt-4 mb-20 xl:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <List className="size-4 text-accent1" />
          <span className="font-semibold text-sm">{series.title}</span>
          <span className="text-xs text-gray2">
            {`(${ currentIndex + 1 }/${ series.postCount })`}
          </span>
        </div>
        {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>
      {isOpen && (
        <div className="border-t border-gray3 p-4">
          <ul className="flex flex-col gap-1">
            {series.posts.map((post, i) => {
              const isCurrent = post.slug === currentPostSlug;
              return (
                <li key={post.slug}>
                  <Link
                    href={post.url}
                    className={`block py-1.5 px-2 rounded text-sm transition-colors ${
                      isCurrent
                        ? 'bg-accent1/10 text-accent1 font-medium'
                        : 'text-gray1 hover:text-accent2 hover:bg-gray5'
                    }`}
                  >
                    {`${ String(i + 1).padStart(2, '0') }. ${ post.title }`}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 pt-3 border-t border-gray4 flex justify-between text-xs">
            {prevPost ? (
              <Link
                href={prevPost.url}
                className="flex items-center gap-1 text-gray1 hover:text-accent1 transition-colors"
              >
                <ChevronLeft className="size-3" />
                <span>{'이전글'}</span>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link
                href={nextPost.url}
                className="flex items-center gap-1 text-gray1 hover:text-accent1 transition-colors"
              >
                <span>{'다음글'}</span>
                <ChevronRight className="size-3" />
              </Link>
            ) : <div />}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeriesNavMobile;
