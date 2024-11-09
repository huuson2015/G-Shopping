import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "@redux/features/cart/cartSlice";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { PropTypes } from "prop-types";

const AddToCartButton = ({ product }) => {
	const dispatch = useDispatch();
	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty: 1 }));
		toast.success("Product added to cart");
	};

	return (
		<button
			className="p-2 flex justify-center items-center gap-2 bg-button-red disabled:bg-button-hover1 hover:bg-button-hover1 rounded-lg cursor-pointer"
			onClick={() => addToCartHandler()}
			disabled={product.countInStock === 0}
		>
			<HiMiniShoppingCart size={20} className="text-primary-base" />
			<span className="text-primary-base">Add to cart</span>
		</button>
	);
};

AddToCartButton.propTypes = {
	product: PropTypes.object.isRequired,
};

export default AddToCartButton;
