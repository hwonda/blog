import PostListLayout from '@/layouts/PostListLayout';
import { getCategoryList } from '@/utils/categoryUtils';

interface CategoryProps {
  params: { category: string };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const categoryList = getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

const CategoryPage = async ({ params }: CategoryProps) => {
  return <PostListLayout category={params.category} />;
};

export default CategoryPage;
