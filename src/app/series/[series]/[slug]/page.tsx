import { Metadata } from 'next';
import { getSeries, getSeriesPosts, getSeriesSlugs } from '@/utils/seriesUtils';
import { parseToc } from '@/utils/postUtils';
import PostDetailLayout from '@/layouts/PostDetailLayout';
import { blogMetadata } from '@/constants';

interface SeriesPostPageProps {
  params: Promise<{ series: string; slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const seriesSlugs = getSeriesSlugs();
  const params: { series: string; slug: string }[] = [];
  for (const seriesSlug of seriesSlugs) {
    const posts = await getSeriesPosts(seriesSlug);
    posts.forEach((post) => {
      params.push({ series: seriesSlug, slug: post.slug });
    });
  }
  return params;
}

export async function generateMetadata({ params }: SeriesPostPageProps): Promise<Metadata> {
  const { series: seriesSlug, slug } = await params;
  const series = await getSeries(seriesSlug);
  const post = series.posts.find((p) => p.slug === slug);
  if (!post) return {};

  const title = `${ post.title } | ${ series.title } | ${ blogMetadata.name }`;

  return {
    title,
    description: post.desc,
    openGraph: {
      title,
      description: post.desc,
      url: `${ blogMetadata.url }/blog/series/${ seriesSlug }/${ slug }`,
      siteName: blogMetadata.name,
      locale: 'ko_KR',
      type: 'article',
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.desc,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

const SeriesPostPage = async ({ params }: SeriesPostPageProps) => {
  const { series: seriesSlug, slug } = await params;
  const series = await getSeries(seriesSlug);
  const post = series.posts.find((p) => p.slug === slug);
  if (!post) return null;

  const toc = parseToc(post.content);

  return (
    <PostDetailLayout
      post={post}
      toc={toc}
      series={series}
      currentPostSlug={slug}
    />
  );
};

export default SeriesPostPage;
