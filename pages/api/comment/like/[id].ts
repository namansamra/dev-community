import prisma from "@/lib/prismadb";
import withLoginOnly from "@/middlewares/withLogin";
import { NextApiRequestWithUser } from "@/types";
import { NextApiResponse } from "next";

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case "PUT":
        return await withLoginOnly(req, res, handlePut);
      default:
        res.setHeader("Allow", "PUT");
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
    const c = await prisma.comment.update({
      where: {
        id: id as string,
      },
      data: {
        likes: {
          ...(value ? { increment: 1 } : { decrement: 1 }),
        },
      },
    });

    await prisma.user.update({
      where: {
        email: req.user.email as string,
      },
      data: {
        likedCommentsId: {
          set: value
            ? [...req.user.likedCommentsId, id]
            : req.user.likedCommentsId.filter((i: string) => i !== id),
        },
      },
    });
    res.status(200).json({
      status: "success",
      message: "Comment liked successfully!",
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      status: "error",
      message: "Cannot perform action!!",
    });
  }
};
export default handler;
