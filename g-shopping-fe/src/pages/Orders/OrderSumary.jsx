import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "@components/Message";
import Loader from "@components/Loader";
import ProgressSteps from "@components/ProgressStep";
import { useCreateOrderMutation } from "@redux/api/orderApiSlice";
import { clearCartItems } from "@redux/features/cart/cartSlice";
import { BiArrowBack } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiTruck, HiCreditCard, HiMiniShoppingCart } from "react-icons/hi2";

const OrderSummary = () => {
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const getHistoryLocation = () => navigate(-1);

	const [createOrder, { isLoading }] = useCreateOrderMutation();

	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate("/shipping");
		}
	}, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

	const dispatch = useDispatch();

	const placeOrderHandler = async () => {
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();
			dispatch(clearCartItems());
			navigate(`/order/${res._id}`);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] pt-5 flex flex-col  justify-center items-center mb-10">
			{isLoading ? (
				<div className="w-full min-h-[60vh] flex justify-center items-center">
					<div className="size-20">
						<Loader />
					</div>
				</div>
			) : (
				<div className="container flex flex-col gap-5 mx-5 lg:w-[40vw] border rounded-lg p-5 bg-gray-50 shadow">
					<button
						type="button"
						onClick={getHistoryLocation}
						className="flex gap-2 w-fit items-center text-primary-dark font-semibold hover:text-button-red"
					>
						<BiArrowBack />
						Go Back
					</button>
					<div className="flex gap-2 items-center my-4">
						<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
						<h2 className="text-2xl font-medium text-button-red">
							Order Summary
						</h2>
					</div>
					<ProgressSteps step1 step2 step3 />

					<div className="container mx-auto mt-8">
						{cart.cartItems.length === 0 ? (
							<div className="mb-4">
								<Message>Your cart is empty</Message>
							</div>
						) : (
							<div className="overflow-x-auto mb-4">
								<table className="w-full">
									<thead className="bg-button-red">
										<tr className="">
											<td className="rounded-tl-lg px-1 py-2 text-center align-top text-white font-medium">
												Image
											</td>
											<td className="px-1 py-2 text-left text-white font-medium">
												Product
											</td>
											<td className="px-1 py-2 text-center text-white font-medium">
												Quantity
											</td>
											<td className="px-1 py-2 text-center text-white font-medium">
												Price
											</td>
											<td className="rounded-tr-lg px-1 py-2 text-center text-white font-medium">
												Total
											</td>
										</tr>
									</thead>

									<tbody>
										<tr className="bg-primary-base">
											<td className="ml-4 h-4"></td>
											<td className=""></td>
											<td className=""></td>
											<td className=""></td>
											<td className=""></td>
										</tr>
										{cart.cartItems.map((item, index) => (
											<tr key={index} className="bg-primary-base">
												<td className="p-2 bg-primary-base flex justify-center">
													<div className="overflow-hidden">
														<LazyLoadImage
															src={item.image}
															alt={item.name}
															effect="blur"
															className="size-20 object-cover rounded-lg"
														/>
													</div>
												</td>

												<td className="">
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</td>
												<td className="p-2 text-center">{item.qty}</td>
												<td className="p-2 text-center">
													{item.price.toFixed(2)}
												</td>
												<td className="p-2 text-center">
													$ {(item.qty * item.price).toFixed(2)}
												</td>
											</tr>
										))}
										<tr className="bg-primary-base border-t-2 border-dashed">
											<td className="ml-4 h-4 border-t-2 border-dashed"></td>
										</tr>
										<tr className="border-t ">
											<td className="bg-button-red rounded-bl-lg"></td>
											<td className="bg-button-red"></td>
											<td className="bg-button-red"></td>
											<td className="p-2 text-center text-white font-semibold  bg-button-red">
												Total
											</td>
											<td className="p-2 text-center text-white font-semibold bg-button-red rounded-br-lg">
												${cart.totalPrice}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}

						<div className="grid grid-cols-4 grid-rows-2 gap-4">
							<div className="text-lg col-span-1 row-span-2 col-start-1 col-end-3 bg-primary-base rounded-lg flex flex-col justify-between border shadow">
								<div>
									<div className="flex gap-2 bg-primary-base p-4 rounded-t-lg items-center text-button-red border-b-2 border-dashed">
										<HiMiniShoppingCart size={22} />
										<h2 className="text-2xl font-semibold">Cart total</h2>
									</div>
									<ul className="list-disc list-inside">
										<li className="py-2 px-4">
											<span className="font-semibold mb-4">Items:</span> $
											{cart.itemsPrice}
										</li>
										<li className="py-2 px-4">
											<span className="font-semibold mb-4">Shipping:</span> $
											{cart.shippingPrice}
										</li>
										<li className="py-2 px-4">
											<span className="font-semibold mb-4">Tax:</span> $
											{cart.taxPrice}
										</li>
									</ul>
								</div>
								<div className="py-2 px-4 border-t-2 border-dashed">
									<span className="font-semibold mb-4">Total:</span> $
									{cart.totalPrice}
								</div>
							</div>

							<div className="text-lg bg-primary-base rounded-lg border shadow col-start-3 col-end-5">
								<div className="flex gap-2 bg-button-red p-4 rounded-t-lg items-center text-primary-base">
									<HiTruck size={22} />
									<h2 className="text-2xl font-semibold">Shipping</h2>
								</div>
								<p className="px-4 py-2 text-justify">
									<strong className="text-button-red">Address: </strong>
									{cart.shippingAddress.address},{cart.shippingAddress.city}{" "}
									{cart.shippingAddress.postalCode},{" "}
									{cart.shippingAddress.country}
								</p>
							</div>

							<div className="text-lg bg-primary-base rounded-lg border shadow col-start-3 col-end-5">
								<div className="flex gap-2 bg-button-red p-4 rounded-t-lg items-center text-primary-base">
									<HiCreditCard size={22} />
									<h2 className="text-2xl font-semibold">Payment</h2>
								</div>
								<p className="px-4 py-2">
									<strong className="py-2 text-button-red">Method: </strong>
									{cart.paymentMethod}
								</p>
							</div>
						</div>

						<button
							type="button"
							className="bg-button-red text-white disabled:bg-button-hover1 py-3 px-4 font-medium rounded-lg text-lg w-full mt-4 col-span-4 row-span-1"
							disabled={cart.cartItems.length === 0}
							onClick={placeOrderHandler}
						>
							Order
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderSummary;
