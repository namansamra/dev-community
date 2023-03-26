import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types';
import prisma from '@/lib/prismadb';
import withLoginOnly from '@/middlewares/withLogin';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  console.log('hdasdasdasdasdasd');
  try {
    switch (method) {
      case 'POST':
        return await withLoginOnly(req, res, handlePost);
      case 'DELETE':
        return await withLoginOnly(req, res, handleDelete);
      default:
        res.setHeader('Allow', 'POST,GET');
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

const handlePost = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { body } = req;
    console.log(req.body, 'the repoop');
    const comment = await prisma.comment.create({
      data: {
        ...body,
        authorId: req.user.id,
      },
    });

    // console.log(parentCommentId, 'praerentt is hu bhai');
    console.log(comment);

    // if (parentCommentId) {
    //   console.log('connection kr rhe h parent se');
    //   // parent comment already present
    //   await prisma.comment.update({
    //     where: {
    //       id: parentCommentId,
    //     },
    //     data: {
    //       childComments: {
    //         create: {
    //           content: rest.content,
    //           authorId: req.user.id,
    //           postId: postId,
    //         },
    //       },
    //     },
    //   });
    // } else {
    //   //parent comment does not exist so this is parent comment
    //   await prisma.post.update({
    //     where: {
    //       id: postId,
    //     },
    //     data: {
    //       comments: {
    //         create: {
    //           content: rest.content,
    //           authorId: req.user.id,
    //         },
    //       },
    //     },
    //   });
    // }

    res.status(201).json({
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

const handleDelete = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { body } = req;
    const { postId, parentCommentId } = body;
    const comment = await prisma.comment.delete({
      where: {
        id: postId,
      },
    });

    if (parentCommentId) {
      // parent comment already present
      await prisma.comment.update({
        where: {
          id: parentCommentId,
        },
        data: {
          childComments: {
            connect: {
              id: comment.id,
            },
          },
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
            connect: {
              id: comment.id,
            },
          },
        },
      });
    }

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
