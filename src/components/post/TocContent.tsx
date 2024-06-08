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
  
  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    const targetId = link.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = -50; // 헤더 높이에 따른 오프셋 조정
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  return (
    <div className='fixed hidden xl:block top-[180px] w-[280px] right-5 ml-10'>
      <h3 className=' mb-2 text-lg font-bold'>목차</h3>
      <ul className='pl-4'>
        {toc.map((item, i) => {
          const isActiveContentHead = tocList.includes(item.link);
          return (
            <li key={i} className='mb-2'>
            <Link href={item.link} onClick={(e) => handleLinkClick(e,item.link)}>
                <span className={`hover:underline ${isActiveContentHead ? 'text-orange-500' : ''}`}>
                  {item.text}
                </span>
            </Link>
          </li>
          )
        }
        )}
      </ul>
    </div>
  );
};

export default TocContent;
