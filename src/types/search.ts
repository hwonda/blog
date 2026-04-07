export interface SearchDocument {
  title: string;
  desc: string;
  url: string;
  categoryPath: string;
  categoryPublicName: string;
  date: Date;
  dateString: string;
  thumbnail: string;
  readingTimes: number;
  tags: string[];
}

export interface PostListHeaderProps {
  searchResults: SearchDocument[];
  pastSearchValue: string;
  category?: string;
}

export interface PostGridProps {
  posts: SearchDocument[];
}

export interface ClientPostListProps {
  initialPosts: SearchDocument[];
  category?: string;
}
