import express from "express";
import ExpressFormidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
	addProduct,
	updateProductDetails,
	getProducts,
	getAllProducts,
	getProductById,
	removeProduct,
	addProductReview,
	getTopProducts,
	getNewProducts,
	filterProducts,
	getAllBrand,
	getRelatedProducts,
} from "../controllers/productController.js";

const router = express.Router();

router
	.route("/")
	.get(getProducts)
	.post(authenticate, authorizeAdmin, ExpressFormidable(), addProduct);

router.route("/allproducts").get(getAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.route("/top").get(getTopProducts);
router.route("/new").get(getNewProducts);

router.route("/brands").get(getAllBrand);
router.route("/filtered-products").get(filterProducts);
router.route("/:id/related-products").get(getRelatedProducts);

router
	.route("/:id")
	.get(getProductById)
	.put(authenticate, authorizeAdmin, ExpressFormidable(), updateProductDetails)
	.delete(authenticate, authorizeAdmin, removeProduct);

export default router;
