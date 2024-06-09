import { Post } from '@/types/post';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

interface Props {
  post: Post;
}

const PostContent = ({ post }: Props) => {
  return (
    <MDXRemote
      source={post.content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: { dark: 'github-dark-dimmed', light: 'github-light' },
              },
            ],
            rehypeSlug,
          ],
        },
      }}
    />
  );
};

export default PostContent;
