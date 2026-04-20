export interface SearchDocument {
  title: string;
  desc: string;
  url: string;
  createdDate: string;
  modifiedDate: string | null;
  thumbnail: string;
  readingTimes: number;
  tags: string[];
}

export interface PostListHeaderProps {
  searchResults: SearchDocument[];
  pastSearchValue: string;
  selectedTag?: string | null;
  count: number;
}

export interface PostGridProps {
  posts: SearchDocument[];
}

export interface ClientPostListProps {
  initialPosts: SearchDocument[];
  seriesCards?: import('./series').SeriesCard[];
}
