import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithUser } from '@/types';
import prisma from '@/lib/prismadb';
import withLoginOnly from '@/middlewares/withLogin';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case 'GET':
        return await handleGet(req, res);
      default:
        res.setHeader('Allow', 'GET');
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
    const { tagName } = req.query;
    const tags = await prisma.tag.findMany({
      where: {
        name: {
          contains: tagName as string,
        },
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        tags: tags,
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
