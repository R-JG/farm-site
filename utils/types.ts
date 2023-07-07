import { HomePost as HomePost_PrismaSchema } from '@prisma/client';

export type HomePost = HomePost_PrismaSchema;

export type NewHomePost = Omit<HomePost, 'id' | 'createdAt' | 'updatedAt'>;