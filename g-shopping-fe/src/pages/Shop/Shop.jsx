import { useEffect, useState } from "react";
import { useGetFilteredProductsQuery } from "@redux/api/productApiSlice";

import ProductCard from "@components/ProductCard";
import { BiSliderAlt } from "react-icons/bi";
import Filter from "./Filter";
import Loader from "@components/Loader";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";

const Shop = () => {
	const [searchParams, setSearchParams] = useSearchParams({
		page: 1,
	});

	const [filterModal, setFilterModal] = useState(false);

	const filteredProductsQuery = useGetFilteredProductsQuery(
		searchParams.toString()
	);

	const { data, isLoading, refetch, isFetching } = filteredProductsQuery;

	const handleFilterModal = () => {
		setFilterModal(!filterModal);
	};

	useEffect(() => {
		refetch();
	}, [refetch, searchParams]);

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] py-4 lg:py-10">
			<div className="flex md:flex-row w-full">
				<div className="mr-4 hidden md:block md:w-1/5 3xl:w-1/4 mt-2 mb-2">
					<Filter
						searchParams={searchParams}
						setSearchParams={setSearchParams}
					/>
				</div>
				<div className="w-full">
					<div className="flex justify-between items-center">
						<button
							onClick={handleFilterModal}
							className="p-2 text-button-red hover:text-primary-base hover:bg-button-red rounded-md border shadow mb-2 md:hidden"
						>
							<BiSliderAlt size={24} />
						</button>
						<Dialog
							open={filterModal}
							onClose={handleFilterModal}
							className="relative z-50"
						>
							<DialogBackdrop className="fixed inset-0 bg-black/30" />

							<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
								<DialogPanel className="rounded-lg bg-white p-12">
									<Filter />
								</DialogPanel>
							</div>
						</Dialog>
						<h2 className="h4 text-center mb-2">{data?.length} Products</h2>
					</div>
					<div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
						{isLoading || isFetching ? (
							<div className="col-span-2 lg:col-span-4 min-h-[60vh] flex justify-center items-center">
								<div className="size-20">
									<Loader />
								</div>
							</div>
						) : (
							data?.map((product) => (
								<ProductCard key={product._id} product={product} />
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
