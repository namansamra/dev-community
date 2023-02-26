import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import FormData from 'form-data';
import axios from 'axios';
import multer from 'multer';
import withLoginOnly from '@/middlewares/withLogin';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, handled by multer
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit
  },
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        return await withLoginOnly(req, res, handlePost);
      default:
        res.setHeader('Allow', 'POST');
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

const handlePost = nc()
  .use(upload.single('image'))
  .post(async (req: any, res: any) => {
    const file = req.file;
    console.log(req.user, req.body, req.files, file, 'file hu');
    if (!file) {
      return res.status(400).send({
        status: 'error',
        message: 'Please upload file!!',
      });
    }

    try {
      const formData = new FormData();
      formData.append('image', file.buffer, { filename: file.originalname });
      const { data } = await axios({
        url: 'https://api.imgbb.com/1/upload?key=9f56fe4f5575197879860e7fef8cfca6',
        method: 'POST',
        data: formData,
        headers: {
          ...formData.getHeaders(),
        },
      });
      res.status(200).json({
        status: 'success',
        data: {
          url: data.data.display_url,
        },
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        status: 'error',
        message: 'Cannot upload image!!',
      });
    }
  });

export default handler;
