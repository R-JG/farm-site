import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_SECRET } from './config';

const cloudinaryFolder = 'farm-site';

export const createUploadSignature = (): { timestamp: number, signature: string } => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: cloudinaryFolder }, CLOUDINARY_API_SECRET
  );
  return { timestamp, signature };
};