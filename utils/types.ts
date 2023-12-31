import { 
  NewsPost as NewsPost_PrismaSchema, 
  BlogPost as BlogPost_PrismaSchema,
  ShopItem as ShopItem_PrismaSchema,
  NewsPostImage, ShopItemImage, BlogPostImage,
  ShopItemPrice as ShopItemPrice_PrismaSchema
} from '@prisma/client';

export type NewsPost = NewsPost_PrismaSchema & { images: NewsPostImage[] };

export type NewNewsPost = Omit<NewsPost, 'id' | 'createdAt' | 'updatedAt' | 'images'>;

export type BlogPost = BlogPost_PrismaSchema & { images: BlogPostImage[] };

export type NewBlogPost = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'images'>;

export type ShopItem = ShopItem_PrismaSchema & { price: ShopItemPrice[], images: ShopItemImage[] };

export type NewShopItem = Omit<ShopItem, 'id' | 'createdAt' | 'updatedAt' | 'images' | 'price'>;

export type ShopItemPrice = ShopItemPrice_PrismaSchema;


export type CartItem = { priceId: string, shopItemId: string, quantity: number };