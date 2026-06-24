export interface NewsArticle {
  source: {
    name: string;
  };
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string | null;
  content?: string;
}