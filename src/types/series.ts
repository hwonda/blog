import { Post } from './post';

export interface SeriesMetadata {
  title: string;
  desc: string;
  thumbnail: string;
}

export interface Series extends SeriesMetadata {
  slug: string;
  url: string;
  posts: Post[];
  postCount: number;
}

export interface SeriesCard {
  title: string;
  desc: string;
  slug: string;
  url: string;
  thumbnail: string;
  postCount: number;
}
