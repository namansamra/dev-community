import NextAuth, { CallbacksOptions, SessionOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prismadb';
import { Session } from 'inspector';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/enter',
    newUser: '/enter?state=newuser',
  },
  callbacks: {
    async session({ session }: any) {
      // Send properties to the client, like an access_token and user id from a provider.
      const dbuser = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        },
        include: {
          writtenPosts: true,
          likedPosts: {
            select: {
              id: true,
            },
          },
          likedComments: true,
        },
      });
      session.user = dbuser;
      return session;
    },
  },
};

export default NextAuth(authOptions);
