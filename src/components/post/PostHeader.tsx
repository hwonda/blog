import { Post } from '@/types';
import Image from 'next/image';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className='not-prose mt-5 w-full'>
      <header className='text-center mb-2'>
        <h1 className='text-3xl font-bold'>{post.title}</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{post.desc}</p>
      </header>
      <div className='flex justify-between pb-2 mb-5 border-b dark:border-gray-400'>
        <p className='text-sm text-orange-600 dark:text-orange-400'>{post.categoryPublicName}</p>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{post.dateString}</p>
      </div>
      { post.thumbnail &&
        <div className='relative aspect-video'>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            priority
            className='rounded-md'
          />
        </div>
      }
    </div>
  );
}