import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import HeartButton from "./HeartButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Ratings from "./Ratings";

const SmallProductCard = ({ product }) => {
	return (
		<div className="border shadow-sm h-full rounded-lg mb-4 bg-gray-50">
			<div className="relative">
				<div className="overflow-hidden">
					<LazyLoadImage
						src={import.meta.env.VITE_IMAGE_URL + product.image}
						alt={product.name}
						effect="blur"
						className="w-full h-[15rem] object-cover rounded-t-lg"
					/>
				</div>
				<HeartButton product={product} />
			</div>

			<Link className="flex flex-col gap-2 p-4" to={`/product/${product._id}`}>
				<p className="text-sm sm:text-base font-medium">{product.name}</p>
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
