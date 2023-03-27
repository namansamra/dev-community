import withLoginOnly from '@/middlewares/withLogin';
import { NextApiRequestWithUser } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case 'PUT':
        return await withLoginOnly(req, res, handlePut);
      case 'DELETE':
        return await withLoginOnly(req, res, handleDelete);
      case 'GET':
        return await handleGet(req, res);
      default:
        res.setHeader('Allow', 'PUT, GET, DELETE');
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

//nested comments level
const recursive = (level: number): object => {
  if (level === 0) {
    return {
      include: {
        author: true,
        childComments: true,
      },
    };
  }
  return {
    include: {
      author: true,
      childComments: recursive(level - 1),
    },
  };
};

const handleGet = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const post = await prisma.post.findFirst({
      where: {
        id: id as string,
      },
      include: {
        comments: {
          where: {
            parentCommentId: null,
          },
          include: {
            author: true,
            childComments: recursive(10),
          },
        },
        likedBy: true,
        author: {
          select: {
            name: true,
            image: true,
            bio: true,
            createdAt: true,
          },
        },
      },
    });

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
      message: 'Cannot fetch data!!',
    });
  }
};

const handlePut = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    const { body } = req;
    const { id } = req.query;
    const post = await prisma.post.update({
      where: {
        id: id as string,
      },
      data: body,
    });
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'error',
      message: 'Cannot update post!!',
    });
  }
};

const handleDelete = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { body } = req;
    const { id } = req.query;
    const post = await prisma.post.delete({
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
      message: 'Cannot delete post!!',
    });
  }
};

export default handler;
