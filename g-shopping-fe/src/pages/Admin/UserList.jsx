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
		<div className="px-6 sm:px-8 lg:px-[8.438rem] mt-5">
			<h1 className="text-2xl font-semibold mb-4 text-primary-dark">Users</h1>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<div className="flex flex-col md:flex-row border border-primary-dark rounded-md">
					<table className="w-full">
						<thead>
							<tr className="text-left">
								<th className="px-4 py-2 border-r border-b border-primary-dark">
									ID
								</th>
								<th className="px-4 py-2 border-r border-b border-primary-dark">
									Name
								</th>
								<th className="px-4 py-2 border-r border-b border-primary-dark">
									Email
								</th>
								<th className="px-4 py-2 border-r border-b border-primary-dark">
									Admin
								</th>
								<th className="px-4 py-2 border-b border-primary-dark">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td className="px-4 py-2  border-r border-primary-dark">
										{user._id}
									</td>
									<td className="px-4 py-2 border-r border-primary-dark">
										<div className="flex items-center">{user.username} </div>
									</td>
									<td className="px-4 py-2 border-r border-primary-dark">
										<div className="flex items-center">
											<a href={`mailto:${user.email}`}>{user.email}</a>{" "}
										</div>
									</td>
									<td className="px-4 py-2 border-r border-primary-dark">
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
