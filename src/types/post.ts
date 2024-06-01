export interface ParsedPost {
  title: string;
  date: Date;
  dateString: string;
  url: string;
  desc: string;
}

export interface Post extends ParsedPost {
  url: string;
  slug: string;
  categoryPath: string;
  content: string;
  categoryPublicName: string;
}
