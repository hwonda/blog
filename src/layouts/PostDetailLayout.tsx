import PostContent from '@/components/post/PostContent';
import TocContent from '@/components/post/TocContent';
import PostHeader from '@/components/post/PostHeader';
import Giscus from '@/components/post/Giscus';
import SeriesNav from '@/components/post/SeriesNav';
import SeriesNavMobile from '@/components/post/SeriesNavMobile';
import { Post, TocItem, Series } from '@/types';

interface PostDetailProps {
  post: Post;
  toc: TocItem[];
  series?: Series;
  currentPostSlug?: string;
}

const PostDetail = async ({ post, toc, series, currentPostSlug }: PostDetailProps) => {
  return (
    <div className='w-full max-w-[800px] relative flex flex-col mt-10 px-4 lg:px-0'>
      <div className='w-full flex justify-center'>
        <PostHeader post={post} />
      </div>
      {series && currentPostSlug && (
        <SeriesNavMobile series={series} currentPostSlug={currentPostSlug} />
      )}
      <article className='prose dark:prose-invert w-full max-w-[800px] break-all'>
        <PostContent post={post} />
      </article>
      <div className='hidden xl:block absolute h-[calc(100%-720px)] right-[-265px] top-[255px]'>
        <TocContent toc={toc} />
      </div>
      {series && currentPostSlug && (
        <div className='hidden xl:block absolute h-[calc(100%-720px)] left-[-230px] top-[255px]'>
          <div className="sticky top-[120px]">
            <SeriesNav series={series} currentPostSlug={currentPostSlug} />
          </div>
        </div>
      )}
      <Giscus />
    </div>
  );
};

export default PostDetail;
