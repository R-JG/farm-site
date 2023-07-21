import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_SECRET, PUBLIC_CLOUDINARY_CLOUD_NAME, PUBLIC_CLOUDINARY_API_KEY } from './config';

cloudinary.config({
  cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: PUBLIC_CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export const createUploadSignature = (): { timestamp: number, signature: string } => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'farm-site' }, CLOUDINARY_API_SECRET
  );
  return { timestamp, signature };
};

export const deleteUploadedFile = async (public_id: string): Promise<void> => {
  const response = await cloudinary.uploader.destroy(public_id);
  if ((typeof response === 'object') && ('result' in response) 
  && ((response.result === 'ok') || (response.result === 'not found'))) {
    return;
  } else {
    throw new Error(`File ${public_id} could not be successfully deleted`);
  };
};