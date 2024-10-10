import express from "express";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
	calcualteTotalSalesByDate,
	calculateTotalSales,
	countTotalOrders,
	createOrder,
	findOrderById,
	getAllOrders,
	getUserOrders,
	markOrderAsDelivered,
	markOrderAsPaid,
} from "../controllers/orderController.js";

router
	.route("/")
	.post(authenticate, createOrder)
	.get(authenticate, authorizeAdmin, getAllOrders);

router.route("/mine-orders").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get(authenticate, findOrderById);
router.route("/:id/paid").put(authenticate, markOrderAsPaid);
router.route("/:id/delivered").put(authenticate, markOrderAsDelivered);

export default router;
