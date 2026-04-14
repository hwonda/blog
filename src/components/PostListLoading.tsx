// 스켈레톤 카드 컴포넌트
const SkeletonPostCard = () => {
  return (
    <li className="py-4 border-b border-gray3 flex justify-between gap-10 px-4 lg:px-0">
      <div className="flex flex-col justify-between gap-1.5 flex-1">
        <div className="h-6 bg-gray-200 rounded-md w-2/5 relative overflow-hidden">
          <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="h-4 bg-gray-200 rounded-md w-full relative overflow-hidden">
            <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
          <div className="h-4 bg-gray-200 rounded-md w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-4 bg-gray-200 rounded-md w-24 relative overflow-hidden">
            <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
          <div className="h-4 bg-gray-200 rounded-md w-16 relative overflow-hidden">
            <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
          <div className="h-4 bg-gray-200 rounded-full w-12 relative overflow-hidden">
            <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
      <div className="w-[220px] h-[120px] shrink-0 bg-gray-200 rounded-md hidden sm:block relative overflow-hidden">
        <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
      </div>
    </li>
  );
};

// 로딩 컴포넌트
export const PostListLoading = () => {
  return (
    <div className="w-full">
      <div className="max-w-[800px] mx-auto px-4 lg:px-0">
        <div className="mb-5 border-b-2 border-gray1 pb-5">
          <div className="h-6 bg-gray1 rounded-md w-40 relative overflow-hidden">
            <div className='absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer' />
          </div>
        </div>
        <ul className="flex flex-col">
          {Array(6).fill(0).map((_, index) => (
            <SkeletonPostCard key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

