import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "@redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "@redux/api/categoryApiSlice";

import {
	setCategories,
	setProducts,
	setChecked,
} from "@redux/features/shop/shopSlice";
import Loader from "@components/Loader";
import ProductCard from "@components/ProductCard";

const Shop = () => {
	const dispatch = useDispatch();
	const { categories, products, checked, radio } = useSelector(
		(state) => state.shop
	);

	const categoriesQuery = useFetchCategoriesQuery();
	const [priceFilter, setPriceFilter] = useState("");

	const filteredProductsQuery = useGetFilteredProductsQuery({
		checked,
		radio,
	});

	useEffect(() => {
		if (!categoriesQuery.isLoading) {
			dispatch(setCategories(categoriesQuery.data));
		}
	}, [categoriesQuery.data, dispatch]);

	useEffect(() => {
		if (!checked.length || !radio.length) {
			if (!filteredProductsQuery.isLoading) {
				const filteredProducts = filteredProductsQuery.data.filter(
					(product) => {
						return (
							product.price.toString().includes(priceFilter) ||
							product.price === parseInt(priceFilter, 10)
						);
					}
				);

				dispatch(setProducts(filteredProducts));
			}
		}
	}, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

	const handleBrandClick = (brand) => {
		const productsByBrand = filteredProductsQuery.data?.filter(
			(product) => product.brand === brand
		);
		dispatch(setProducts(productsByBrand));
	};

	const handleCheck = (value, id) => {
		const updatedChecked = value
			? [...checked, id]
			: checked.filter((c) => c !== id);
		dispatch(setChecked(updatedChecked));
	};

	const uniqueBrands = [
		...Array.from(
			new Set(
				filteredProductsQuery.data
					?.map((product) => product.brand)
					.filter((brand) => brand !== undefined)
			)
		),
	];

	const handlePriceChange = (e) => {
		setPriceFilter(e.target.value);
	};
	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] pt-5">
			<div className="flex md:flex-row">
				<div className="p-3 w-1/5 3xl:w-1/4 mt-2 mb-2">
					<h2 className="h4 text-center py-2 bg-button-red  rounded-md text-white font-medium mb-2">
						Filter by Categories
					</h2>

					<div className="p-5 flex flex-col gap-2">
						{categories?.map((category) => (
							<label
								key={category._id}
								className="ml-2 flex gap-2 items-center capitalize text-sm font-medium text-primary-d"
							>
								<input
									type="checkbox"
									id="red-checkbox"
									onChange={(e) => handleCheck(e.target.checked, category._id)}
									className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
								/>

								{category.name}
							</label>
						))}
					</div>

					<h2 className="h4 text-center py-2 bg-button-red rounded-md text-white font-medium mb-2">
						Filter by Brands
					</h2>

					<div className="p-5 flex flex-col gap-2">
						{uniqueBrands?.map((brand) => (
							<>
								<label className="ml-2 flex gap-2 items-center text-sm font-medium text-primary-d">
									<input
										type="radio"
										id={brand}
										name="brand"
										onChange={() => handleBrandClick(brand)}
										className="w-4 h-4  bg-gray-100 border-gray-300"
									/>

									{brand}
								</label>
							</>
						))}
					</div>

					<h2 className="h4 text-center py-2 bg-button-red  rounded-md text-white font-medium mb-2">
						Filer by Price
					</h2>

					<div className="p-5">
						<input
							type="text"
							placeholder="Enter Price"
							value={priceFilter}
							onChange={handlePriceChange}
							className="w-full px-3 py-2 input-primary"
						/>
					</div>

					<div className="p-5 pt-0">
						<button
							className="w-full p-2 bg-button-red hover:bg-button-hover1 rounded-md"
							onClick={() => window.location.reload()}
						>
							Reset
						</button>
					</div>
				</div>

				<div className="p-3 w-4/5 3xl:w-3/4">
					<h2 className="h4 text-center mb-2">{products?.length} Products</h2>
					<div className="flex flex-wrap h-full">
						{products.length === 0 ? (
							<div className="w-full flex items-center justify-center ">
								<div className="size-20">
									<Loader />
								</div>
							</div>
						) : (
							products?.map((product) => (
								<div
									className="3xl:w-1/4 lg:w-1/3 sm:w-1/2 w-full p-3"
									key={product._id}
								>
									<ProductCard product={product} />
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
