import { 
  HomePost as HomePost_PrismaSchema, 
  BlogPost as BlogPost_PrismaSchema,
  ShopItem as ShopItem_PrismaSchema
} from '@prisma/client';

export type HomePost = HomePost_PrismaSchema;

export type NewHomePost = Omit<HomePost, 'id' | 'createdAt' | 'updatedAt'>;

export type BlogPost = BlogPost_PrismaSchema;

export type NewBlogPost = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;

export type ShopItem = ShopItem_PrismaSchema;

export type NewShopItem = Omit<ShopItem, 'id' | 'createdAt' | 'updatedAt'>;