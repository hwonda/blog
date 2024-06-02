export interface ParsedPost {
  title: string;
  date: Date;
  dateString: string;
  desc: string;
  thumbnail: string;
}

export interface Post extends ParsedPost {
  url: string;
  slug: string;
  categoryPath: string;
  content: string;
  categoryPublicName: string;
}
