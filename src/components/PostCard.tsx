import { SearchDocument } from '@/types/search';
import Link from 'next/link';
import Image from 'next/image';
import { Clock3 } from 'lucide-react';

interface PostCardProps {
  post: SearchDocument;
  onTagClick?: (tag: string)=> void;
}

const PostCard = ({ post, onTagClick }: PostCardProps) => {
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    onTagClick?.(tag);
  };

  return (
    <Link href={post.url}>
      <li className="group py-4 border-b border-gray3 transition flex justify-between gap-10 px-4 lg:px-0">
        <div className="flex flex-col justify-between gap-1.5">
          <div className="text-lg font-semibold group-hover:text-accent1 transition-colors">
            {post.title}
          </div>
          <p className="text-sub text-sm line-clamp-2 flex-1 transition-colors">
            {post.desc}
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-1 text-[13px] text-gray1">
              <span>{post.createdDate}</span>
              <span>{'발행'}</span>
              <span className="px-0.5 text-gray3">{'·'}</span>
              {post.modifiedDate && (
                <>
                  <span>{post.modifiedDate}</span>
                  <span>{'수정'}</span>
                  <span className="px-0.5 text-gray3">{'·'}</span>
                </>
              )}
              <Clock3 className="size-3" />
              <span>{post.readingTimes}{'분'}</span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={(e) => handleTagClick(e, tag)}
                    className="px-2 py-0.5 rounded-full bg-tag text-tag-text text-xs hover:bg-tag-hover transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {post.thumbnail && (
          <div className="relative w-[220px] h-[120px] shrink-0 overflow-hidden rounded-md hidden sm:block">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="eager"
            />
          </div>
        )}
      </li>
    </Link>
  );
};

export default PostCard;
