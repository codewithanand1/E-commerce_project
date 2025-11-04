import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      console.log("File path missing");
      return null;
    }

    // Upload file
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Delete local file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // console.log(" Uploaded to Cloudinary:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error(" Cloudinary Upload Error:", error);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;
