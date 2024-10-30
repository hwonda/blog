import { Post } from '@/types';

export interface PostListHeaderProps {
  searchResults: Post[];
  pastSearchValue: string;
  category?: string;
}
export interface PostGridProps {
  posts: Post[];
}

export interface ClientPostListProps {
  initialPosts: Post[];
  category?: string;
}