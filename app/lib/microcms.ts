import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export type News = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
  };
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
};

export type NewsResponse = {
  contents: News[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const getNewsList = async (limit: number = 10): Promise<NewsResponse> => {
  try {
    const data = await client.get<NewsResponse>({
      endpoint: 'news',
      queries: {
        limit,
        orders: '-publishedAt',
      },
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    };
  }
};

export const getNewsDetail = async (contentId: string): Promise<News | null> => {
  try {
    const data = await client.get<News>({
      endpoint: 'news',
      contentId,
    });
    return data;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    return null;
  }
};
