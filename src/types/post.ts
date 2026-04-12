export interface PostFrontmatter {
  title: string;
  createdDate: Date;
  modifiedDate?: Date;
  desc: string;
  thumbnail: string;
  tags?: string[];
}

export interface ParsedPost {
  title: string;
  createdDate: string;
  modifiedDate: string | null;
  desc: string;
  thumbnail: string;
  tags: string[];
}

export interface Post extends ParsedPost {
  url: string;
  slug: string;
  categoryPath: string;
  content: string;
  readingTimes: number;
  categoryPublicName: string;
}
