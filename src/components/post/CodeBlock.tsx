'use client';

import React, { useState, ReactNode } from 'react';
import Image from 'next/image';

interface CodeBlockProps {
  children: ReactNode;
}

function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (React.isValidElement(children) && children.props.children) {
    return extractTextFromChildren(children.props.children);
  }
  return '';
}

const CodeBlock = ({ children } : CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = extractTextFromChildren(children);
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };

  return (
    <>
      <pre className='relative'>
        {children}
        <button
          type='button'
          onClick={handleCopy}
          className="absolute top-2 right-2 flex justify-center items-center w-auto h-7 rounded-md bg-amber-300 hover:bg-orange-500 text-white px-1 py-1 text-sm"
        >
          {copied ? 'Copied!' : <Image src="/images/copy.svg" alt="" width={20} height={20} />}
        </button>
      </pre>
    </>
  );
};

export default CodeBlock;
