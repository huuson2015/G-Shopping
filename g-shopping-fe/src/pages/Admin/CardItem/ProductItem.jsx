import moment from "moment";
import { PropTypes } from "prop-types";

const ProductItem = ({
	product,
	toggleModalUpdate,
	setSelectedProduct,
	toggleModalConfirmDelete,
}) => {
	return (
		<div className="flex w-full flex-col md:flex-row shadow-lg rounded-md">
			<div className="rounded-md w-1/4 p-4">
				<img
					src={product?.image}
					alt={product?.name}
					className="size-[5rem] md:size-[10rem] object-cover rounded-md"
				/>
			</div>
			<div className="p-4 w-3/4 flex flex-col justify-around">
				<div className="flex flex-col md:flex-row justify-between">
					<h5 className="text-xl font-semibold mb-2">{product?.name}</h5>

					<p className="text-gray-400 text-xs">
						{moment(product?.createdAt).format("MMMM Do YYYY")}
					</p>
				</div>
				<p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
					{product?.description?.substring(0, 160)}...
				</p>
				<div className="flex justify-between">
					<div className="flex gap-2">
						<div
							onClick={() => {
								toggleModalUpdate();
								setSelectedProduct(product);
							}}
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-button-red rounded-lg hover:bg-button-hover1 hover:cursor-pointer"
						>
							Detail
						</div>
						<div
							onClick={() => {
								toggleModalConfirmDelete();
								setSelectedProduct(product);
							}}
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-button-red rounded-lg hover:bg-button-hover1 hover:cursor-pointer"
						>
							Remove
						</div>
					</div>
					<p>$ {product?.price}</p>
				</div>
			</div>
		</div>
	);
};

ProductItem.propTypes = {
	product: PropTypes.object.isRequired,
	toggleModalUpdate: PropTypes.func.isRequired,
	setSelectedProduct: PropTypes.func.isRequired,
	toggleModalConfirmDelete: PropTypes.func.isRequired,
};

export default ProductItem;
