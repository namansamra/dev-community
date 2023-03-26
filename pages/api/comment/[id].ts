import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types';
import prisma from '@/lib/prismadb';
import withLoginOnly from '@/middlewares/withLogin';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case 'DELETE':
        return await withLoginOnly(req, res, handleDelete);
      default:
        res.setHeader('Allow', 'DELETE');
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

const handleDelete = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const { postId, parentCommentId } = req.body;

    if (parentCommentId) {
      // parent comment already present
      await prisma.comment.deleteMany({
        where: {
          OR: [
            {
              parentCommentId: id as string,
            },
            {
              id: id as string,
            },
          ],
        },
      });
    } else {
      //parent comment does not exist so this is parent comment
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          comments: {
            disconnect: {
              id: id as string,
            },
          },
        },
      });
    }

    const comment = await prisma.comment.delete({
      where: {
        id: id as string,
      },
    });

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'error',
      message: 'Cannot create comment!!',
    });
  }
};

export default handler;
