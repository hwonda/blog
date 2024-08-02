'use client';

import Link from 'next/link';
import { TocItem } from '@/types/toc';
import { useExtractToc } from '@/hooks/useExtractToc';

interface Props {
  toc: TocItem[];
}

const TocContent = ({ toc }: Props) => {
  const tocList = useExtractToc('h2, h3');
  // console.log('tocList', tocList);
  
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
    <div className='not-prose fixed hidden xl:block top-[15.75rem] w-full max-w-[15rem] toc-position'>
      <span className='font-bold text-sm'>목차</span>
      <ul className='mt-2'>
        {toc.map((item, i) => {
          const isH3 = item.indent === 1;
          const isActiveContentHead = tocList.includes(item.link);

          const baseClasses = 'pl-2 py-1 transition-all duration-300';
          const activeClasses = isActiveContentHead ? 'font-semibold text-orange-600 dark:text-orange-400 pl-1.5 dark:hover:text-orange-700' : '';
          const indentClasses = isH3 ? 'pl-5 text-xs' : '';

          return (
            <li key={i} className='text-sm'>
              <Link href={item.link} onClick={(e) => handleLinkClick(e, item.link)}>
                <div className='flex'>
                  <div
                    className={`${baseClasses} ${
                      isActiveContentHead
                        ? 'border-l border-orange-600 dark:border-orange-400 pl-1.5'
                        : 'border-l border-gray-300 dark:border-gray-500'
                    }`}
                  ></div>
                  <span
                    className={`${baseClasses} hover:text-orange-700 ${activeClasses} ${indentClasses}`}
                  >
                    {item.text}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TocContent;
