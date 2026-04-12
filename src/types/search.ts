export interface SearchDocument {
  title: string;
  desc: string;
  url: string;
  categoryPath: string;
  categoryPublicName: string;
  createdDate: string;
  modifiedDate: string | null;
  thumbnail: string;
  readingTimes: number;
  tags: string[];
}

export interface PostListHeaderProps {
  searchResults: SearchDocument[];
  pastSearchValue: string;
  category?: string;
  selectedTag?: string | null;
  count: number;
}

export interface PostGridProps {
  posts: SearchDocument[];
}

export interface ClientPostListProps {
  initialPosts: SearchDocument[];
  category?: string;
  seriesCards?: import('./series').SeriesCard[];
}
