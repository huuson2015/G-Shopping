import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import proxy from "http-proxy-middleware";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import uploadRoutes from "./routes/uploadRoute.js";
import orderRoutes from "./routes/orderRoute.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	cors({
		origin: "https://g-shopping.onrender.com",
	})
);

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => {
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.use(
	"/uploads",
	proxy({
		target: "https://g-shopping.onrender.com",
		changeOrigin: true,
		pathRewrite: {
			"^/uploads": "",
		},
	})
);

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
