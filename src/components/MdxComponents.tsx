import CodeBlock from './CodeBlock';
import { MDXComponents } from 'mdx/types';

const MdxComponents: MDXComponents = {
  pre: CodeBlock as React.ComponentType,
};

export default MdxComponents;
