'use client';

import Link from 'next/link';

// import CopyLinkButton from '../common/CopyLinkButton';
// import { ScrollToComment, ScrollTop } from '../common/TocButtons';
import { TocItem } from '@/src/types/toc';
import { useExtractToc } from '@/src/hooks/useExtractToc';
// import { cn } from '@/lib/utils';

interface Props {
  toc: TocItem[];
}

const TocContent = ({ toc }: Props) => {
  const tocList = useExtractToc('h2, h3');
  console.log('::', tocList);

  return (
    <div className='sticky hidden xl:block top-[180px] ml-10'>
      <h3 className=' mb-2 text-lg font-bold'>목차</h3>
      <ul className='pl-4'>
        {toc.map((item, i) => (
          <li key={i} className='mb-2'>
            <Link href={item.link}>
              <span className='hover:underline'>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TocContent;
