import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const addToCartHandler = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
	};

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate("/login?redirect=/shipping");
	};

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] pt-5">
			{cartItems.length === 0 ? (
				<div>
					Your cart is empty <Link to="/shop">Go To Shop</Link>
				</div>
			) : (
				<>
					<div className="flex flex-col w-full">
						<h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-1 flex flex-col gap-2">
								{cartItems.map((item) => (
									<div
										key={item._id}
										className="flex gap-4 border rounded-lg p-3 items-enter"
									>
										<div className="size-[6rem]">
											<LazyLoadImage
												src={item.image}
												alt={item.name}
												className="w-full h-full object-cover rounded"
											/>
										</div>

										<div className="flex-1 flex flex-col justify-between">
											<Link
												to={`/product/${item._id}`}
												className="text-primary-dark font-semibold hover:text-button-red"
											>
												{item.name}
											</Link>

											<div className="text-primary-dark">{item.brand}</div>
											<div className="text-primary-dark font-bold">
												$ {item.price}
											</div>
										</div>

										<div className="flex gap-4 items-center">
											<select
												className="w-[4rem] h-[3rem] py-2 px-3 input-primary"
												value={item.qty}
												onChange={(e) =>
													addToCartHandler(item, Number(e.target.value))
												}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>

											<button
												className="size-[3rem] flex items-center justify-center group hover:bg-button-red border p-3  border-button-red rounded-lg"
												onClick={() => removeFromCartHandler(item._id)}
											>
												<FaTrash className="text-button-red group-hover:text-white" />
											</button>
										</div>
									</div>
								))}
							</div>

							<div className="md:w-[20rem] xl:w-[30rem]">
								<div className="p-4 rounded-lg">
									<h2 className="text-xl font-semibold mb-2">
										Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
									</h2>

									<div className="text-2xl font-bold">
										${" "}
										{cartItems
											.reduce((acc, item) => acc + item.qty * item.price, 0)
											.toFixed(2)}
									</div>

									<button
										className="bg-button-red hover:bg-button-hover1 mt-4 py-2 px-4 rounded-lg text-lg text-white font-medium w-full"
										disabled={cartItems.length === 0}
										onClick={checkoutHandler}
									>
										Proceed To Checkout
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
