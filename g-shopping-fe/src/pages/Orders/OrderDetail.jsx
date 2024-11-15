import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "@components/Message";
import Loader from "@components/Loader";
import { HiCheckCircle, HiMiniXCircle } from "react-icons/hi2";
import {
	useDeliverOrderMutation,
	useGetOrderDetailsQuery,
	useGetPaypalClientIdQuery,
	usePaidOrderMutation,
} from "@redux/api/orderApiSlice";

const OrderDetail = () => {
	const { id: orderId } = useParams();

	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId);

	const [paidOrder, { isLoading: loadingPay }] = usePaidOrderMutation();

	const [deliverOrder, { isLoading: loadingDeliver }] =
		useDeliverOrderMutation();
	const { userInfo } = useSelector((state) => state.auth);

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

	const {
		data: paypal,
		isLoading: loadingPayPal,
		error: errorPayPal,
	} = useGetPaypalClientIdQuery();

	useEffect(() => {
		if (!errorPayPal && !loadingPayPal && paypal.clientId) {
			const loadingPaPalScript = async () => {
				paypalDispatch({
					type: "resetOptions",
					value: {
						"client-id": paypal.clientId,
						currency: "USD",
					},
				});
				paypalDispatch({ type: "setLoadingStatus", value: "pending" });
			};

			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadingPaPalScript();
				}
			}
		}
	}, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

	const onApprove = (data, actions) => {
		return actions.order.capture().then(async function (details) {
			try {
				await paidOrder({
					orderId,
					details,
				});
				refetch();
				toast.success("Order is paid");
			} catch (error) {
				toast.error(error?.data?.message || error.message);
			}
		});
	};

	const createOrder = (data, actions) => {
		return actions.order
			.create({
				purchase_units: [{ amount: { value: order.totalPrice } }],
			})
			.then((orderID) => {
				return orderID;
			});
	};

	const onError = (err) => {
		toast.error(err.message);
	};

	const deliverHandler = async () => {
		await deliverOrder(orderId);
		refetch();
	};

	const formatDateTime = (date) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		};
		return new Date(date).toLocaleDateString("en-US", options);
	};

	return isLoading ? (
		<div className="w-full min-h-[60vh] flex justify-center items-center">
			<div className="size-20">
				<Loader />
			</div>
		</div>
	) : error ? (
		<Messsage variant="danger">{error.data.message}</Messsage>
	) : (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] grid lg:grid-cols-4 lg:grid-rows-2 gap-4 mt-5">
			<div className="col-span-1 lg:col-span-3 relative">
				{order.orderItems.length === 0 ? (
					<Messsage>Order is empty</Messsage>
				) : (
					<div className="flex flex-col justify-between h-fit rounded-lg shadow-lg">
						<div className="overflow-x-auto ">
							<table className="w-full ">
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

								<tbody className="border-b-2 border-dashed">
									{order.orderItems.map((item, index) => (
										<tr key={index}>
											<td className="px-4 py-1">
												<img
													src={item.image}
													alt={item.name}
													className="size-16 rounded-lg object-cover"
												/>
											</td>

											<td className="p-2">
												<Link to={`/product/${item.product}`}>{item.name}</Link>
											</td>

											<td className="p-2 text-center">{item.qty}</td>
											<td className="p-2 text-center">${item.price}</td>
											<td className="p-2 text-center">
												${item.qty * item.price}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="flex p-4 flex-col border-b-2 border-dashed">
							<h2 className="text-xl font-bold">Shipping</h2>
							<p className="">
								<strong className="text-button-red">Order:</strong> {order._id}
							</p>
							<p className="">
								<strong className="text-button-red">Name:</strong>{" "}
								{order?.user?.username}
							</p>
							<p className="">
								<strong className="text-button-red">Email:</strong>{" "}
								{order?.user?.email}
							</p>
							<p className="">
								<strong className="text-button-red">Address:</strong>{" "}
								{order.shippingAddress.address}, {order.shippingAddress.city}{" "}
								{order.shippingAddress.postalCode},{" "}
								{order.shippingAddress.country}
							</p>
							<p className="">
								<strong className="text-button-red">Method:</strong>{" "}
								{order.paymentMethod}
							</p>
						</div>
						<div className="flex p-4 flex-col">
							<h2 className="text-xl font-bold mb-2">Order Summary</h2>
							<div className="flex justify-between mb-2">
								<span>Items</span>

								<span>${order.itemsPrice}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span>Shipping</span>
								<span>${order.shippingPrice}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span>Tax</span>
								<span>${order.taxPrice}</span>
							</div>
						</div>
						<div className="w-full text-end px-4 py-2 text-white font-semibold bg-button-red rounded-b-lg">
							Total ${order.totalPrice}
						</div>
					</div>
				)}
			</div>

			<div className="w-full flex flex-col gap-4 z-20 col-span-1 lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-4">
				{!order.isPaid && !userInfo.isAdmin && (
					<div>
						{loadingPay && (
							<div className="flex justify-center items-center ">
								<div className="size-20">
									<Loader />
								</div>
							</div>
						)}
						{isPending ? (
							<div className="flex justify-center items-center ">
								<div className="size-20">
									<Loader />
								</div>
							</div>
						) : (
							<PayPalButtons
								style={{ color: "black" }}
								createOrder={createOrder}
								onApprove={onApprove}
								onError={onError}
							></PayPalButtons>
						)}
					</div>
				)}
				{order.isPaid && (
					<div className="flex gap-2 items-center text-button-red bg-primary-base border shadow p-4 rounded-lg">
						<HiCheckCircle className="text-3xl" />
						Paid on {formatDateTime(order.paidAt)}
					</div>
				)}
				{!order.isPaid && userInfo.isAdmin && (
					<div className="flex gap-2 items-center text-button-red bg-primary-base border shadow p-4 rounded-lg">
						<HiMiniXCircle className="text-3xl" />
						Not paid
					</div>
				)}

				{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
					<div>
						<button
							type="button"
							className="bg-button-red text-white w-full p-4 rounded-lg"
							onClick={deliverHandler}
						>
							{loadingDeliver ? "Loading..." : "Mark as Delivered"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderDetail;
