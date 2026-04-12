import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';
import { Clock3 } from 'lucide-react';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <>
      <ProgressBar />
      <div className='not-prose mt-20 w-full max-w-[1200px] flex flex-col items-center'>
        <header className='w-full mb-4'>
          <h1 className='text-3xl font-bold mb-2'>{post.title}</h1>
          <span className='text-sub'>
            {post.desc}
          </span>
        </header>
        <div className='w-full flex flex-col gap-3'>
          <div className='flex flex-wrap items-center gap-1 text-sm text-gray2'>
            <span>{post.createdDate}</span>
            <span>{'발행'}</span>
            <span className='px-1 text-gray3'>{'·'}</span>
            {post.modifiedDate && (
              <>
                <span>{post.modifiedDate}</span>
                <span>{'수정'}</span>
                <span className='px-1 text-gray3'>{'·'}</span>
              </>
            )}
            <Clock3 className='size-4' />
            <span>{post.readingTimes}{'분'}</span>
          </div>
          {post.tags.length > 0 && (
            <div className='flex gap-1.5 flex-wrap'>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${ encodeURIComponent(tag) }`}
                  className='px-2 py-0.5 rounded-full bg-tag text-tag-text text-xs hover:bg-tag-hover transition-colors'
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        {post.thumbnail && (
          <div className='w-full max-w-[800px] my-10'>
            <div className='relative aspect-video'>
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                sizes='(max-width: 800px) 100vw, 800px'
                priority
                className='rounded-md'
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
