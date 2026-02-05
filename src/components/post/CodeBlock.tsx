'use client';

import React, { useState, ReactNode } from 'react';
import { Copy } from 'lucide-react';

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

const CodeBlock = ({ children }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = extractTextFromChildren(children);
    await navigator.clipboard.writeText(textToCopy.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className='relative group'>
      <pre className='group-hover:bg-gray5 lg:mr-8 lg:mb-4 lg:ml-4'>
        {children}
      </pre>
      <button
        type='button'
        onClick={handleCopy}
        className="absolute top-2 right-0 flex justify-center items-center w-auto h-7 rounded-md bg-amber-400 hover:bg-orange-500 text-white p-1 text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      >
        {copied ? 'Copied!' : <Copy className='size-4' />}
      </button>
    </div>
  );
};

export default CodeBlock;
