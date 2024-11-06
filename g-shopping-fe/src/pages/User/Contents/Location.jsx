import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "@redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const Location = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [location, setLocation] = useState({
		address: shippingAddress.address || "",
		city: shippingAddress.city || "",
		postalCode: shippingAddress.postalCode || "",
		country: shippingAddress.country || "",
	});

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
		toast.success("Shipping address saved");
	};
	return (
		<form className="" onSubmit={handleSubmit}>
			<div className="flex gap-2 items-center my-4">
				<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
				<h2 className="text-2xl font-medium text-button-red">Shipping</h2>
			</div>

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

			<button
				type="submit"
				disabled={
					!location.address ||
					!location.city ||
					!location.postalCode ||
					!location.country
				}
				className="mt-4 bg-button-red hover:bg-button-hover1 text-white font-bold py-2 px-4 rounded"
			>
				Save changes
			</button>
		</form>
	);
};

export default Location;
