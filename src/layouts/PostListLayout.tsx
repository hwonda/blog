import PostCard from '@/src/components/PostCard'
import { getPostList } from '@/src/lib/readMdx'

const PostListLayout = async () => {
  const postList = await getPostList()
  return (
    <div className='flex justify-center px-5'>
      <section className='mt-14 w-full max-w-[1200px]'>
        <div className='gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {postList.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default PostListLayout
