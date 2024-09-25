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

export { createOrder };
