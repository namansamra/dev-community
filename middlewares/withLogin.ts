import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequestWithUser } from '@/types';

const withLoginOnly = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse,
  handler: NextApiHandler
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return res.status(401).json({
      status: 401,
      message: 'user is not logged in',
    });
  }

  req.user = session?.user;
  return handler(req, res);
};

export default withLoginOnly;
