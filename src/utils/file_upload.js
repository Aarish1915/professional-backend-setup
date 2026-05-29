import { v2 as cloudinary } from "cloudinary";
import fs from "fs";  // fs mean file system

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload function
const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // auto-detects image, video, etc.
    });

    console.log(
      `File uploaded to Cloudinary: ${response.secure_url}`
    );

    // Remove file from local server after upload
    fs.unlinkSync(filePath);

    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};



export { uploadToCloudinary };