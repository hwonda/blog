import { Post } from '@/src/types';

interface PostProps {
  post: Post;
}

const Post = ({ post }: PostProps) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.dateString}</p>
      <p>{post.desc}</p>
    </div>
  );
};

export default Post;
