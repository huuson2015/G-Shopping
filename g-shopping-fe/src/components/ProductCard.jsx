import { Link } from "react-router-dom";
import HeartButton from "./HeartButton";
import { PropTypes } from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductCard = ({ product }) => {
	return (
		<div className="w-full relative">
			<div className="relative">
				<LazyLoadImage
					src={product.image}
					alt={product.name}
					effect="blur"
					wrapperProps={{
						style: { transitionDelay: "1s" },
					}}
					className="w-full h-[15rem] object-cover rounded"
				/>
				<HeartButton product={product} />
			</div>

			<div className="pb-4 pt-1">
				<Link to={`/product/${product._id}`}>
					<h2 className="flex justify-between items-center">
						<div className="text-lg">{product.name}</div>
						<span className="bg-button-red text-white text-sm font-medium px-2.5 py-0.5 rounded-full ">
							$ {product.price}
						</span>
					</h2>
				</Link>
			</div>
		</div>
	);
};

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
};

export default ProductCard;
