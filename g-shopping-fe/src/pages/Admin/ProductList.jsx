import { useState } from "react";
import { RxPlus } from "react-icons/rx";
import {
	useAllProductsQuery,
	useDeleteProductMutation,
} from "@redux/api/productApiSlice";
import Loader from "@components/Loader";
import Message from "@components/Message";
import AddProductModal from "./Modals/AddProductModal";
import ConfirmModal from "./Modals/ConfirmModal";
import { toast } from "react-toastify";
import UpdateProductModal from "./Modals/UpdateProductModal";
import ProductItem from "./CardItem/ProductItem";

const ProductList = () => {
	const { data: products, refetch, isLoading, error } = useAllProductsQuery();
	const [isModalAddOpen, setIsModalAddOpen] = useState(false);
	const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(products?.[0]);
	const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] =
		useState(false);

	const [deleteProduct] = useDeleteProductMutation();

	const toggleModalUpdate = () => {
		setIsModalUpdateOpen(!isModalUpdateOpen);
	};

	const toggleModalConfirmDelete = () => {
		setIsModalConfirmDeleteOpen(!isModalConfirmDeleteOpen);
	};

	const toggleModalAdd = () => {
		setIsModalAddOpen(!isModalAddOpen);
	};

	const handleDelete = async () => {
		try {
			const { data } = await deleteProduct(selectedProduct._id);
			toast.success(`"${data.name}" is deleted`, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
			refetch();
			toggleModalConfirmDelete();
		} catch (err) {
			console.log(err);
			toast.error("Delete failed. Try again.", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
		}
	};

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] mt-5">
			<div className="flex mb-5 justify-between">
				<div className="flex gap-2 items-center my-4">
					<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
					<h2 className="text-2xl font-medium text-button-red">
						Manage Products
					</h2>
				</div>
				<button
					className="px-3 py-3 size-10 rounded-md text-white bg-button-red hover:bg-button-hover1 "
					onClick={() => toggleModalAdd()}
				>
					<RxPlus />
				</button>
				<AddProductModal
					reload={refetch}
					open={isModalAddOpen}
					onClose={toggleModalAdd}
				/>
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
				<div className="flex justify-between flex-wrap gap-4 mb-10">
					{products.map((product) => (
						<ProductItem
							key={product._id}
							setSelectedProduct={setSelectedProduct}
							product={product}
							toggleModalConfirmDelete={toggleModalConfirmDelete}
							toggleModalUpdate={toggleModalUpdate}
						/>
					))}
				</div>
			)}
			{selectedProduct && (
				<>
					<UpdateProductModal
						productId={selectedProduct?._id}
						reload={refetch}
						open={isModalUpdateOpen}
						onClose={toggleModalUpdate}
					/>
					<ConfirmModal
						action={handleDelete}
						message="Are you sure for delete this product?"
						open={isModalConfirmDeleteOpen}
						onClose={toggleModalConfirmDelete}
					/>
				</>
			)}
		</div>
	);
};

export default ProductList;
