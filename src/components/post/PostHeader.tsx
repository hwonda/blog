import { Post } from '@/types';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <>
      <header className='flex flex-col items-center mb-2'>
        <h1 className='text-3xl font-bold'>{post.title}</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{post.desc}</p>
      </header>
      <div className='flex justify-between w-full max-w-[720px] pb-2 mb-10 border-b dark:border-gray-400'>
        <p className='text-sm text-orange-600 dark:text-orange-400'>tag: {post.categoryPublicName}</p>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{post.dateString}</p>
      </div>
    </>
  );
}