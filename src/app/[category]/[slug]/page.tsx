import { Metadata } from 'next';
import { getPostDetail, parsePostAbstract } from '@/utils/postUtils';
import { getPostPaths } from '@/utils/fileUtils';
import { parseToc } from '@/utils/postUtils';
import PostDetailLayout from '@/layouts/PostDetailLayout';
import { blogMetadata } from '@/constants';

interface SlugProps {
  params: Promise<{ category: string; slug: string }>;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPostDetail(category, slug);

  const title = `${ post.title } | 주다훤 블로그`;
  const postUrl = `${ blogMetadata.siteUrl }/${ post.categoryPublicName }/${ post.url }`;
  const thumbnailUrl = `${ blogMetadata.siteUrl }/posts/${ post.categoryPublicName }/${ post.slug }/thumbnail.png`;

  return {
    title,
    description: post.desc,
    keywords: post.tags,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: title,
      description: post.desc,
      url: postUrl,
      siteName: blogMetadata.name,
      locale: 'ko_KR',
      type: 'article',
      images: [
        {
          url: thumbnailUrl,
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
      images: [thumbnailUrl],
    },
  };
}

export async function generateStaticParams() {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .filter((item) => !('seriesSlug' in item))
    .map((item) => ({ category: item.categoryPath, slug: item.slug }));
  return paramList;
}

const PostDetail = async ({ params }: SlugProps) => {
  const { category, slug } = await params;
  const post = await getPostDetail(category, slug);
  const toc = parseToc(post.content);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.desc,
    'url': `${ blogMetadata.siteUrl }/${ post.categoryPublicName }/${ post.url }`,
    'image': `${ blogMetadata.siteUrl }/posts/${ post.categoryPublicName }/${ post.slug }/thumbnail.png`,
    'datePublished': post.createdDate,
    'dateModified': post.modifiedDate || post.createdDate,
    'author': {
      '@type': 'Person',
      'name': blogMetadata.author.name,
      'url': blogMetadata.author.contacts.github,
    },
    'publisher': {
      '@type': 'Person',
      'name': blogMetadata.author.name,
    },
    'keywords': post.tags.join(', '),
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PostDetailLayout post={post} toc={toc} />
    </>
  );
};

export default PostDetail;
