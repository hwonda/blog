'use client';

import { Series } from '@/types';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';

interface SeriesNavProps {
  series: Series;
  currentPostSlug: string;
}

const SeriesNav = ({ series, currentPostSlug }: SeriesNavProps) => {
  const currentIndex = series.posts.findIndex((p) => p.slug === currentPostSlug);
  const prevPost = currentIndex > 0 ? series.posts[currentIndex - 1] : null;
  const nextPost = currentIndex < series.posts.length - 1 ? series.posts[currentIndex + 1] : null;

  return (
    <div className="not-prose w-52">
      <Link
        href={series.url}
        className="font-bold text-sm hover:text-accent1 transition-colors flex items-center gap-1.5"
      >
        <List className="size-4" />
        {series.title}
      </Link>
      {/* <span className="text-xs text-gray2 mt-1 block">
        {`${ currentIndex + 1 } / ${ series.postCount }`}
      </span> */}

      <ul className="mt-3">
        {series.posts.map((post, i) => {
          const isCurrent = post.slug === currentPostSlug;
          return (
            <li key={post.slug} className="text-sm">
              <Link href={post.url}>
                <div className="flex">
                  <div
                    className={`pl-2 py-1.5 transition-all duration-300 border-l ${
                      isCurrent ? 'border-accent1' : 'border-light'
                    }`}
                  />
                  <span
                    className={`pl-2 py-1.5 transition-all duration-300 ${
                      isCurrent
                        ? 'text-accent1 font-medium'
                        : 'text-gray1 hover:text-accent2'
                    }`}
                  >
                    {`${ String(i + 1).padStart(2, '0') }. ${ post.title }`}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex justify-between border-t border-gray4 pt-3">
        <Link
          href={prevPost?.url ?? ''}
          className={`flex items-center gap-1 text-xs text-gray1 hover:text-accent1 transition-colors ${ prevPost ? '' : 'opacity-0' }`}
        >
          <ChevronLeft className="size-3 shrink-0" />
          <span className="truncate">{'이전글'}</span>
        </Link>
        <Link
          href={nextPost?.url ?? ''}
          className={`flex items-center gap-1 text-xs text-gray1 hover:text-accent1 transition-colors ${ nextPost ? '' : 'opacity-0' }`}
        >
          <span className="truncate">{'다음글'}</span>
          <ChevronRight className="size-3 shrink-0" />
        </Link>
      </div>
    </div>
  );
};

export default SeriesNav;
