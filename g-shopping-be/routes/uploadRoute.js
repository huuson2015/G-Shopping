import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
	api_key: process.env.API_KEY_CLOUDINARY,
	api_secret: process.env.API_SECRET_CLOUDINARY,
});

const router = express.Router();

const upload = multer({ dest: "uploads/" });

const uploadToCloudinary = async (req, res) => {
	try {
		const file = req.file;
		const result = await cloudinary.uploader.upload(file.path, {
			resource_type: "image",
			eager: [
				{ width: 400, height: 400, crop: "fill" },
				{ width: 200, height: 200, crop: "fill" },
			],
		});
		res.status(200).send({
			message: "Image uploaded successfully",
			image: result.secure_url,
		});
	} catch (err) {
		res.status(400).send({ message: err.message });
	}
};

router.post("/", upload.single("image"), uploadToCloudinary);

export default router;
