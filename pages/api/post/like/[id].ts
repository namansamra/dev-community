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
  const { id, isLiked } = req.query;
  console.log(id, isLiked, 'euresda', req.user);
  try {
    const { tagName } = req.query;
    const post = await prisma.post.update({
      where: {
        id: id as string,
      },
      data: {
        likedBy: req.user.id,
        likes: {
          increment: 1,
        },
      },
    });
    // await prisma.user.update({
    //   where: {
    //     id: req.user.id as string,
    //   },
    //   data: {},
    // });
    res.status(200).json({
      status: 'success',
      data: {
        post: post,
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
export default handler;
