import { 
  NewsPost as NewsPost_PrismaSchema, 
  BlogPost as BlogPost_PrismaSchema,
  ShopItem as ShopItem_PrismaSchema,
  NewsPostImage, ShopItemImage, BlogPostImage
} from '@prisma/client';

export type NewsPost = NewsPost_PrismaSchema & { images: NewsPostImage[] };

export type NewNewsPost = Omit<NewsPost, 'id' | 'createdAt' | 'updatedAt' | 'images'>;

export type BlogPost = BlogPost_PrismaSchema & { images: BlogPostImage[] };

export type NewBlogPost = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'images'>;

export type ShopItem = ShopItem_PrismaSchema & { images: ShopItemImage[] };

export type NewShopItem = Omit<ShopItem, 'id' | 'createdAt' | 'updatedAt' | 'images'>;


export type CartItem = { shopItemId: string, quantity: number };