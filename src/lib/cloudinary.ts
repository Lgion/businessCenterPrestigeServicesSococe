import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dfpxi9ywm',
  api_key: process.env.CLOUDINARY_API_KEY || '368895258873548',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Q8ruqbcJ9GTrVydQIyakW5O5jZA',
  secure: true
});

export default cloudinary;

export async function uploadImageBuffer(buffer: Buffer, folder = 'bcps_uploads'): Promise<{ url: string; public_id: string; secure_url: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error || new Error('Upload failed'));
        resolve({
          url: result.url,
          secure_url: result.secure_url,
          public_id: result.public_id
        });
      }
    );
    uploadStream.end(buffer);
  });
}

export async function uploadImageUrl(imageUrl: string, folder = 'bcps_uploads'): Promise<{ url: string; public_id: string; secure_url: string }> {
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder,
    resource_type: 'image'
  });
  return {
    url: result.url,
    secure_url: result.secure_url,
    public_id: result.public_id
  };
}

export async function uploadFileBuffer(buffer: Buffer, folder = 'bcps_documents', filename = 'document'): Promise<{ url: string; public_id: string; secure_url: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto', public_id: `${filename}_${Date.now()}` },
      (error, result) => {
        if (error || !result) return reject(error || new Error('Upload document failed'));
        resolve({
          url: result.url,
          secure_url: result.secure_url,
          public_id: result.public_id
        });
      }
    );
    uploadStream.end(buffer);
  });
}
