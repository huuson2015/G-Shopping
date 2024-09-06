import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import HeartButton from "./HeartButton";

const SmallProductCard = ({ product }) => {
	return (
		<div className="">
			<div className="relative">
				<img
					src={product.image}
					alt={product.name}
					className="h-[10rem] object-cover w-full rounded"
				/>
				<HeartButton product={product} />
			</div>

			<div className="py-4">
				<Link to={`/product/${product._id}`}>
					<h2 className="flex justify-between items-center">
						<div>{product.name}</div>
						<span className="bg-button-red text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
							${product.price}
						</span>
					</h2>
				</Link>
			</div>
		</div>
	);
};

SmallProductCard.propTypes = {
	product: PropTypes.object.isRequired,
};

export default SmallProductCard;
