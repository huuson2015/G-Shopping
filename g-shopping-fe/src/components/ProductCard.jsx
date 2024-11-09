import { Link } from "react-router-dom";
import HeartButton from "./HeartButton";
import { PropTypes } from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Ratings from "./Ratings";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {
	return (
		<div className="w-full h-fit relative border shadow-sm rounded-lg bg-gray-50">
			<div className="relative">
				<div className="overflow-hidden">
					<LazyLoadImage
						src={import.meta.env.VITE_IMAGE_URL + product.image}
						alt={product.name}
						effect="blur"
						wrapperProps={{ style: { transitionDelay: "1s", width: "100%" } }}
						className="w-full h-[15rem] object-cover rounded-t-lg"
					/>
				</div>
				<HeartButton product={product} />
			</div>

			<div className="flex flex-col gap-2 p-4">
				<Link
					className="text-sm sm:text-base font-medium"
					to={`/product/${product._id}`}
				>
					<p className="text-sm sm:text-base font-medium">{product.name}</p>
					<span className="w-fit bg-button-red text-white text-sm font-medium px-2.5 py-0.5 rounded-full ">
						$ {product.price}
					</span>
					<Ratings value={product.rating} text={`(${product.numReviews})`} />
				</Link>
				<AddToCartButton product={product} />
			</div>
		</div>
	);
};

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
};

export default ProductCard;
