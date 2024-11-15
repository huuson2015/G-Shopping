import Message from "@components/Message";
import Loader from "@components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "@redux/api/orderApiSlice";
import moment from "moment";

const OrderList = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery();

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] overflow-x-auto">
			<div className="flex gap-2 items-center my-4">
				<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
				<h2 className="text-2xl font-medium text-button-red">Manage Orders</h2>
			</div>
			{isLoading ? (
				<div className="w-full min-h-[60vh] flex justify-center items-center">
					<div className="size-20">
						<Loader />
					</div>
				</div>
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<table className="w-full mb-5">
					<thead className="bg-button-red">
						<tr className="mb-[5rem]">
							<th className="rounded-tl-lg px-3 py-2 text-left text-white font-medium">
								ID
							</th>
							<th className="px-1 py-2 text-left text-white font-medium">
								User
							</th>
							<th className="px-1 py-2 text-left text-white font-medium">
								Date
							</th>
							<th className="px-1 py-2 text-left text-white font-medium">
								Total
							</th>
							<th className="px-1 py-2 text-left text-white font-medium">
								Paid
							</th>
							<th className="px-1 py-2 text-left text-white font-medium">
								Delivered
							</th>
							<th className="rounded-tr-lg px-1 py-2 text-left text-white font-medium">
								Action
							</th>
						</tr>
					</thead>

					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td className="px-3 border-l">{order._id}</td>
								<td>{order.user ? order.user.username : "N/A"}</td>
								<td className="">
									{moment(order?.createdAt).format("MM/DD/YYYY")}
								</td>
								<td>$ {order.totalPrice}</td>
								<td className="py-2">
									{order.isPaid ? (
										<p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
											Completed
										</p>
									) : (
										<p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
											Pending
										</p>
									)}
								</td>
								<td className="px-2 py-2">
									{order.isDelivered ? (
										<p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
											Completed
										</p>
									) : (
										<p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
											Pending
										</p>
									)}
								</td>

								<td className=" border-r">
									<Link
										className="py-2 flex justify-center items-center gap-2 bg-button-red disabled:bg-button-hover1 hover:bg-button-hover1 rounded-lg cursor-pointer text-primary-base mx-2"
										to={`/order/${order._id}`}
									>
										More
									</Link>
								</td>
							</tr>
						))}
						<tr className="bg-button-red py-4 ">
							<td className="py-5 rounded-bl-lg"></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td className="py-5 rounded-br-lg"></td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
};

export default OrderList;
