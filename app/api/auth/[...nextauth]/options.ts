import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma/database';
import { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET } from '@/utils/config';

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_AUTH_CLIENT_ID,
      clientSecret: GOOGLE_AUTH_CLIENT_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma) as Adapter
};

export default options;