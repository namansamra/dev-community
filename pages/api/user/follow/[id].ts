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
    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        following: {
          ...(value
            ? { push: id }
            : { set: req.user.following.filter((i: any) => i !== id) }),
        },
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'user followed successfully!',
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: 'Cannot perform action!!',
    });
  }
};
export default handler;
