import { useEffect, useRef, useState, useCallback } from 'react';

interface TocOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export const useExtractToc = (query: string, options: TocOptions = {}) => {
  // 타입 명시적 선언
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeIdList, setActiveIdList] = useState<Set<string>>(new Set());
  const [tempId, setTempId] = useState<string>('');

  // IntersectionObserver 콜백 함수
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const targetId = `#${entry.target.id}`;
      
      setActiveIdList((prevIds) => {
        const newIds = new Set(prevIds);
        
        if (entry.isIntersecting) {
          newIds.add(targetId);
          setTempId('');
        } else {
          if (newIds.size === 1) {
            setTempId(targetId);
          }
          newIds.delete(targetId);
        }
        
        return newIds;
      });
    });
  }, []);

  // Observer 설정
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      rootMargin: options.rootMargin,
      threshold: options.threshold
    };

    observer.current = new IntersectionObserver(handleIntersection, observerOptions);
    
    const elements = document.querySelectorAll<HTMLElement>(query);
    
    elements.forEach((element) => {
      if (element.id) { // id가 있는 요소만 관찰
        observer.current?.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [query, handleIntersection, options.rootMargin, options.threshold]);

  // 결과 계산 및 반환
  const getActiveIds = useCallback((): string[] => {
    const activeIds = Array.from(activeIdList);
    
    if (activeIds.length === 1) {
      return [activeIds[0]];
    }
    
    return tempId ? [...activeIds, tempId] : activeIds;
  }, [activeIdList, tempId]);

  return getActiveIds();
};