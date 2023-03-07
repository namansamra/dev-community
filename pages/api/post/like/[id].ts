import prisma from '@/lib/prismadb';
import withLoginOnly from '@/middlewares/withLogin';
import { NextApiRequestWithUser } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case 'PUT':
        return await withLoginOnly(req, res, handlePut);
      default:
        res.setHeader('Allow', 'PUT');
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

const handlePut = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const value = req.body.value;
    const post = await prisma.post.update({
      where: {
        id: id as string,
      },
      data: {
        likes: {
          ...(value ? { increment: 1 } : { decrement: 1 }),
        },
      },
    });

    console.log(req.user.id);
    const p = await prisma.user.update({
      where: {
        email: req.user.email as string,
      },
      data: {
        likedPosts: {
          connect: {
            id: post.id,
          },
        },
      },
    });
    console.log(p, 'p hu bhai');
    res.status(200).json({
      status: 'success',
      data: {
        post: post,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      status: 'error',
      message: 'Cannot fetch post!!',
    });
  }
};
export default handler;
