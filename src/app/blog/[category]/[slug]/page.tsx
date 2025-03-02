import { Metadata } from 'next';
import { getPostDetail, parsePostAbstract } from '@/utils/postUtils';
import { getPostPaths } from '@/utils/fileUtils';
import { parseToc } from '@/utils/postUtils';
import PostDetailLayout from '@/layouts/PostDetailLayout';
import { blogMetadata } from '@/constants';
interface SlugProps {
  params: { category: string; slug: string };
}

export const dynamicParams = false;

export async function generateMetadata({ params: { category, slug } }: SlugProps): Promise<Metadata> {
  const post = await getPostDetail(category, slug);

  const title = `${ post.title } | hwonda`;

  return {
    title,
    description: post.desc,
    openGraph: {
      title: title,
      description: post.desc,
      url: `${ blogMetadata.url }/posts/${ post.url }`,
      siteName: blogMetadata.name,
      locale: 'ko_KR',
      type: 'article',
      images: [
        {
          url: blogMetadata.thumbnailURL,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: post.desc,
      images: [blogMetadata.thumbnailURL],
    },
  };
}

export async function generateStaticParams() {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .map((item) => ({ category: item.categoryPath, slug: item.slug }));
  return paramList;
}

const PostDetail = async ({ params }: SlugProps) => {
  const post = await getPostDetail(params.category, params.slug);
  const toc = parseToc(post.content);

  return (
    <PostDetailLayout post={post} toc={toc} />
  );
};

export default PostDetail;
