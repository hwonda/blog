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
        <header className='w-full mb-2.5'>
          <h1 className='text-3xl font-bold mb-2'>{post.title}</h1>
          <span className='text-sub'>
            {post.desc}
          </span>
        </header>
        <div className='w-full flex justify-start gap-1 items-center'>
          <span className='text-sm text-gray2'>{post.categoryPublicName}</span>
          <span className='px-1 text-sm text-gray3'>{'•'}</span>
          <Clock3 className="size-4 text-sm text-gray2" />
          <span className="text-sm text-gray2">{post.readingTimes}{'분'}</span>
          <span className='px-1 text-sm text-gray3'>{'•'}</span>
          <Calendar className="size-4 text-sm text-gray2" />
          <span className='text-sm text-gray2'>
            {post.dateString}
          </span>
        </div>
        {post.thumbnail && (
          <div className='w-full max-w-[800px] my-10'>
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
