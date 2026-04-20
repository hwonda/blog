import { PostListHeaderProps } from '@/types/search';

interface TitleBlockProps {
  title: string;
  subtitle: string;
  count?: number;
  className?: string;
}

const CountBadge = ({ count }: { count: number }) => (
  <span className='ml-2 text-base font-normal text-gray1'>{'('}{count}{')'}</span>
);

const TitleBlock = ({ title, subtitle, count, className = '' }: TitleBlockProps) => (
  <div className={`flex flex-col gap-0.5 ${ className }`}>
    <strong className='text-xl'>
      {title}
      {count !== undefined && <CountBadge count={count} />}
    </strong>
    <p className='text-sm text-gray1'>{subtitle}</p>
  </div>
);

const SearchResultHeader = ({ query, hasResults, count }: { query: string; hasResults: boolean; count: number }) => (
  <div>
    <span className='mr-1 font-bold'>{`'${ query }'`}</span>
    {hasResults ? '에 대한 검색결과' : '에 대한 검색 결과가 없습니다.'}
    {hasResults && <CountBadge count={count} />}
    {hasResults ? (
      <p className='mt-1 text-sm text-gray1'>{'검색결과가 관련도 순으로 정렬됩니다.'}</p>
    ) : (
      <TitleBlock
        title='Other posts'
        subtitle='블로그 내 전체 포스트'
        className='mt-8 pt-5 border-t-2 border-gray1'
      />
    )}
  </div>
);

const PostListHeader = ({ searchResults, pastSearchValue, selectedTag, count }: PostListHeaderProps) => {
  const renderContent = () => {
    if (pastSearchValue) {
      return (
        <SearchResultHeader
          query={pastSearchValue}
          hasResults={searchResults.length > 0}
          count={count}
        />
      );
    }
    if (selectedTag) {
      return <TitleBlock title='Tagged Posts' subtitle='블로그 내 태그 관련 포스트' count={count} />;
    }
    return <TitleBlock title='All posts' subtitle='블로그 내 전체 포스트' count={count} />;
  };

  return (
    <div className='border-b-2 border-gray1 pb-5 px-4 lg:px-0'>
      <div className='text-xl'>
        {renderContent()}
      </div>
    </div>
  );
};

export default PostListHeader;
