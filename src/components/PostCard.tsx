import { Post } from '@/src/types/postType'

const PostCard = ({ post }: { post: Post }) => {
  if (!post) return <div>로딩중ㅎㅎ</div>
  return (
    <div className='flex flex-col dark:hover:border-white dark:border-slate-400 shadow-md hover:shadow-xl border rounded-md h-full'>
      <span>{post.title}</span>
      <span>{post.desc}</span>
    </div>
  )
}

export default PostCard
