import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import ProductCard from "./ProductCard";

const Favorites = () => {
	const favorites = useSelector(selectFavoriteProduct);

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem]">
			<h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
				Favorites product
			</h1>

			<div className="flex gap-4 flex-wrap">
				{favorites.map((product) => (
					<div className="w-full md:w-[15rem]" key={product._id}>
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Favorites;
