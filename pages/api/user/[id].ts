import prisma from '@/lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    console.log(error.message);
    return res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const user = await prisma.user.findFirst({
      where: {
        id: id as string,
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'error',
      message: 'Cannot find user!!',
    });
  }
};
