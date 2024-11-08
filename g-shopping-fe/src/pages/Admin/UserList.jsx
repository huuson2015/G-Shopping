import { useEffect, useState } from "react";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Message from "@components/Message";
import Loader from "@components/Loader";

import { toast } from "react-toastify";
import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from "@redux/api/userApiSlice";
import ConfirmModal from "./Modals/ConfirmModal";

const UserList = () => {
	const { data: users, refetch, isLoading, error } = useGetUsersQuery();

	const [deleteUser] = useDeleteUserMutation();

	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

	const toggleModalConfirm = () => {
		setIsModalConfirmOpen(!isModalConfirmOpen);
	};

	useEffect(() => {
		refetch();
	}, [refetch]);

	const deleteHandler = async (id) => {
		try {
			await deleteUser(id);
			toast.success("Delete this user success!");
			refetch();
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] mt-5">
			<div className="flex gap-2 items-center my-4">
				<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
				<h2 className="text-2xl font-medium text-button-red">Manage Users</h2>
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
				<div className="flex flex-col md:flex-row rounded-md">
					<table className="w-full">
						<thead className="bg-button-red">
							<tr className="text-left">
								<th className="rounded-tl-lg px-3 py-2 text-left text-white font-medium">
									ID
								</th>
								<th className="px-1 py-2 text-left text-white font-medium">
									Name
								</th>
								<th className="px-1 py-2 text-left text-white font-medium">
									Email
								</th>
								<th className="px-1 py-2 text-left text-white font-medium">
									Admin
								</th>
								<th className="rounded-tr-lg px-1 py-2 text-left text-white font-medium">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td className="px-4 py-2 border-l">{user._id}</td>
									<td className="px-4 py-2">
										<div className="flex items-center">{user.username} </div>
									</td>
									<td className="px-4 py-2">
										<div className="flex items-center">
											<a href={`mailto:${user.email}`}>{user.email}</a>{" "}
										</div>
									</td>
									<td className="px-4 py-2">
										{user.isAdmin ? (
											<FaCheck style={{ color: "green" }} />
										) : (
											<FaTimes style={{ color: "red" }} />
										)}
									</td>
									<td className="px-4 py-2 border-r">
										{!user.isAdmin && (
											<div className="flex">
												<button
													onClick={() => toggleModalConfirm()}
													className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
												>
													<FaTrash />
												</button>
												<ConfirmModal
													open={isModalConfirmOpen}
													message={"Are you sure to delete this user?"}
													action={() => deleteHandler(user._id)}
													onClose={toggleModalConfirm}
												/>
											</div>
										)}
									</td>
								</tr>
							))}
							<tr className="bg-button-red py-4 ">
								<td className="py-5 rounded-bl-lg"></td>
								<td></td>
								<td></td>
								<td></td>
								<td className="py-5 rounded-br-lg"></td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default UserList;
