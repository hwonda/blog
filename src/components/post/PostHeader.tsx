import { Post } from '@/types';
import Image from 'next/image';
import ProgressBar from '@/components/ProgressBar';
import { Clock3, Calendar } from 'lucide-react';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <>
      <ProgressBar />
      <div className='not-prose mt-20 w-full max-w-[1200px] flex flex-col items-center'>
        <header className='w-full text-center mb-10'>
          <h1 className='text-3xl font-bold mb-2'>{post.title}</h1>
          <span className='mt-2 text-sub'>
            {post.desc}
          </span>
        </header>
        <div className='w-full flex justify-between items-center pb-2 mb-5 border-b dark:border-gray-400'>
          <span className='text-sub'>{post.categoryPublicName}</span>
          <div className='flex gap-1 items-center'>
            <Clock3 className="size-4 text-sub" />
            <span className="text-sub">{post.readingTimes}{'분'}</span>
            <span className='px-1 text-sub'>{'•'}</span>
            <Calendar className="size-4 text-sub" />
            <span className='text-sub'>
              {post.dateString}
            </span>
          </div>
        </div>
        {post.thumbnail && (
          <div className='w-full max-w-[800px] mt-10'>
            <div className='relative aspect-video'>
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
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
