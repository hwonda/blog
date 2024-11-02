import { Post } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Clock3, Calendar } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  if (!post) return <div>로딩중ㅎㅎ</div>;
  return (
    <Link href={post.url}>
      <li className='group shadow-md hover:shadow-xl border rounded-md h-full transition dark:border-cyan-900 dark:hover:border-white flex sm:block'>
        <div className='relative sm:m-2 hidden sm:block sm:text-lg sm:w-[calc(100% - 4rem)] aspect-video overflow-hidden'>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes='(max-width: 1290px) 100vw, 700px'
            priority
            className='rounded-md transform transition-transform duration-300 ease-in-out group-hover:scale-105'
          />
        </div>
        <div className='flex flex-col px-2 pb-2 m-2 w-full sm:m-0 sm:w-[auto]'>
          <div className='flex justify-between p-1'>
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
          <span className='font-bold text-lg p-1'>{post.title}</span>
          <span className='text-sub font-semibold text-sm p-1'>
            {post.desc}
          </span>
        </div>
      </li>
    </Link>
  );
};

export default PostCard;
