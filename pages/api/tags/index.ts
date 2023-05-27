import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestWithUser } from "@/types";
import prisma from "@/lib/prismadb";
import withLoginOnly from "@/middlewares/withLogin";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case "POST":
        return await withLoginOnly(req, res, handlePost);
      case "GET":
        return await handleGet(req, res);
      default:
        res.setHeader("Allow", "POST, GET");
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
    const tag = await prisma.tag.create({
      data: body,
    });
    res.status(200).json({
      status: "success",
      data: {
        tag: tag,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "Cannot fetch post!!",
    });
  }
};

const handleGet = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    const tags = await prisma.tag.findMany({});
    res.status(200).json({
      status: "success",
      data: {
        tags: tags,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "Cannot fetch post!!",
    });
  }
};

export default handler;
