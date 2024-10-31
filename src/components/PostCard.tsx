'use client';
import { Post } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Clock3 } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  if (!post) return <div>로딩중ㅎㅎ</div>;
  return (
    <Link href={post.url}>
      <li className='shadow-md hover:shadow-xl border rounded-md h-full transition dark:border-black dark:hover:border-white flex sm:block'>
        <div className='relative sm:m-2 hidden sm:block sm:text-lg sm:w-[calc(100% - 4rem)] aspect-video'>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes='(max-width: 1290px) 100vw, 700px'
            priority
            className='rounded-md'
          />
        </div>
        <div className='flex flex-col px-2 pb-2 m-2 w-full sm:m-0 sm:w-[auto]'>
          <div className='flex justify-between p-1'>
            <div className='w-auto px-3 rounded-full border border-impact-color'>
              <p className='impact-color'>{post.categoryPublicName}</p>
            </div>
            <div className='flex gap-1 items-center'>
              <Clock3 className="size-4 text-active" />
              <span className='text-active'>{post.readingTimes}</span>
              <span className="text-sub">mins {'•'}</span>
              <span className='text-gray-500 dark:text-gray-400'>
                {post.dateString}
              </span>
            </div>
          </div>
          <p className='font-bold text-lg p-1'>{post.title}</p>
        </div>
      </li>
    </Link>
  );
};

export default PostCard;
