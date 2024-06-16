'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Giscus() {
  const refGiscus = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  
  // dark mode 전환 시 giscus theme 변경
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]);

  useEffect(() => {
    if (!refGiscus.current || refGiscus.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    const attributes = {
      'data-repo': 'hwonda/blog',
      'data-repo-id': 'R_kgDOL-jQOA',
      'data-category': 'Announcements',
      'data-category-id': 'DIC_kwDOL-jQOM4CgHmp',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': theme === 'dark' ? 'dark' : 'light',
      'data-lang': 'en',
      'data-loading': 'lazy',
    };
    
    Object.entries(attributes).forEach(([key, value]) => {
      scriptElem.setAttribute(key, value);
    });
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';
    
    refGiscus.current.appendChild(scriptElem);

  }, [theme]);

  return <div ref={refGiscus}></div>;
}
