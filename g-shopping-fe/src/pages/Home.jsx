import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "@redux/api/productApiSlice";
import ProductCard from "@components/ProductCard";
import Message from "@components/Message";
import Loader from "@components/Loader";
import Header from "@components/Header";

const Home = () => {
	const { keyword } = useParams();
	const { data, isLoading, isError } = useGetProductsQuery({ keyword });
	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] mt-5">
			{isLoading ? (
				<div className="w-full min-h-[60vh] flex justify-center items-center">
					<div className="size-20">
						<Loader />
					</div>
				</div>
			) : isError ? (
				<Message variant="danger">
					{isError?.data?.message || isError.error}
				</Message>
			) : (
				<>
					{!keyword ? <Header /> : null}
					<div className="flex justify-between items-center">
						<h1 className="text-[1.5rem] md:text-[3rem]">Special Products</h1>

						<Link
							to="/shop"
							className="bg-button-red text-white font-bold rounded-full py-2 px-5 md:px-10"
						>
							Shop
						</Link>
					</div>

					<div>
						<div className="flex w-full gap-2 flex-wrap justify-between mb-5 mt-2">
							{data.products.map((product) => (
								<div key={product._id} className="w-full md:w-[32%]">
									<ProductCard product={product} />
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
