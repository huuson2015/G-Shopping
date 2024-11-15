import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressStep from "@components/ProgressStep";

import {
	saveShippingAddress,
	savePaymentMethod,
} from "@redux/features/cart/cartSlice";

const Shipping = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [location, setLocation] = useState({
		address: shippingAddress.address || "",
		city: shippingAddress.city || "",
		postalCode: shippingAddress.postalCode || "",
		country: shippingAddress.country || "",
	});
	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setLocation({ ...location, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			!location.address ||
			!location.city ||
			!location.postalCode ||
			!location.country
		) {
			return;
		}

		dispatch(saveShippingAddress(location));
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/order-sumary");
	};

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] pt-5 flex justify-center items-center mb-10">
			<form
				className="w-full flex flex-col gap-5 mx-5 border rounded-lg p-5 bg-gray-50 shadow"
				onSubmit={handleSubmit}
			>
				<div className="flex gap-2 items-center my-4">
					<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
					<h2 className="text-2xl font-medium text-button-red">Shipping</h2>
				</div>
				<ProgressStep step1 step2 />

				<div>
					<label
						htmlFor="address"
						className="block text-sm font-medium text-gray-700"
					>
						Address
					</label>
					<input
						type="text"
						id="address"
						name="address"
						value={location.address}
						onChange={handleChange}
						className="mt-1 w-full py-2 px-5 input-primary"
					/>
				</div>
				<div>
					<label
						htmlFor="city"
						className="block text-sm font-medium text-gray-700"
					>
						City
					</label>
					<input
						type="text"
						id="city"
						name="city"
						value={location.city}
						onChange={handleChange}
						className="mt-1 w-full py-2 px-5 input-primary"
					/>
				</div>
				<div>
					<label
						htmlFor="postalCode"
						className="block text-sm font-medium text-gray-700"
					>
						Postal Code
					</label>
					<input
						type="text"
						id="postalCode"
						name="postalCode"
						value={location.postalCode}
						onChange={handleChange}
						className="mt-1 w-full py-2 px-5 input-primary"
					/>
				</div>

				<div>
					<label
						htmlFor="country"
						className="block text-sm font-medium text-gray-700"
					>
						Country
					</label>
					<input
						type="text"
						id="country"
						name="country"
						value={location.country}
						onChange={handleChange}
						className="mt-1 w-full py-2 px-5 input-primary"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-400">Select Method</label>
					<div className="mt-2">
						<label className="inline-flex items-center">
							<input
								type="radio"
								className="form-radio text-pink-500"
								name="paymentMethod"
								value="PayPal"
								checked={paymentMethod === "PayPal"}
								onChange={(e) => setPaymentMethod(e.target.value)}
							/>

							<span className="ml-2">PayPal or Credit Card</span>
						</label>
					</div>
				</div>

				<button
					type="submit"
					disabled={
						!location.address ||
						!location.city ||
						!location.postalCode ||
						!location.country
					}
					className=" bg-button-red hover:bg-button-hover1 text-white font-bold py-2 px-4 rounded"
				>
					Continue
				</button>
			</form>
		</div>
	);
};

export default Shipping;
