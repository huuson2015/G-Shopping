import { useState } from "react";
import {
	useFetchCategoriesQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} from "../../redux/api/categoryApiSlice.js";
import { RxCross2, RxPlus } from "react-icons/rx";

import { toast } from "react-toastify";
import ConfirmModal from "./Modals/ConfirmModal";
import CategoryModal from "./Modals/CategoryModal.jsx";

const CategoryList = () => {
	const { data: categories, refetch } = useFetchCategoriesQuery();

	const [name, setName] = useState("");
	const [updatingName, setUpdatingName] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(null);

	const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
	const [isModalAddOpen, setIsModalAddOpen] = useState(false);
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

	const toggleModalAdd = () => {
		setIsModalAddOpen(!isModalAddOpen);
	};

	const toggleModalConfirm = () => {
		setIsModalConfirmOpen(!isModalConfirmOpen);
	};

	const toggleModalUpdate = () => {
		setIsModalUpdateOpen(!isModalUpdateOpen);
	};

	const [createCategory] = useCreateCategoryMutation();
	const [updateCategory] = useUpdateCategoryMutation();
	const [deleteCategory] = useDeleteCategoryMutation();

	const handleCreateCategory = async (e) => {
		e.preventDefault();

		if (!name) {
			toast.error("Category name is required");
			return;
		}

		try {
			const result = await createCategory({ name }).unwrap();
			if (result.error) {
				toast.error(result.error);
			} else {
				setName("");
				setIsModalAddOpen(false);
				refetch();
				toast.success(`${result.name} is created.`);
			}
		} catch (error) {
			console.error(error);
			toast.error("Creating category failed, try again.");
		}
	};

	const handleUpdateCategory = async (e) => {
		e.preventDefault();

		if (!updatingName) {
			toast.error("Category name is required");
			return;
		}

		try {
			const result = await updateCategory({
				categoryId: selectedCategory._id,
				updatedCategory: {
					name: updatingName,
				},
			}).unwrap();

			if (result.error) {
				toast.error(result.error);
			} else {
				toast.success(`${result.name} is updated`);
				setSelectedCategory(null);
				setUpdatingName("");
				setIsModalUpdateOpen(false);
				refetch();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteCategory = async () => {
		try {
			const result = await deleteCategory(selectedCategory._id).unwrap();

			if (result.error) {
				toast.error(result.error);
			} else {
				toast.success(`${result.name} is deleted.`);
				refetch();
				setSelectedCategory(null);
				setIsModalConfirmOpen(false);
			}
		} catch (error) {
			console.error(error);
			toast.error("Category delection failed. Tray again.");
		}
	};

	return (
		<div className="md:mx-[10rem] flex flex-col md:flex-row">
			<div className="w-full p-3">
				<div className="flex mb-5 justify-between">
					<h1 className="font-medium text-2xl">Manage Categories</h1>
					<button
						className="px-3 py-3 rounded-md text-red-500 hover:bg-red-500 hover:text-white bg-white border-red-500 border"
						onClick={() => toggleModalAdd()}
					>
						<RxPlus />
					</button>
					<CategoryModal
						value={name}
						setValue={(value) => setName(value)}
						handleSubmit={handleCreateCategory}
						open={isModalAddOpen}
						onClose={toggleModalAdd}
					/>
				</div>
				<div className="flex flex-wrap">
					{categories?.map((category) => (
						<div className="relative group" key={category._id}>
							<div
								className=" bg-primary-dark text-white py-2 px-4 rounded-lg m-3 hover:bg-button-hover2 hover:text-text-dark capitalize"
								onClick={() => {
									{
										setIsModalUpdateOpen(true);
										setSelectedCategory(category);
										setUpdatingName(category.name);
									}
								}}
							>
								{category.name}
							</div>
							<button
								className="p-[0.5px] z-40 text-red-500 hover:bg-red-500 hover:text-white bg-white border-red-500 rounded-full border hidden group-hover:block absolute top-1 right-1"
								onClick={() => {
									setSelectedCategory(category);
									toggleModalConfirm();
								}}
							>
								<RxCross2 />
							</button>
						</div>
					))}
					<CategoryModal
						value={updatingName}
						setValue={(value) => setUpdatingName(value)}
						handleSubmit={handleUpdateCategory}
						open={isModalUpdateOpen}
						onClose={toggleModalUpdate}
					/>
					<ConfirmModal
						open={isModalConfirmOpen}
						message={"Are you sure to delete this category?"}
						action={handleDeleteCategory}
						onClose={toggleModalConfirm}
					/>
				</div>
			</div>
		</div>
	);
};

export default CategoryList;
