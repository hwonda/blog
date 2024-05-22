const PostListLayout = () => {
  return (
    <div className='flex justify-center px-5'>
      <section className='mt-14 w-full max-w-[1200px]'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <div className='border rounded'>글1</div>
          <div className='border rounded'>글1</div>
          <div className='border rounded'>글1</div>
        </div>
      </section>
    </div>
  )
}

export default PostListLayout
