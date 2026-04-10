import { Series } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock3, ArrowLeft, BookOpen } from 'lucide-react';

interface SeriesTocPageProps {
  series: Series;
}

const SeriesTocPage = ({ series }: SeriesTocPageProps) => {
  return (
    <div className="flex justify-center min-h-screen w-full mt-20">
      <div className="w-full max-w-[800px] mt-10 px-4 lg:px-0">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-gray1 hover:text-accent1 transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          {'모든 포스트'}
        </Link>

        <div className="mb-8">
          {series.thumbnail ? (
            <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
              <Image
                src={series.thumbnail}
                alt={series.title}
                fill
                sizes="800px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-full aspect-video mb-6 rounded-lg bg-gray5 flex items-center justify-center">
              <BookOpen className="size-16 text-gray2" />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-2">{series.title}</h1>
          <p className="text-sub">{series.desc}</p>
          <span className="text-sm text-gray2 mt-2 inline-block">
            {`총 ${ series.postCount }편`}
          </span>
        </div>

        <ol className="flex flex-col gap-0 border-t border-gray3">
          {series.posts.map((post, index) => (
            <li key={post.slug}>
              <Link
                href={post.url}
                className="group flex items-start gap-4 py-4 border-b border-gray3 hover:bg-gray5/50 transition-colors px-2"
              >
                <span className="text-lg font-bold text-gray2 w-8 shrink-0 -mt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-accent1 transition-colors">
                    {post.title}
                  </div>
                  <p className="text-sm text-sub mt-1 line-clamp-2">{post.desc}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray2">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      <span>{post.dateString}</span>
                    </div>
                    <span className="text-gray3">{'·'}</span>
                    <div className="flex items-center gap-1">
                      <Clock3 className="size-3" />
                      <span>{post.readingTimes}{'분'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SeriesTocPage;
