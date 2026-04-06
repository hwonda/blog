import { SearchDocument } from '@/types/search';
import Link from 'next/link';
import Image from 'next/image';
import { Clock3, Calendar } from 'lucide-react';

interface PostCardProps {
  post: SearchDocument;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={post.url}>
      <li className='group shadow-md hover:shadow-xl border rounded-xl h-full transition hover:border-accent1 flex sm:block'>
        <div className='relative sm:m-2 hidden sm:block sm:text-lg sm:w-[calc(100% - 4rem)] aspect-video overflow-hidden'>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes='(max-width: 1290px) 100vw, 700px'
            priority
            className='rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105'
          />
        </div>
        <div className='flex flex-col px-2 pb-2 m-2 w-full sm:m-0 sm:w-auto'>
          <span className='font-semibold p-1'>{post.title}</span>
          <span className='text-sub text-sm p-1 truncate max-w-[300px]'>
            {post.desc}
          </span>
          <div className='flex justify-between p-1 text-sm'>
            <span className='text-impact'>{post.categoryPublicName}</span>
            <div className='flex gap-1 items-center text-[13px]'>
              <Clock3 className="size-3 text-gray1" />
              <span className="text-gray1">{post.readingTimes}{'분'}</span>
              <span className='text-gray3'>{'•'}</span>
              <Calendar className="size-3 text-gray1" />
              <span className='text-gray1'>
                {post.dateString}
              </span>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default PostCard;
