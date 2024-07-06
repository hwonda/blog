import { useEffect, useRef, useState, useCallback } from 'react';

export const useExtractToc = (query: string) => {
  const observer = useRef<IntersectionObserver>();
  const [activeIdList, setActiveIdList] = useState<string[]>([]);
  const [tempId, setTempId] = useState('');

  const handleObserver = useCallback<IntersectionObserverCallback>(
    (entries) => {
      entries.forEach((entry) => {
        const targetId = `#${entry.target.id}`;
        if (entry.isIntersecting) {
          setActiveIdList((prev) => [...prev, targetId]);
          setTempId(() => '');
        } else {
          setActiveIdList((prev) => {
            if (prev.length === 1) setTempId(targetId);
            return prev.filter((elem) => elem !== targetId);
          });
        }
      });
    },
    []
  );

  useEffect(() => {
    // IntersectionObserver를 설정하고 한 번만 초기화
    observer.current = new IntersectionObserver(
      handleObserver,
    );

    const elements = document.querySelectorAll(query);
    elements.forEach((elem) => observer.current?.observe(elem));

    return () => observer.current?.disconnect();
  }, [handleObserver, query]); // handleObserver와 query가 변경될 때만 실행

  const firstElement = activeIdList[0];
  const lastElement = activeIdList[activeIdList.length - 1];

  if (activeIdList.length > 1 && firstElement === lastElement) {
    return [lastElement];
  }

  return [...activeIdList, tempId];
};
