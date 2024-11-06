import { useGetMyOrdersQuery } from "@redux/api/orderApiSlice";
import Message from "@components/Message";
import Loader from "@components/Loader";
import { Link } from "react-router-dom";
import moment from "moment";

const UserOrder = () => {
	const { data: orders, isLoading, error } = useGetMyOrdersQuery();

	return (
		<div className="overflow-x-auto">
			<div className="flex gap-2 items-center my-4">
				<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
				<h2 className="text-2xl font-medium text-button-red">My Orders</h2>
			</div>

			{isLoading ? (
				<div className="w-full min-h-[60vh] flex justify-center items-center">
					<div className="size-20">
						<Loader />
					</div>
				</div>
			) : error ? (
				<Message variant="danger">{error?.data?.error || error.error}</Message>
			) : (
				<table className="w-full">
					<thead>
						<tr>
							<td className="py-2">ID</td>
							<td className="py-2">Date</td>
							<td className="py-2">Total</td>
							<td className="py-2">Paid</td>
							<td className="py-2">Delivered</td>
							<td className="py-2"></td>
						</tr>
					</thead>

					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td className="py-2">{order._id}</td>
								<td className="py-2">
									{moment(order?.createdAt).format("MM/DD/YYYY")}
								</td>
								<td className="py-2">$ {order.totalPrice}</td>

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

								<td className="px-2 py-2">
									<Link to={`/order/${order._id}`}>
										<button className="bg-button-red text-primary-base hover:bg-button-hover1 py-2 px-3 rounded">
											View Details
										</button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default UserOrder;
