import { useState } from "react";
import {
	useFetchCategoriesQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} from "../../redux/api/categoryApiSlice.js";
import { RxPlus } from "react-icons/rx";

import { toast } from "react-toastify";
import ConfirmModal from "./Modals/ConfirmModal";
import CategoryModal from "./Modals/CategoryModal.jsx";
import CategoryItem from "./CardItem/CategoryItem.jsx";

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
		<div className="px-6 sm:px-8 lg:px-[8.438rem] mt-5">
			<div className="flex mb-5 justify-between">
				<h1 className="font-medium text-2xl">Manage Categories</h1>
				<button
					className="px-3 py-3 rounded-md text-white bg-button-red hover:bg-button-hover1 "
					onClick={() => toggleModalAdd()}
				>
					<RxPlus />
				</button>
				<CategoryModal
					title="Add Category"
					value={name}
					setValue={(value) => setName(value)}
					handleSubmit={handleCreateCategory}
					open={isModalAddOpen}
					onClose={toggleModalAdd}
				/>
			</div>
			<div className="flex flex-wrap">
				{categories?.map((category) => (
					<CategoryItem
						key={category._id}
						category={category}
						setSelectedCategory={setSelectedCategory}
						setIsModalUpdateOpen={setIsModalUpdateOpen}
						setUpdatingName={setUpdatingName}
						toggleModalConfirm={toggleModalConfirm}
					/>
				))}
				<CategoryModal
					title="Update Category"
					value={updatingName}
					setValue={(value) => setUpdatingName(value)}
					handleSubmit={handleUpdateCategory}
					open={isModalUpdateOpen}
					onClose={toggleModalUpdate}
				/>
				{selectedCategory && (
					<ConfirmModal
						open={isModalConfirmOpen}
						message={`Are you sure to delete ${selectedCategory.name}?`}
						action={handleDeleteCategory}
						onClose={toggleModalConfirm}
					/>
				)}
			</div>
		</div>
	);
};

export default CategoryList;
