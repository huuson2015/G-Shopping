import { useState } from "react";
import { RxPlus } from "react-icons/rx";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";
import AddProductModal from "./Modals/AddProductModal";

const ProductList = () => {
	const { data: products, refetch, isLoading, error } = useAllProductsQuery();
	const [isModalAddOpen, setIsModalAddOpen] = useState(false);

	const toggleModalAdd = () => {
		setIsModalAddOpen(!isModalAddOpen);
	};

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] mt-5">
			<div className="flex mb-5 justify-between">
				<h1 className="font-medium text-2xl">Manage Products</h1>
				<button
					className="px-3 py-3 rounded-md text-white bg-button-red hover:bg-button-hover1 "
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
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<div className="flex flex-wrap justify-around items-center">
					{products.map((product) => (
						<div key={product._id} className="flex">
							<img
								src={product.image}
								alt={product.name}
								className="w-[10rem] object-cover"
							/>
							<div className="p-4 flex flex-col justify-around">
								<div className="flex justify-between">
									<h5 className="text-xl font-semibold mb-2">
										{product?.name}
									</h5>

									<p className="text-gray-400 text-xs">
										{moment(product.createdAt).format("MMMM Do YYYY")}
									</p>
								</div>
								<p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
									{product?.description?.substring(0, 160)}...
								</p>
								<div className="flex justify-between">
									<div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-button-red rounded-lg hover:bg-button-hover1 hover:cursor-pointer">
										Detail
									</div>
									<p>$ {product?.price}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductList;
