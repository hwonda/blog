'use client';
import { Post } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  if (!post) return <div>로딩중ㅎㅎ</div>;
  return (
    <Link href={post.url}>
      <li className='shadow-md hover:shadow-xl border rounded-md h-full transition dark:border-black dark:hover:border-white'>
        <div className='relative m-2 w-[calc(100% - 4rem)] aspect-video'>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes='(max-width: 1290px) 100vw, 700px'
            priority
            className='rounded-md'
          />
        </div>
        <div className='flex flex-col px-2 pb-2'>
          <div className='flex justify-between'>
            <p>{post.dateString}</p>
            <p className='impact-color'>{post.categoryPublicName}</p>
          </div>
          <p className='font-bold text-lg'>{post.title}</p>
        </div>
      </li>
    </Link>
  );
};

export default PostCard;
