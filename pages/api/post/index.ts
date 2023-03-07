import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types';
import prisma from '@/lib/prismadb';
import withLoginOnly from '@/middlewares/withLogin';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        return await withLoginOnly(req, res, handlePost);
      case 'GET':
        return await handleGet(req, res);
      default:
        res.setHeader('Allow', 'POST, GET');
        throw new Error(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    return res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
}

const handleGet = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        posts: posts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'error',
      message: 'Cannot fetch post!!',
    });
  }
};

const handlePost = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { body } = req;
    const post = await prisma.post.create({
      data: {
        ...body,
        authorId: req.user.id,
      },
    });
    const p = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        writtenPosts: {
          create: body,
        },
      },
    });
    res.status(201).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'error',
      message: 'Cannot create post!!',
    });
  }
};

export default handler;
