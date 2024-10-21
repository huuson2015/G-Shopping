import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "@redux/features/favorites/favoriteSlice";
import ProductCard from "@components/ProductCard";

const Favorites = () => {
	const favorites = useSelector(selectFavoriteProduct);

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem]">
			<div className="flex gap-2 items-center my-4">
				<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
				<h2 className="text-2xl font-medium text-button-red">
					Favorites product
				</h2>
			</div>

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
