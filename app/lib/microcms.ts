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
  description?: string;
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

// Blog type (same structure as News for now, but can be customized)
export type Blog = {
  id: string;
  title: string;
  content: string;
  description?: string;
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
  tags?: string[];
};

export type BlogResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

// Category type
export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type CategoryResponse = {
  contents: Category[];
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

// Blog API functions - fetch from both blogs and news endpoints
export const getBlogList = async (
  limit: number = 100,
  filters?: string
): Promise<BlogResponse> => {
  try {
    const queries: any = {
      limit,
      orders: '-publishedAt',
    };
    
    if (filters) {
      queries.filters = filters;
    }
    
    // Fetch from both blogs and news endpoints
    const [blogsData, newsData] = await Promise.allSettled([
      client.get<BlogResponse>({
        endpoint: 'blogs',
        queries,
      }),
      client.get<BlogResponse>({
        endpoint: 'news',
        queries,
      }),
    ]);
    
    // Merge results from both endpoints
    const blogsContent = blogsData.status === 'fulfilled' ? blogsData.value.contents : [];
    const newsContent = newsData.status === 'fulfilled' ? newsData.value.contents : [];
    
    const allContents = [...blogsContent, ...newsContent];
    
    // Sort by publishedAt (newest first)
    allContents.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Apply limit after merging
    const limitedContents = allContents.slice(0, limit);
    
    return {
      contents: limitedContents,
      totalCount: allContents.length,
      offset: 0,
      limit,
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    };
  }
};

export const getBlogDetail = async (contentId: string): Promise<Blog | null> => {
  try {
    // Try blogs endpoint first
    const blogsData = await client.get<Blog>({
      endpoint: 'blogs',
      contentId,
    });
    return blogsData;
  } catch (error) {
    // Fallback to news endpoint
    try {
      const newsData = await client.get<Blog>({
        endpoint: 'news',
        contentId,
      });
      return newsData;
    } catch (fallbackError) {
      console.error('Error fetching blog detail:', error, fallbackError);
      return null;
    }
  }
};

// Get blogs by category (from both endpoints)
export const getBlogsByCategory = async (
  categoryId: string,
  limit: number = 100
): Promise<BlogResponse> => {
  const filters = `category[equals]${categoryId}`;
  return getBlogList(limit, filters);
};

// Get all categories
export const getCategoryList = async (): Promise<CategoryResponse> => {
  try {
    const data = await client.get<CategoryResponse>({
      endpoint: 'category',
      queries: {
        limit: 100,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    };
  }
};
