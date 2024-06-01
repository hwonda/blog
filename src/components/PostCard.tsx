'use client';
import { Post } from '@/src/types';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  if (!post) return <div>로딩중ㅎㅎ</div>;
  return (
    <Link href={post.url}>
      <li className='dark:hover:border-white dark:border-slate-400 shadow-sm hover:shadow-xl border rounded-md h-full'>
        <div className='m-2 border rounded-md aspect-video'>
          {/* <img src='{post.url}' alt={post.title} /> */}
        </div>
        <div className='flex flex-col px-2'>
          <div className='flex justify-between'>
            <span>{post.dateString}</span>
            <span>{post.categoryPublicName}</span>
          </div>
          <span className='font-bold text-lg'>{post.title}</span>
          <button onClick={() => alert('click!')}>Click me</button>
        </div>
      </li>
    </Link>
  );
};

export default PostCard;