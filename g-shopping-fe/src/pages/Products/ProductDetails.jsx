import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	useGetProductDetailsQuery,
	useCreateReviewMutation,
} from "@redux/api/productApiSlice";
import Loader from "@components/Loader";
import Message from "@components/Message";
import {
	FaBox,
	FaClock,
	FaShoppingCart,
	FaStar,
	FaStore,
} from "react-icons/fa";
import moment from "moment";
import Ratings from "@components/Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "@redux/features/cart/cartSlice";
import HeartButton from "@components/HeartButton";
import { BiArrowBack } from "react-icons/bi";

const ProductDetails = () => {
	const { id: productId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const getHistoryLocation = () => navigate(-1);

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(productId);

	const { userInfo } = useSelector((state) => state.auth);

	const [createReview, { isLoading: loadingProductReview }] =
		useCreateReviewMutation();

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			await createReview({
				productId,
				rating,
				comment,
			}).unwrap();
			refetch();
			toast.success("Review created successfully");
			setRating(0);
			setComment("");
		} catch (error) {
			toast.error(error?.data || error.message);
		}
	};

	const addToCartHandler = () => {
		//if cart is already existing
		// // const existItem = cart.cartItems.find((x) => x._id === product._id);
		// const quantity = existItem ? existItem.quantity + qty : qty;

		// if (quantity > product.countInStock) {
		// 	toast.error("Sorry. Product is out of stock");
		// 	return;
		// }

		dispatch(addToCart({ ...product, qty }));
		toast.success("Product added to cart");
	};

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] pt-4">
			<button
				type="button"
				onClick={getHistoryLocation}
				className="flex gap-2 items-center text-primary-dark font-semibold hover:text-button-red mb-4"
			>
				<BiArrowBack />
				Go Back
			</button>

			{isLoading ? (
				<div className="w-full min-h-[60vh] flex justify-center items-center">
					<div className="size-20">
						<Loader />
					</div>
				</div>
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.message}
				</Message>
			) : (
				<div className="grid grid-cols-1 xl:grid-cols-6 gap-4 relative items-between">
					<div className="relative col-span-1 xl:col-span-3">
						<img
							src={product.image}
							alt={product.name}
							className="w-full h-[30rem] xl:h-[35rem] rounded-lg object-cover"
						/>
						<HeartButton product={product} />
					</div>
					<div className="flex flex-col h-full col-span-1 xl:col-span-3">
						<div className="flex flex-col gap-2 h-full">
							<h2 className="text-3xl font-semibold">{product.name}</h2>
							<p className="text-[2rem] lg:text-[3rem] font-extrabold text-button-red">
								${product.price}
							</p>
							<Ratings
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
							<p className="my-2 min-h-[5rem] text-text-gray text-justify">
								{product.description}
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
							<h1 className="flex items-center text-gray-500">
								<FaStore className="mr-2 text-button-red" /> Brand:{" "}
								{product.brand}
							</h1>
							<h1 className="flex items-center text-gray-500">
								<FaClock className="mr-2 text-button-red" /> Added:{" "}
								{moment(product.createdAt).fromNow()}
							</h1>
							<h1 className="flex items-center text-gray-500">
								<FaStar className="mr-2 text-button-red" /> Reviews:{" "}
								{product.numReviews}
							</h1>

							<h1 className="flex items-center text-gray-500">
								<FaStar className="mr-2 text-button-red" /> Ratings:{" "}
								{product.rating.toFixed(1)}
							</h1>
							<h1 className="flex items-center text-gray-500">
								<FaShoppingCart className="mr-2 text-button-red" /> Quantity:{" "}
								{product.quantity}
							</h1>
							<h1 className="flex items-center w-[10rem] text-gray-500">
								<FaBox className="mr-2 text-button-red" /> In Stock:{" "}
								{product.countInStock}
							</h1>
						</div>
						<div className="flex my-4 justify-between flex-wrap text-gray-500">
							{product.countInStock > 0 && (
								<div>
									<label htmlFor="qty">Quantity: </label>
									<select
										value={qty}
										id="qty"
										onChange={(e) => setQty(e.target.value)}
										className="px-5 py-2 bg-gray-200 border rounded placeholder:text-sm hover:border-button-hover2 focus:outline-none focus:border-button-hover2 capitalize"
									>
										{[...Array(product.countInStock).keys()].map((x) => (
											<option key={x + 1} value={x + 1}>
												{x + 1}
											</option>
										))}
									</select>
								</div>
							)}
						</div>

						<div>
							<button
								onClick={addToCartHandler}
								disabled={product.countInStock === 0}
								className="bg-button-red hover:bg-button-hover1 text-white font-medium py-4 px-8 rounded-lg mt-4 md:mt-0"
							>
								Add To Cart
							</button>
						</div>
					</div>
					<div className="flex col-span-1 items-start justify-between lg:col-span-6">
						<ProductTabs
							loadingProductReview={loadingProductReview}
							userInfo={userInfo}
							submitHandler={submitHandler}
							rating={rating}
							setRating={setRating}
							comment={comment}
							setComment={setComment}
							product={product}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
