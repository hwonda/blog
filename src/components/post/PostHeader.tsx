import { Post } from '@/types';
import Image from 'next/image';
import ProgressBar from '@/components/ProgressBar';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <>
      <ProgressBar />
      <div className='not-prose mt-10 w-full'>
        <header className='text-center mb-10'>
          <h1 className='text-3xl font-bold'>{post.title}</h1>
          <p className='text-sm mt-2 text-gray-500 dark:text-gray-400'>
            {post.desc}
          </p>
        </header>
        <div className='flex justify-between items-center pb-2 mb-5 border-b dark:border-gray-400'>
          <div className='w-auto px-3 rounded-full border border-impact-color'>
            <p className='impact-color'>{post.categoryPublicName}</p>
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {post.dateString}
          </p>
        </div>
        {post.thumbnail && (
          <div className='relative aspect-video'>
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              priority
              className='rounded-md'
            />
          </div>
        )}
      </div>
    </>
  );
}
