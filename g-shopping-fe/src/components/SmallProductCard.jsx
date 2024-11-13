import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import HeartButton from "./HeartButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Ratings from "./Ratings";

const SmallProductCard = ({ product }) => {
	return (
		<div className="border shadow-sm h-full rounded-lg mb-4 bg-gray-50">
			<div className="relative">
				{product.countInStock === 0 && (
					<div className="absolute z-20 top-3 left-3 bg-button-red text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
						Sold out
					</div>
				)}
				<div className="overflow-hidden bg-white">
					<LazyLoadImage
						src={product.image}
						alt={product.name}
						effect="blur"
						className="w-full h-[15rem] object-contain rounded-t-lg"
					/>
				</div>
				<HeartButton product={product} />
			</div>

			<Link className="flex flex-col gap-2 p-4" to={`/product/${product._id}`}>
				<p className="text-sm sm:text-base font-medium h-12">{product.name}</p>
				<span className="w-fit bg-button-red text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
					${product.price}
				</span>
				<Ratings value={product.rating} text={`(${product.numReviews})`} />
			</Link>
		</div>
	);
};

SmallProductCard.propTypes = {
	product: PropTypes.object.isRequired,
};

export default SmallProductCard;
