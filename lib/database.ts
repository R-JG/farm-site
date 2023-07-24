import { prisma } from '@/prisma/database';
import { cache } from 'react';
import { NewNewsPost, NewShopItem, NewBlogPost } from '@/utils/types';


export const getAllNewsPosts = cache(async () => prisma.newsPost.findMany({ 
  orderBy: { createdAt: 'desc' },
  include: { images: true }
}));

export const getNewsPostById = cache(async (id: number) => prisma.newsPost.findUnique({ 
  where: { id },
  include: { images: true } 
}));

export const createNewsPost = async (data: NewNewsPost) => prisma.newsPost.create({ data });

export const createNewsPostImage = async (imageId: string, newsPostId: number) => prisma.newsPostImage.create({
  data: { id: imageId, newsPostId }
});

export const deleteNewsPostById = async (id: number) => prisma.newsPost.delete({ 
  where: { id } 
});

export const deleteAllNewsPostImagesByPostId = async (newsPostId: number) => prisma.newsPostImage.deleteMany({ 
  where: { newsPostId } 
});



export const getAllShopItems = cache(async () => prisma.shopItem.findMany({ 
  orderBy: { createdAt: 'desc' },
  include: { images: true } 
}));

export const getAllShopItemIds = cache(async () => prisma.shopItem.findMany({ 
  select: {id: true } 
}));

export const getShopItemById = cache(async (id: number) => prisma.shopItem.findUnique({ 
  where: { id }, 
  include: { images: true } 
}));

export const createShopItem = async (data: NewShopItem) => prisma.shopItem.create({ data });

export const createShopItemImage = async (imageId: string, shopItemId: number) => prisma.shopItemImage.create({
  data: { id: imageId, shopItemId }
});

export const deleteShopItemById = async (id: number) => prisma.shopItem.delete({ 
  where: { id } 
});

export const deleteAllShopItemImagesByItemId = async (shopItemId: number) => prisma.shopItemImage.deleteMany({ 
  where: { shopItemId } 
});



export const getAllBlogPosts = cache(async () => prisma.blogPost.findMany({ 
  orderBy: { createdAt: 'desc' },
  include: { images: true }
}));

export const getAllBlogPostIds = cache(async () => prisma.blogPost.findMany({ 
  select: {id: true } 
}));

export const getBlogPostById = cache(async (id: number) => prisma.blogPost.findUnique({ 
  where: { id },
  include: { images: true }
}));

export const createBlogPost = async (data: NewBlogPost) => prisma.blogPost.create({ data });

export const createBlogPostImage = async (imageId: string, blogPostId: number) => prisma.blogPostImage.create({
  data: { id: imageId, blogPostId }
});

export const deleteBlogPostById = async (id: number) => prisma.blogPost.delete({ 
  where: { id } 
});

export const deleteAllBlogPostImagesByPostId = async (blogPostId: number) => prisma.blogPostImage.deleteMany({ 
  where: { blogPostId } 
});



export const getUserByEmail = cache(async (email: string) => prisma.user.findUnique({ 
  where: { email } 
}));