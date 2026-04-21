import { Metadata } from 'next';
import { getPostDetail, parsePostAbstract } from '@/utils/postUtils';
import { getPostPaths } from '@/utils/fileUtils';
import { parseToc } from '@/utils/postUtils';
import PostDetailLayout from '@/layouts/PostDetailLayout';
import { blogMetadata } from '@/constants';

interface SlugProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetail(slug);

  const title = `${ post.title } | ${ blogMetadata.name }`;
  const postUrl = `${ blogMetadata.siteUrl }/${ slug }`;

  return {
    title,
    description: post.desc,
    keywords: post.tags,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description: post.desc,
      url: postUrl,
      siteName: blogMetadata.name,
      locale: 'ko_KR',
      type: 'article',
      images: post.thumbnail
        ? [{ url: `${ blogMetadata.url }${ post.thumbnail }`, width: 1200, height: 630, alt: title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.desc,
      images: post.thumbnail ? [`${ blogMetadata.url }${ post.thumbnail }`] : [],
    },
  };
}

export async function generateStaticParams() {
  const postPaths = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .filter((item) => !('seriesSlug' in item))
    .map((item) => ({ slug: item.slug }));
  return paramList;
}

const PostDetail = async ({ params }: SlugProps) => {
  const { slug } = await params;
  const post = await getPostDetail(slug);
  const toc = parseToc(post.content);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.desc,
    'url': `${ blogMetadata.siteUrl }/${ slug }`,
    'image': post.thumbnail ? `${ blogMetadata.url }${ post.thumbnail }` : undefined,
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
