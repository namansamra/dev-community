import prisma from '@/lib/prismadb';
import withLoginOnly from '@/middlewares/withLogin';
import { NextApiRequestWithUser } from '@/types';
import { NextApiResponse } from 'next';

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
        saved: {
          ...(value ? { increment: 1 } : { decrement: 1 }),
        },
      },
    });

    await prisma.user.update({
      where: {
        email: req.user.email as string,
      },
      data: {
        savedPostsId: {
          set: value
            ? [...req.user.savedPostsId, post.id]
            : req.user.savedPostsId.filter((i: any) => i.id == post.id),
        },
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Post saved successfully!',
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: 'Cannot fetch post!!',
    });
  }
};
export default handler;
