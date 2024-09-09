import { useSelector } from "react-redux";

const CartCount = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const cartCount = cartItems.length;

	return (
		<div className="absolute -right-2 -top-2">
			{cartCount > 0 && (
				<span className="px-1 py-0 text-sm text-white bg-button-red rounded-full">
					{cartItems.reduce((a, c) => a + c.qty, 0)}
				</span>
			)}
		</div>
	);
};

export default CartCount;
