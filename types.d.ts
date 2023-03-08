import { NextApiRequest } from 'next';

export type NextApiRequestWithUser = NextApiRequest & {
  user?: any;
};

export interface Author {
  name: string;
  image: string;
  id: string;
}

export interface Post {
  id: string;
  createdAt: Date;
  slug: string;
  title: string;
  body: string;
  likes: number;
  saved: number;
  coverImage: string;
  authorId: string;
  author: Author;
  comments: any[];
}
