import { Metadata } from 'next';
import { getSeries, getSeriesSlugs } from '@/utils/seriesUtils';
import { blogMetadata } from '@/constants';
import SeriesTocPage from '@/components/series/SeriesTocPage';

interface SeriesPageProps {
  params: Promise<{ series: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getSeriesSlugs();
  return slugs.map((series) => ({ series }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { series: seriesSlug } = await params;
  const series = await getSeries(seriesSlug);
  const title = `${ series.title } | ${ blogMetadata.name }`;

  return {
    title,
    description: series.desc,
    openGraph: {
      title,
      description: series.desc,
      url: `${ blogMetadata.url }/blog/series/${ seriesSlug }`,
      siteName: blogMetadata.name,
      locale: 'ko_KR',
      type: 'website',
      images: series.thumbnail ? [{ url: series.thumbnail }] : [],
    },
  };
}

const SeriesPage = async ({ params }: SeriesPageProps) => {
  const { series: seriesSlug } = await params;
  const series = await getSeries(seriesSlug);
  return <SeriesTocPage series={series} />;
};

export default SeriesPage;
