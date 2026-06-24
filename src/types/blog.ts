export interface BlogSection {
  title: string;
  image?: string;
  content: string;
  points?: string[];
}

export interface BlogFeature {
  title: string;
  description: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface Blog {
  id: number;

  title: string;
  slug: string;

  category: string;
  country?: string;

  image: string;

  author: string;

  publishedAt: string;
  updatedAt?: string;

  readTime?: string;

  excerpt: string;

  metaDescription?: string;
  keywords?: string;

  quickAnswer?: {
    title: string;
    answer: string;
  };

  introduction?: string[];

  highlights?: string[];

  travelTips?: string[];

  sections?: BlogSection[];

  quote?: string;

  pros?: string[];

  cons?: string[];

  features?: BlogFeature[];

  finalThoughts?: string;

  faqs?: BlogFaq[];

  relatedBlogs?: string[];

  relatedPackages?: number[];
}
