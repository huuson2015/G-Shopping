import Order from "../models/orderModel.js";
import calcPrices from "../utils/calcPrices.js";
import Product from "./../models/productModel.js";

const createOrder = async (req, res) => {
	try {
		const { orderItems, shippingAddress, paymentMethod } = req.body;
		if (orderItems && orderItems.length === 0) {
			res.status(400).json({ error: "No order items" });
			return;
		}
		const itemFromDb = await Product.find({
			_id: { $in: orderItems.map((o) => o._id) },
		});

		const dbOrderItems = orderItems.map((itemFromClient) => {
			const matchingItemFromDb = itemFromDb.find(
				(itemFromDb) =>
					itemFromDb._id.toString() === itemFromClient._id.toString()
			);

			if (!matchingItemFromDb) {
				res.status(404);
				throw new Error(`Product not found ${itemFromClient._id}`);
			}

			if (itemFromClient.qty > matchingItemFromDb.countInStock) {
				res.status(400).json({
					error: `Not enough stock for ${matchingItemFromDb.name}. Available stock: ${matchingItemFromDb.countInStock}`,
				});
				return;
			}

			return {
				...itemFromClient,
				product: itemFromClient._id,
				price: matchingItemFromDb.price,
				_id: undefined,
			};
		});

		const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
			calcPrices(dbOrderItems);

		const order = new Order({
			user: req.user._id,
			orderItems: dbOrderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find({}).populate("user", "id username");
		res.json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUserOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id });
		res.json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const calculateTotalSales = async (req, res) => {
	try {
		const orders = await Order.find();
		const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
		res.json({ totalSales });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const calcualteTotalSalesByDate = async (req, res) => {
	try {
		const salesByDate = await Order.aggregate([
			{
				$match: {
					isPaid: true,
				},
			},
			{
				$group: {
					_id: {
						$dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
					},
					totalSales: { $sum: "$totalPrice" },
				},
			},
		]);

		res.json(salesByDate);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const countTotalOrders = async (req, res) => {
	try {
		const totalOrders = await Order.countDocuments();
		res.json({ totalOrders });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const findOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id).populate(
			"user",
			"username email"
		);

		if (order) {
			res.json(order);
		} else {
			res.status(404);
			throw new Error("Order not found");
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const markOrderAsPaid = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.payer.email_address,
			};

			const updateOrder = await order.save();

			await Promise.all(
				order.orderItems.map(async (item) => {
					const product = await Product.findById(item.product);
					if (product) {
						product.quantity -= item.qty;
						product.countInStock -= item.qty;
						await product.save();
					}
				})
			);

			res.status(200).json(updateOrder);
		} else {
			res.status(404);
			throw new Error("Order not found");
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const markOrderAsDelivered = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);

		if (order) {
			order.isDelivered = true;
			order.deliveredAt = Date.now();

			const updatedOrder = await order.save();
			res.json(updatedOrder);
		} else {
			res.status(404);
			throw new Error("Order not found");
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export {
	createOrder,
	getAllOrders,
	getUserOrders,
	calculateTotalSales,
	calcualteTotalSalesByDate,
	countTotalOrders,
	findOrderById,
	markOrderAsPaid,
	markOrderAsDelivered,
};
