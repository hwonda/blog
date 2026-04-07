'use client';

import { SeriesCard } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface SeriesCarouselProps {
  seriesCards: SeriesCard[];
}

const SeriesCarousel = ({ seriesCards }: SeriesCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (seriesCards.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 260;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full mb-8 px-4 lg:px-0">
      <div className="flex items-center justify-between mb-3">
        <strong className="text-xl font-semibold">{'시리즈'}</strong>
        {seriesCards.length > 2 && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="p-1 rounded hover:bg-gray4 transition-colors"
              aria-label="왼쪽 스크롤"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="p-1 rounded hover:bg-gray4 transition-colors"
              aria-label="오른쪽 스크롤"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
      >
        {seriesCards.map((card) => (
          <Link key={card.slug} href={card.url} className="snap-start">
            <div
              className={`group w-[240px] shrink-0 rounded-lg border border-gray2
                overflow-hidden hover:border-accent1 transition-colors`}
            >
              {card.thumbnail ? (
                <div className="relative h-[120px] w-full overflow-hidden">
                  <Image
                    src={card.thumbnail}
                    alt={card.title}
                    fill
                    sizes="240px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-[120px] w-full bg-gray5 flex items-center justify-center">
                  <BookOpen className="size-8 text-gray2" />
                </div>
              )}
              <div className="p-3">
                <div className="font-semibold text-sm truncate group-hover:text-accent1 transition-colors">
                  {card.title}
                </div>
                <p className="text-xs text-sub mt-1 line-clamp-2 group-hover:text-accent2 transition-colors">{card.desc}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray1">
                  <BookOpen className="size-3" />
                  <span>{card.postCount}{'편'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SeriesCarousel;
