import PostListLayout from '@/src/layouts/PostListLayout';
import { getCategoryList } from '@/src/utils/categoryUtils';

type Props = {
  params: { category: string };
};

export async function generateStaticParams() {
  const categoryList = getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

const CategoryPage = async ({ params }: Props) => {
  console.log(params.category);
  return <PostListLayout category={params.category} />;
};

export default CategoryPage;
