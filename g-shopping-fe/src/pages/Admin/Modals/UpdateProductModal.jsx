import { useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { useFetchCategoriesQuery } from "../../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import {
	useUploadProductImageMutation,
	useUpdateProductMutation,
	useGetProductByIdQuery,
} from "../../../redux/api/productApiSlice";

const UpdateProductModal = ({ productId, reload, open, onClose }) => {
	const [product, setProduct] = useState({
		_id: "",
		name: "",
		image: "",
		description: "",
		price: "",
		category: "",
		quantity: "",
		brand: "",
		countInStock: "",
	});

	const { data: productData } = useGetProductByIdQuery(productId);

	useEffect(() => {
		if (productData) setProduct(productData);
	}, [productData, productId]);

	const [uploadProductImage] = useUploadProductImageMutation();
	const [updateProduct] = useUpdateProductMutation();
	const { data: categories } = useFetchCategoriesQuery();

	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);

		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success(res.message);
			setProduct({ ...product, image: res.image });
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();
			formData.append("image", product.image);
			formData.append("name", product.name);
			formData.append("description", product.description);
			formData.append("price", product.price);
			formData.append("category", product.category);
			formData.append("quantity", product.quantity);
			formData.append("brand", product.brand);
			formData.append("countInStock", product.countInStock);

			const { data } = await updateProduct({
				productId: productId,
				formData,
			});

			if (data.error) {
				toast.error(data.error);
			} else {
				toast.success(`${data.name} is updated`);
				onClose();
				reload();
			}
		} catch (error) {
			console.error(error);
			toast.error("Product update failed. Try again.", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
		}
	};

	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	return (
		<Dialog
			open={open}
			onClose={() => onClose()}
			as="div"
			className="relative z-40 focus:outline-none"
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/20 duration-300 ease-out data-[closed]:opacity-0"
			/>
			<div className="fixed inset-0 flex w-screen items-center justify-center p-2">
				<DialogPanel
					transition
					className="w-full max-w-md bg-white rounded-md p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
				>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-2 md:gap-4 max-w-md"
					>
						<h1 className="text-xl font-medium text-primary-dark">
							Edit Product
						</h1>
						<div>
							<label className="border bg-gray-200 text-primary-dark px-4 gap-4 flex-col w-full text-center rounded-lg cursor-pointer font-bold justify-center items-center flex py-4 md:py-10">
								{product.image ? (
									<img
										className="object-cover size-16 md:size-40 rounded-lg"
										src={product.image}
										alt=""
									/>
								) : (
									"Upload Image"
								)}

								<input
									type="file"
									name="image"
									accept="image/*"
									onChange={uploadFileHandler}
									className={`w-full ${
										!product.image ? "hidden" : "text-primary-dark"
									}`}
								/>
							</label>
						</div>
						<div className="flex flex-col md:gap-2">
							<div>
								<label
									htmlFor="name"
									className="text-sm font-semibold text-primary-dark"
								>
									Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									value={product.name}
									onChange={handleChange}
									className="w-full px-5 py-2 input-primary"
									placeholder="Product name"
								/>
							</div>
							<div>
								<label
									htmlFor="price"
									className="text-sm font-semibold text-primary-dark"
								>
									Price
								</label>
								<input
									type="number"
									name="price"
									id="price"
									value={product.price}
									onChange={handleChange}
									className="w-full px-5 py-2 input-primary"
									placeholder="Product price"
								/>
							</div>

							<div className="flex gap-4">
								<div className="w-1/2">
									<label
										htmlFor="category"
										className="text-sm font-semibold text-primary-dark"
									>
										Category
									</label>
									<select
										name="category"
										id="category"
										placeholder="Choose Category"
										className="w-full px-5 py-2 input-primary capitalize"
										onChange={handleChange}
									>
										{categories?.map((c) => (
											<option key={c._id} className="capitalize" value={c._id}>
												{c.name}
											</option>
										))}
									</select>
								</div>
								<div className="w-1/2">
									<label
										htmlFor="brand"
										className="text-sm font-semibold text-primary-dark"
									>
										Brand
									</label>
									<input
										type="text"
										name="brand"
										id="brand"
										value={product.brand}
										onChange={handleChange}
										className="w-full px-5 py-2 input-primary"
										placeholder="Product brand"
									/>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="w-1/2">
									<label
										htmlFor="quantity"
										className="text-sm font-semibold text-primary-dark"
									>
										Quantity
									</label>
									<input
										type="number"
										name="quantity"
										id="quantity"
										value={product.quantity}
										onChange={handleChange}
										className="w-full px-5 py-2 input-primary"
										placeholder="Product quantity"
									/>
								</div>
								<div className="w-1/2">
									<label
										htmlFor="stock"
										className="text-sm font-semibold text-primary-dark"
									>
										Count in stock
									</label>
									<input
										type="number"
										name="countInStock"
										id="countInStock"
										value={product.countInStock}
										onChange={handleChange}
										className="w-full px-5 py-2 input-primary"
										placeholder="Product quantity"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="description"
									className="text-sm font-semibold text-primary-dark"
								>
									Description
								</label>
								<textarea
									name="description"
									id="description"
									value={product.description}
									onChange={handleChange}
									className="w-full px-5 py-2 input-primary"
									placeholder="Product description"
								/>
							</div>
						</div>

						<div className="flex gap-4">
							<button
								className="w-1/2 bg-button-red hover:bg-button-hover1 px-3 py-2 text-white font-bold rounded-md"
								type="submit"
							>
								Save
							</button>
							<button
								className="w-1/2 bg-button-green hover:bg-button-hover2 px-3 py-2 text-white font-bold rounded-md"
								type="button"
								onClick={onClose}
							>
								Cancel
							</button>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

UpdateProductModal.propTypes = {
	productId: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	reload: PropTypes.func.isRequired,
};

export default UpdateProductModal;
