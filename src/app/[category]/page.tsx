import { Metadata } from 'next';
import PostListLayout from '@/layouts/PostListLayout';
import { getCategoryList, getCategoryPublicName, getCategoryDescription } from '@/utils/categoryUtils';
import { blogMetadata } from '@/constants';

interface CategoryProps {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const categoryList = getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

export async function generateMetadata({ params }: CategoryProps): Promise<Metadata> {
  const { category } = await params;
  const publicName = getCategoryPublicName(category);
  const description = getCategoryDescription(category);
  const title = `${ publicName } | ${ blogMetadata.name }`;
  const categoryUrl = `${ blogMetadata.siteUrl }/${ category }`;

  return {
    title,
    description,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title,
      description,
      url: categoryUrl,
      siteName: blogMetadata.name,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const CategoryPage = async ({ params }: CategoryProps) => {
  const { category } = await params;
  return <PostListLayout category={category} />;
};

export default CategoryPage;
