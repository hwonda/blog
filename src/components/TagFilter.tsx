'use client';

import { RotateCcw } from 'lucide-react';
import { TitleBlock } from '@/components/PostListHeader';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagClick: (tag: string)=> void;
  onReset: ()=> void;
}

const TagFilter = ({ allTags, selectedTags, onTagClick, onReset }: TagFilterProps) => {
  return (
    <>
      <TitleBlock title='Tags' />
      <div className="flex items-center gap-2 flex-wrap px-4 lg:px-0">
        {selectedTags.length > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-gray1 hover:text-main border border-gray3 hover:border-gray1 transition-colors"
          >
            <RotateCcw className="size-3" />
            {'초기화'}
          </button>
        )}
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onTagClick(tag)}
              className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                isSelected
                  ? 'bg-accent1 text-white'
                  : 'bg-tag text-tag-text hover:bg-tag-hover'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TagFilter;
