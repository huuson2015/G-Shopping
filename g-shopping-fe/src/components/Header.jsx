import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProductCard from "../pages/Products/SmallProductCard";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
	const { data, isLoading, error } = useGetTopProductsQuery();

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <h1>ERROR</h1>;
	}

	return (
		<>
			<div className="flex flex-col-reverse gap-[2rem] md:flex-row justify-between">
				<div className="md:w-1/2">
					<div className="grid gap-x-[2rem] md:grid-cols-2">
						{data.map((product) => (
							<div key={product._id}>
								<SmallProductCard product={product} />
							</div>
						))}
					</div>
				</div>
				<ProductCarousel />
			</div>
		</>
	);
};

export default Header;
