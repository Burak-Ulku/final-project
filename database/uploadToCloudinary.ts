// Import necessary libraries
import axios, { AxiosResponse } from 'axios';

// Assuming these values are constants in your application
const cloudName: string = 'dzaakzhnk';
const apiKey: string = '595488846861581';
const apiSecret: string = 'SwMLBE_ZDROvhUZw1oDn_n3Qlu4';
const uploadPreset: string = 'i7bj1en3';

// Function to upload image to Cloudinary
async function uploadImageToCloudinary(imageUrl: string): Promise<number> {
  const cloudinaryUploadUrl: string = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const requestData = {
    file: imageUrl,
    upload_preset: uploadPreset,
    api_key: apiKey,
    api_secret: apiSecret,
  };
  const ir = axios.post(cloudinaryUploadUrl, requestData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return (await ir).status;
}

export { uploadImageToCloudinary }; // Export the function for use in other files
