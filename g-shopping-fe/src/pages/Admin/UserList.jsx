import { useEffect, useState } from "react";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

import { toast } from "react-toastify";
import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from "../../redux/api/userApiSlice";
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
		<div className="px-6 sm:px-8 lg:px-[8.438rem]">
			<h1 className="text-2xl font-semibold mb-4 text-black">Users</h1>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<div className="flex flex-col md:flex-row ">
					<table className="w-full border rounded">
						<thead>
							<tr className="text-left">
								<th className="px-4 py-2">ID</th>
								<th className="px-4 py-2">NAME</th>
								<th className="px-4 py-2">EMAIL</th>
								<th className="px-4 py-2">ADMIN</th>
								<th className="px-4 py-2">Action</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td className="px-4 py-2">{user._id}</td>
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
									<td className="px-4 py-2">
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
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default UserList;
