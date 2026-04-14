const Shimmer = () => (
  <div className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-gray4 to-transparent animate-shimmer" />
);

// 시리즈 카드 스켈레톤
const SkeletonSeriesCard = () => (
  <div className="w-[240px] shrink-0 rounded-lg border border-gray2 overflow-hidden">
    <div className="h-[120px] w-full bg-gray3 relative overflow-hidden">
      <Shimmer />
    </div>
    <div className="p-3">
      <div className="h-4 bg-gray3 rounded-md w-3/4 relative overflow-hidden">
        <Shimmer />
      </div>
      <div className="mt-1.5 space-y-1">
        <div className="h-3 bg-gray3 rounded-md w-full relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="h-3 bg-gray3 rounded-md w-2/3 relative overflow-hidden">
          <Shimmer />
        </div>
      </div>
      <div className="mt-2 h-3 bg-gray3 rounded-md w-10 relative overflow-hidden">
        <Shimmer />
      </div>
    </div>
  </div>
);

// 시리즈 캐러셀 스켈레톤
const SkeletonSeriesCarousel = ({ count }: { count: number }) => {
  if (count === 0) return null;

  return (
    <div className="w-full mb-8 px-4 lg:px-0">
      <div className="flex flex-col gap-0.5 mb-3">
        <div className="h-7 bg-gray3 rounded-md w-16 relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="h-5 bg-gray3 rounded-md w-36 relative overflow-hidden">
          <Shimmer />
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array(count).fill(0).map((_, index) => (
          <SkeletonSeriesCard key={index} />
        ))}
      </div>
    </div>
  );
};

// 포스트 카드 스켈레톤
const SkeletonPostCard = () => (
  <li className="py-4 border-b border-gray3 flex justify-between gap-10 px-4 lg:px-0">
    <div className="flex flex-col justify-between gap-1.5 flex-1">
      <div className="h-6 bg-gray3 rounded-md w-2/5 relative overflow-hidden">
        <Shimmer />
      </div>

      <div className="space-y-1.5 flex-1">
        <div className="h-4 bg-gray3 rounded-md w-full relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="h-4 bg-gray3 rounded-md w-3/4 relative overflow-hidden">
          <Shimmer />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="h-4 bg-gray3 rounded-md w-24 relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="h-4 bg-gray3 rounded-md w-16 relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="h-4 bg-gray3 rounded-full w-12 relative overflow-hidden">
          <Shimmer />
        </div>
      </div>
    </div>
    <div className="w-[220px] h-[120px] shrink-0 bg-gray3 rounded-md hidden sm:block relative overflow-hidden">
      <Shimmer />
    </div>
  </li>
);

// 로딩 컴포넌트
interface PostListLoadingProps {
  seriesCount?: number;
}

export const PostListLoading = ({ seriesCount = 0 }: PostListLoadingProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[800px]">
        <SkeletonSeriesCarousel count={seriesCount} />
        <div>
          <div className="px-4 lg:px-0 mb-5 border-b-2 border-gray1 pb-5 flex flex-col gap-0.5">
            <div className="h-7 bg-gray1 rounded-md w-40 relative overflow-hidden">
              <Shimmer />
            </div>
            <div className="h-5 bg-gray3 rounded-md w-44 relative overflow-hidden">
              <Shimmer />
            </div>
          </div>
          <ul className="flex flex-col">
            {Array(6).fill(0).map((_, index) => (
              <SkeletonPostCard key={index} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
