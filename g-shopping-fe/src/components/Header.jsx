import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProductCard from "./SmallProductCard";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
	const { data, isLoading, error } = useGetTopProductsQuery();

	if (isLoading) {
		return (
			<div className="w-full min-h-[60vh] flex justify-center items-center">
				<div className="size-20">
					<Loader />
				</div>
			</div>
		);
	}

	if (error) {
		return <h1>ERROR</h1>;
	}

	return (
		<div className="flex flex-col-reverse gap-4 lg:flex-row mb-4">
			<div className="lg:w-1/2 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-2">
				{data.map((product) => (
					<SmallProductCard key={product._id} product={product} />
				))}
			</div>
			<ProductCarousel />
		</div>
	);
};

export default Header;
