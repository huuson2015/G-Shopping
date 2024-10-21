import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "@redux/api/productApiSlice";
import ProductCard from "@components/ProductCard";
import Message from "@components/Message";
import Loader from "@components/Loader";
import Header from "@components/Header";
import { PiHeadset, PiTruck } from "react-icons/pi";
import { GoShieldCheck } from "react-icons/go";

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
					<div className="flex flex-col">
						<div className="flex gap-2 items-center">
							<div className="min-h-[2.8rem] w-[1.2rem] bg-button-red rounded-md"></div>
							<h2 className="text-2xl font-medium text-button-red">
								Our products
							</h2>
						</div>
						<h1 className="text-[1.5rem] md:text-[2.5rem] font-bold">
							Explore Our Products
						</h1>
					</div>
					<div className="mb-10">
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5 mt-2">
							{data.products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</div>
						<div className="flex justify-center">
							<Link
								to="/shop"
								className="bg-button-red hover:bg-button-hover1 text-white font-bold rounded-lg py-2 px-5 md:px-20"
							>
								Shop
							</Link>
						</div>
					</div>
				</>
			)}
			<div className="flex justify-center items-center gap-11 my-20">
				<div className="flex justify-center items-center flex-col gap-2">
					<div className="p-4 bg-gray-300 rounded-full">
						<PiTruck
							size={60}
							className="text-primary-base bg-text-dark p-4 rounded-full"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-bold text-lg">FREE AND FAST DELIVERY</h2>
						<p className="text-sm">Free delivery for all order over $100</p>
					</div>
				</div>
				<div className="flex justify-center items-center flex-col gap-2">
					<div className="p-4 bg-gray-300 rounded-full">
						<PiHeadset
							size={60}
							className="text-primary-base bg-text-dark p-4 rounded-full"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-bold text-lg">24/7 CUSTOMER SERVICE</h2>
						<p className="text-sm">Friendly 24/7 customer support</p>
					</div>
				</div>
				<div className="flex justify-center items-center flex-col gap-2">
					<div className="p-4 bg-gray-300 rounded-full">
						<GoShieldCheck
							size={60}
							className="text-primary-base bg-text-dark p-4 rounded-full"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-bold text-lg">MONEY BACK GUARANTEE</h2>
						<p className="text-sm">We reurn money within 30 days</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
