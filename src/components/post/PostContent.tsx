import { Post } from '@/types/post';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MdxComponents from '@/components/MdxComponents';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

interface PostContentProps {
  post: Post;
}

const rehypeOptions = {
  theme: { dark: 'github-dark-dimmed', light: 'github-light' },
  showLineNumbers: true,
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <MDXRemote
      components={MdxComponents}
      source={post.content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, rehypeOptions],rehypeSlug,],
        },
      }}
    />
  );
};

export default PostContent;
